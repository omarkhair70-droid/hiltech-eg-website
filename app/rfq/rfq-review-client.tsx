'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BasketRecommendations } from '@/components/BasketRecommendations';
import { trackEvent } from '@/lib/client/analytics';
import { arRFQMessages, type RFQMessages } from '@/content/ar/rfq';
import {
  buildRFQWhatsappMessage,
  getRFQWhatsappLink,
  MAX_RFQ_QUANTITY,
  MIN_RFQ_QUANTITY,
  normalizeRFQItem,
  normalizeRFQQuantity,
  readRFQItems,
  writeRFQItems,
  type RFQItem,
  type RFQProjectDetails,
} from '@/lib/rfq';
import { isValidEgyptPhone } from '@/lib/phone';

const en = {
  pageTitle: 'Request Project Quote',
  pageSubtitle:
    'Review your selected products, add quantities and project details, then submit your RFQ to HILTECH for quotation follow-up.',
  step1: '1. Review items',
  step2: '2. Add project details',
  step3: '3. Submit & track',
  itemsCardTitle: 'Selected items',
  basketTitle: 'RFQ Summary',
  projectDetails: 'Project details',
  submitSectionTitle: 'Submit RFQ request',
  fullName: 'Full name',
  phoneNumber: 'Phone',
  emailAddress: 'Email',
  companyName: 'Company',
  projectLocation: 'Project location',
  projectNotes: 'Project notes',
  submitRFQ: 'Submit RFQ Request',
  submitting: 'Saving RFQ...',
  emptyBasket:
    'Your RFQ basket is empty. Add products first to prepare a structured quotation request.',
  browseProducts: 'Browse Products',
  contactHelper: 'Need help preparing your request?',
  contactHiltech: 'Contact HILTECH',
  emptyStateTitle: 'Your RFQ basket is empty',
  emptyStateBody: 'Add products to submit an itemized RFQ, or send a project-only request below.',
  projectOnlyTitle: 'No product list yet?',
  projectOnlyBody: 'You can still send your project scope manually and our team will help build the BOQ with you.',
  sendProjectOnly: 'Send Project-Only Request',
  addItemsToSubmit: 'Add at least one product to enable RFQ submission.',
  quantity: 'Quantity',
  remove: 'Remove',
  reference: 'Reference',
  trackThisRFQ: 'Track this RFQ',
  sendViaWhatsapp: 'Send via WhatsApp',
  sendViaWhatsappToo: 'Send via WhatsApp too',
  backToProducts: 'Back to Products',
  successTitle: 'RFQ submitted successfully',
  successBody: 'Save this reference to track your request later.',
  finalQuotationNote: 'Final quotation confirmed after RFQ review.',
  priceReference: 'Price ref',
  priceOnRequest: 'Price on request',
  availabilityNote: 'Availability confirmed during RFQ review',
  fullNameRequired: 'Enter your full name.',
  phoneRequired: 'Enter a valid Egyptian phone number.',
  emailRequired: 'Email address is required.',
  invalidEmail: 'Enter a valid email address.',
  quantityError: 'Quantity must be between 1 and 9999.',
  submitError: "We couldn’t save your RFQ right now. You can still send it via WhatsApp.",
  serverValidationPrefix: 'Please review:',
  prepareHint:
    'For faster quotation, include site location, quantities, rack/fiber/CCTV scope, and any BOQ or project notes.',
  nextTitle: 'What happens after submission?',
  nextPoint1: 'HILTECH reviews your items, quantities, and project notes.',
  nextPoint2: 'Availability and suitable alternatives are confirmed.',
  nextPoint3: 'The team contacts you by phone or WhatsApp if clarification is needed.',
  nextPoint4: 'You receive quotation follow-up and can track the RFQ using your reference.',
} as const;

