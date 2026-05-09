'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import { arRFQMessages, type RFQMessages } from '@/content/ar/rfq';
import { buildRFQWhatsappMessage, getRFQWhatsappLink, MAX_RFQ_QUANTITY, MIN_RFQ_QUANTITY, normalizeRFQItem, normalizeRFQQuantity, readRFQItems, writeRFQItems, type RFQItem, type RFQProjectDetails } from '@/lib/rfq';
import { isValidEgyptPhone } from '@/lib/phone';

const en = {
  basketTitle: 'RFQ Summary', projectDetails: 'Project details', fullName: 'Full Name', phoneNumber: 'Phone Number', emailAddress: 'Email Address', companyName: 'Company Name', projectLocation: 'Project Location', projectNotes: 'Project Notes', submitRFQ: 'Submit RFQ Request', submitting: 'Saving RFQ...', emptyBasket: 'Add at least one item before submitting an RFQ.', browseProducts: 'Browse Products', contactHiltech: 'Contact HILTECH', quantity: 'Quantity', remove: 'Remove', urgency: 'Urgency', reference: 'Reference', copyReference: 'Copy Reference', trackThisRFQ: 'Track this RFQ', sendViaWhatsappToo: 'Send via WhatsApp too', backToProducts: 'Back to Products', successTitle: 'RFQ submitted successfully', successBody: 'Save this reference to track your request.', finalQuotationNote: 'Final quotation confirmed after RFQ review.', priceReference: 'Price ref', priceOnRequest: 'Price on request', availabilityNote: 'Availability confirmed during RFQ review', fullNameRequired: 'Enter your full name.', phoneRequired: 'Enter a valid Egyptian phone number.', emailRequired: 'Email address is required.', invalidEmail: 'Enter a valid email address.', quantityError: 'Quantity must be between 1 and 9999.', submitError: 'We couldn’t save your RFQ right now. You can still send it via WhatsApp.', fullNamePlaceholder: '', phonePlaceholder: '', emailPlaceholder: '', companyPlaceholder: '', locationPlaceholder: '', notesPlaceholder: 'Item notes',
} as const;