export default function RFQReviewClient({
  locale = 'en',
  messages,
  productsHref = '/products-partners',
  trackHrefBase = '/track',
  contactHref = '/contact',
}: {
  locale?: 'en' | 'ar';
  messages?: RFQMessages;
  productsHref?: string;
  trackHrefBase?: string;
  contactHref?: string;
}) {
  const t = (locale === 'ar' ? messages || arRFQMessages : en) as typeof en;
  const [items, setItems] = useState<RFQItem[]>([]);
  const [project, setProject] = useState<RFQProjectDetails>({});
  const [submitState, setSubmitState] = useState<{ status: 'idle' | 'submitting' | 'error' | 'success'; requestCode?: string; message?: string }>({ status: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quantityError, setQuantityError] = useState('');
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + normalizeRFQQuantity(i.quantity), 0), [items]);
  const isBasketEmpty = items.length === 0;

  const updateItem = (id: string, patch: Partial<RFQItem>) => {
    setItems((prev) => prev.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!project.fullName?.trim()) e.fullName = t.fullNameRequired;
    if (!project.phoneNumber?.trim() || !isValidEgyptPhone(project.phoneNumber)) e.phoneNumber = t.phoneRequired;
    if (!project.emailAddress?.trim()) e.emailAddress = t.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.emailAddress.trim())) e.emailAddress = t.invalidEmail;
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first === 'fullName') fullNameRef.current?.focus();
    if (first === 'phoneNumber') phoneRef.current?.focus();
    if (first === 'emailAddress') emailRef.current?.focus();
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (isBasketEmpty) {
      setSubmitState({ status: 'error', message: t.addItemsToSubmit });
      return;
    }
    if (!validate()) return;
    const normalizedItems = items.map((item) => normalizeRFQItem(item));
    if (normalizedItems.some((i) => i.quantity < MIN_RFQ_QUANTITY || i.quantity > MAX_RFQ_QUANTITY)) {
      setQuantityError(t.quantityError);
      return;
    }
    setSubmitState({ status: 'submitting' });
    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: project.fullName,
            companyName: project.companyName,
            phone: project.phoneNumber,
            email: project.emailAddress,
            projectLocation: project.projectLocation,
            projectNotes: project.projectNotes,
            requestType: null,
          },
          items: normalizedItems.map((item) => ({
            productId: item.id,
            name: item.name,
            category: item.category,
            brand: item.brand,
            quantity: item.quantity,
            unit: item.unit,
            urgency: item.urgency,
            notes: item.notes,
          })),
          urgency: null,
          source: 'rfq_page',
          whatsappMessage: buildRFQWhatsappMessage(normalizedItems, project),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.requestCode) {
        const details = Array.isArray(data?.issues)
          ? data.issues
              .map((issue: { path?: string[]; message?: string }) => issue?.message)
              .filter((message: string | undefined): message is string => Boolean(message))
          : [];
        throw new Error(details.length ? `${t.serverValidationPrefix} ${details.join(' ')}` : t.submitError);
      }
      setSubmitState({ status: 'success', requestCode: data.requestCode });
      trackEvent('rfq_submit_success', { item_count: items.length, total_units: count, source: 'rfq_page' });
    } catch (error) {
      setSubmitState({ status: 'error', message: error instanceof Error && error.message ? error.message : t.submitError });
    }
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="space-y-6">
      <header className="public-card rounded-2xl border border-white/15 bg-white/5 p-5">
        <h1 className="text-2xl font-bold text-white">{t.pageTitle}</h1>
        <p className="mt-2 text-sm text-slate-200">{t.pageSubtitle}</p>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          {[t.step1, t.step2, t.step3].map((step) => (
            <div key={step} className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 px-3 py-2 font-medium text-slate-200">
              {step}
            </div>
          ))}
        </div>
      </header>

      {submitState.status === 'success' && submitState.requestCode ? (
        <section className="public-card rounded-2xl border border-white/15 bg-white/5 p-5">
          <h2 className="text-xl font-semibold text-white">{t.successTitle}</h2>
          <p className="mt-2 text-sm text-slate-200">{t.successBody}</p>
          <p className="mt-4 rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-3 text-sm text-slate-800">
            {t.reference}: <strong dir="ltr" className="font-mono text-base">{submitState.requestCode}</strong>
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link className="btn-primary text-center" href={`${trackHrefBase}?request_code=${encodeURIComponent(submitState.requestCode)}`}>{t.trackThisRFQ}</Link>
            <Link className="btn-secondary text-center" href={productsHref}>{t.backToProducts}</Link>
            <a className="btn-secondary text-center" href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">{t.sendViaWhatsappToo}</a>
          </div>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="public-card rounded-2xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white">{t.itemsCardTitle}</h2>
              {isBasketEmpty ? (
                <div className="mt-3 rounded-xl border border-dashed border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 text-sm text-slate-200">
                  <p>{t.emptyBasket}</p>
                  <Link className="btn-secondary mt-3 inline-flex" href={productsHref}>{t.browseProducts}</Link>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <article key={item.id} className="rounded-xl border border-white/15 p-4">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-slate-300">{item.category} • {item.brand}</p>
                      <p className="mt-2 text-sm text-slate-200">{t.priceReference}: {item.priceNote || t.priceOnRequest}</p>
                      <p className="text-xs text-slate-500">{t.availabilityNote}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 p-1">
                          <button type="button" className="h-9 w-9 rounded border border-white/15" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity - 1) })}>-</button>
                          <span className="min-w-20 text-center text-sm">{t.quantity}: {item.quantity}</span>
                          <button type="button" className="h-9 w-9 rounded border border-white/15" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity + 1) })}>+</button>
                        </div>
                        <button type="button" className="btn-secondary ms-auto" onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}>{t.remove}</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {quantityError ? <p className="mt-3 text-sm text-red-600">{quantityError}</p> : null}
            </section>

            {!isBasketEmpty && <BasketRecommendations productIds={items.map(i => i.id)} isArabic={locale === 'ar'} onAddProduct={(product) => setItems((prev) => [...prev, normalizeRFQItem({ id: product.id, name: product.name, quantity: 1, unit: 'unit', notes: '', category: product.category, brand: product.brand, priceNote: '' })])} />}

            <section className="public-card rounded-2xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white">{t.projectDetails}</h2>
              <p className="mt-2 text-sm text-slate-300">{t.prepareHint}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-200">
                  <span className="mb-1 block font-medium">{t.fullName}</span>
                  <input ref={fullNameRef} type="text" className="w-full rounded-xl border border-white/20 px-3 py-2" value={project.fullName || ''} onChange={(e) => setProject((prev) => ({ ...prev, fullName: e.target.value }))} />
                  {errors.fullName ? <span className="mt-1 block text-xs text-red-600">{errors.fullName}</span> : null}
                </label>
                <label className="block text-sm text-slate-200">
                  <span className="mb-1 block font-medium">{t.phoneNumber}</span>
                  <input ref={phoneRef} type="tel" dir="ltr" className="w-full rounded-xl border border-white/20 px-3 py-2" value={project.phoneNumber || ''} onChange={(e) => setProject((prev) => ({ ...prev, phoneNumber: e.target.value }))} />
                  {errors.phoneNumber ? <span className="mt-1 block text-xs text-red-600">{errors.phoneNumber}</span> : null}
                </label>
                <label className="block text-sm text-slate-200">
                  <span className="mb-1 block font-medium">{t.emailAddress}</span>
                  <input ref={emailRef} type="email" dir="ltr" className="w-full rounded-xl border border-white/20 px-3 py-2" value={project.emailAddress || ''} onChange={(e) => setProject((prev) => ({ ...prev, emailAddress: e.target.value }))} />
                  {errors.emailAddress ? <span className="mt-1 block text-xs text-red-600">{errors.emailAddress}</span> : null}
                </label>
                <label className="block text-sm text-slate-200">
                  <span className="mb-1 block font-medium">{t.companyName}</span>
                  <input type="text" className="w-full rounded-xl border border-white/20 px-3 py-2" value={project.companyName || ''} onChange={(e) => setProject((prev) => ({ ...prev, companyName: e.target.value }))} />
                </label>
                <label className="block text-sm text-slate-200 sm:col-span-2">
                  <span className="mb-1 block font-medium">{t.projectLocation}</span>
                  <input type="text" className="w-full rounded-xl border border-white/20 px-3 py-2" value={project.projectLocation || ''} onChange={(e) => setProject((prev) => ({ ...prev, projectLocation: e.target.value }))} />
                </label>
              </div>
              <label className="mt-4 block text-sm text-slate-200">
                <span className="mb-1 block font-medium">{t.projectNotes}</span>
                <textarea className="min-h-28 w-full rounded-xl border border-white/20 px-3 py-2" value={project.projectNotes || ''} onChange={(e) => setProject((prev) => ({ ...prev, projectNotes: e.target.value }))} />
              </label>
            </section>

            <section className="public-card rounded-2xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white">{t.submitSectionTitle}</h2>
              {isBasketEmpty ? (
                <div className="mt-3 space-y-4">
                  <div className="rounded-xl border border-dashed border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4">
                    <h3 className="text-base font-semibold text-white">{t.emptyStateTitle}</h3>
                    <p className="mt-1 text-sm text-slate-200">{t.emptyStateBody}</p>
                    <Link className="btn-primary mt-4 inline-flex" href={productsHref}>{t.browseProducts}</Link>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <h3 className="text-base font-semibold text-white">{t.projectOnlyTitle}</h3>
                    <p className="mt-1 text-sm text-slate-200">{t.projectOnlyBody}</p>
                    <a className="btn-secondary mt-4 inline-flex" href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">{t.sendProjectOnly}</a>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-2 text-sm text-slate-300">{t.finalQuotationNote}</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <button type="button" className="btn-primary w-full" onClick={submit} disabled={submitState.status === 'submitting'}>
                      {submitState.status === 'submitting' ? t.submitting : t.submitRFQ}
                    </button>
                    <a className="btn-secondary w-full text-center" href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">{t.sendViaWhatsapp}</a>
                  </div>
                </>
              )}
              {submitState.status === 'error' ? <p className="mt-3 text-sm text-red-600">{submitState.message}</p> : null}
              <div className="mt-4 rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-3 text-sm text-slate-200">
                <span>{t.contactHelper} </span>
                <a className="font-semibold underline" href={contactHref}>{t.contactHiltech}</a>
              </div>
            </section>
          </div>

          <aside className="public-card h-fit rounded-2xl border border-white/15 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">{t.nextTitle}</h2>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-slate-200">
              <li>{t.nextPoint1}</li>
              <li>{t.nextPoint2}</li>
              <li>{t.nextPoint3}</li>
              <li>{t.nextPoint4}</li>
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