export default function RFQReviewClient({ locale = 'en', messages, productsHref = '/products-partners', trackHrefBase = '/track', contactHref = '/contact' }: { locale?: 'en'|'ar'; messages?: RFQMessages; productsHref?: string; trackHrefBase?: string; contactHref?: string }) {
  const t = (locale === 'ar' ? messages || arRFQMessages : en) as typeof en;
  const [items, setItems] = useState<RFQItem[]>([]);
  const [project, setProject] = useState<RFQProjectDetails>({});
  const [submitState, setSubmitState] = useState<{status:'idle'|'submitting'|'error'|'success'; requestCode?: string; message?: string}>({ status: 'idle' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [quantityError, setQuantityError] = useState('');
  const fullNameRef = useRef<HTMLInputElement>(null); const phoneRef = useRef<HTMLInputElement>(null); const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => setItems(readRFQItems()), []); useEffect(() => writeRFQItems(items), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + normalizeRFQQuantity(i.quantity), 0), [items]);
  const updateItem = (id: string, patch: Partial<RFQItem>) => setItems((p) => p.map((e) => e.id === id ? normalizeRFQItem({ ...e, ...patch }) : e));
  const validate = () => {
    const e: Record<string,string> = {};
    if (!project.fullName?.trim()) e.fullName = t.fullNameRequired;
    if (!project.phoneNumber?.trim() || !isValidEgyptPhone(project.phoneNumber)) e.phoneNumber = t.phoneRequired;
    if (!project.emailAddress?.trim()) e.emailAddress = t.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.emailAddress.trim())) e.emailAddress = t.invalidEmail;
    setErrors(e); const f = Object.keys(e)[0]; if (f === 'fullName') fullNameRef.current?.focus(); if (f === 'phoneNumber') phoneRef.current?.focus(); if (f === 'emailAddress') emailRef.current?.focus();
    return Object.keys(e).length===0;
  };
  const submit = async () => {
    if (!validate()) return;
    const normalizedItems = items.map((item) => normalizeRFQItem(item));
    if (normalizedItems.some((i) => i.quantity < MIN_RFQ_QUANTITY || i.quantity > MAX_RFQ_QUANTITY)) { setQuantityError(t.quantityError); return; }
    setSubmitState({status:'submitting'});
    try {
      const response = await fetch('/api/rfq', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ customer: { fullName: project.fullName, companyName: project.companyName, phone: project.phoneNumber, email: project.emailAddress, projectLocation: project.projectLocation, projectNotes: project.projectNotes, requestType: null }, items: normalizedItems.map((item) => ({ productId:item.id, name:item.name, category:item.category, brand:item.brand, quantity:item.quantity, unit:item.unit, urgency:item.urgency, notes:item.notes })), urgency: null, source: 'rfq_page', whatsappMessage: buildRFQWhatsappMessage(normalizedItems, project) })});
      const data = await response.json(); if (!response.ok || !data.ok || !data.requestCode) throw new Error(); setSubmitState({status:'success', requestCode:data.requestCode}); trackEvent('rfq_submit_success',{item_count:items.length,total_units:count,source:'rfq_page'});
    } catch { setSubmitState({status:'error', message:t.submitError}); }
  };
  return <div dir={locale==='ar'?'rtl':'ltr'} className="space-y-4"><h1 className="text-2xl font-bold">{t.basketTitle}</h1>{items.length===0?<div><p>{t.emptyBasket}</p><Link href={productsHref}>{t.browseProducts}</Link></div>:items.map((item)=><article key={item.id} className="border p-3 rounded"><h3>{item.name}</h3><p>{item.category}</p><div className="flex gap-2 items-center"><button onClick={()=>updateItem(item.id,{quantity:normalizeRFQQuantity(item.quantity-1)})}>-</button><span>{t.quantity}: {item.quantity}</span><button onClick={()=>updateItem(item.id,{quantity:normalizeRFQQuantity(item.quantity+1)})}>+</button><button className="ml-auto" onClick={()=>setItems((p)=>p.filter((e)=>e.id!==item.id))}>{t.remove}</button></div></article>)}{quantityError?<p>{quantityError}</p>:null}<input ref={fullNameRef} placeholder={t.fullNamePlaceholder} value={project.fullName||''} onChange={(e)=>setProject((p)=>({...p,fullName:e.target.value}))}/><input ref={phoneRef} placeholder={t.phonePlaceholder} value={project.phoneNumber||''} onChange={(e)=>setProject((p)=>({...p,phoneNumber:e.target.value}))}/><input ref={emailRef} placeholder={t.emailPlaceholder} value={project.emailAddress||''} onChange={(e)=>setProject((p)=>({...p,emailAddress:e.target.value}))}/>{errors.fullName?<p>{errors.fullName}</p>:null}{errors.phoneNumber?<p>{errors.phoneNumber}</p>:null}{errors.emailAddress?<p>{errors.emailAddress}</p>:null}<button onClick={submit}>{submitState.status==='submitting'?t.submitting:t.submitRFQ}</button>{submitState.status==='success'&&submitState.requestCode?<div><p>{t.successTitle}</p><p>{t.reference}: <span dir="ltr">{submitState.requestCode}</span></p><Link href={`${trackHrefBase}?request_code=${encodeURIComponent(submitState.requestCode)}`}>{t.trackThisRFQ}</Link><Link href={productsHref}>{t.backToProducts}</Link><a href={getRFQWhatsappLink(items, project)}>{t.sendViaWhatsappToo}</a></div>:null}{submitState.status==='error'?<p>{submitState.message}</p>:null}<a href={contactHref}>{t.contactHiltech}</a></div>;
}
