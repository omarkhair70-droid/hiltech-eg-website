'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getRFQWhatsappLink, normalizeRFQItem, readRFQItems, writeRFQItems } from '@/lib/rfq';
import { requestChecklist, resolveScopeResult, type ScopeAnswers } from '@/content/scope-finder';

type Option = { value: ScopeAnswers[keyof ScopeAnswers]; label: string; helper?: string };
type Question = {
  key: keyof ScopeAnswers;
  label: string;
  options: Option[];
};

const questions: Question[] = [
  {
    key: 'environment',
    label: 'What type of environment are you planning for?',
    options: [
      { value: 'office-commercial', label: 'Office / Commercial Space' },
      { value: 'school-training', label: 'School / Training Facility' },
      { value: 'warehouse-factory', label: 'Warehouse / Factory' },
      { value: 'data-room', label: 'Data Room / Technical Room', helper: 'For cabinet layout, cable paths, and rack readiness.' },
      { value: 'retail-branch', label: 'Retail / Branch Location' },
      { value: 'cctv-security', label: 'CCTV / Security Infrastructure' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'mainNeed',
    label: 'What is the main need?',
    options: [
      { value: 'new-network', label: 'New network installation' },
      { value: 'upgrade-network', label: 'Upgrade existing network' },
      { value: 'fiber-backbone', label: 'Fiber backbone / inter-floor connection', helper: 'For linking floors, buildings, or data rooms.' },
      { value: 'cctv-readiness', label: 'CCTV and security readiness' },
      { value: 'data-room-organization', label: 'Data room / rack organization', helper: 'For cabinets, patch panels, ODFs, PDU, and cable management.' },
      { value: 'product-supply-only', label: 'Product supply only' },
      { value: 'testing-validation', label: 'Testing and validation', helper: 'For Fluke/OTDR-oriented checks before handover.' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'scale',
    label: 'Approximate scale?',
    options: [
      { value: 'small', label: 'Small: under 20 endpoints/cameras' },
      { value: 'medium', label: 'Medium: 20–80 endpoints/cameras' },
      { value: 'large', label: 'Large: 80+ endpoints/cameras' },
      { value: 'multi-floor', label: 'Multi-floor / multi-zone' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'supplyMode',
    label: 'Do you need HILTECH to supply products?',
    options: [
      { value: 'supply-install', label: 'Yes, supply and installation' },
      { value: 'supply-only', label: 'Product supply only' },
      { value: 'install-only', label: 'Installation only' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'cctv',
    label: 'Do you need CCTV/security?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe-later', label: 'Maybe later' },
    ],
  },
  {
    key: 'testing',
    label: 'Is testing/handover validation required?',
    options: [
      { value: 'full-testing', label: 'Yes, include testing/reporting', helper: 'Includes validation-oriented handover checks.' },
      { value: 'basic-handover', label: 'Basic handover only' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'urgency',
    label: 'How urgent is the request?',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'urgent', label: 'Urgent' },
      { value: 'planning', label: 'Planning stage only' },
    ],
  },
];

const initial: ScopeAnswers = { environment: 'not-sure', mainNeed: 'not-sure', scale: 'not-sure', supplyMode: 'not-sure', cctv: 'maybe-later', testing: 'not-sure', urgency: 'standard' };

const optionLabelByValue = questions.reduce<Record<string, string>>((acc, question) => {
  question.options.forEach((option) => {
    acc[option.value] = option.label;
  });
  return acc;
}, {});

export default function ScopeFinderClient() {
  const [answers, setAnswers] = useState<ScopeAnswers>(initial);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [addFeedback, setAddFeedback] = useState<string | null>(null);
  const [addedOnce, setAddedOnce] = useState(false);

  const result = useMemo(() => resolveScopeResult(answers), [answers]);
  const current = questions[step];
  const progressPercent = Math.round(((step + 1) / questions.length) * 100);

  const whyBullets = useMemo(() => {
    return [
      `You selected ${optionLabelByValue[answers.environment]}.`,
      `You selected ${optionLabelByValue[answers.mainNeed]}.`,
      `You selected ${optionLabelByValue[answers.scale]}.`,
      answers.testing === 'full-testing' ? 'You requested testing/reporting support.' : `You selected ${optionLabelByValue[answers.testing]}.`,
    ];
  }, [answers]);

  const fitBadge = useMemo(() => {
    const unsureCount = Object.values(answers).filter((value) => value === 'not-sure').length;
    if (unsureCount >= 3) return 'Needs confirmation';
    if (answers.urgency === 'planning' || answers.supplyMode === 'not-sure') return 'Planning fit';
    return 'High fit';
  }, [answers]);

  const addStarterItems = () => {
    if (addedOnce) return;
    const existing = readRFQItems();
    const existingKeys = new Set(existing.map((item) => `${item.name.toLowerCase()}::${item.category.toLowerCase()}`));
    const newItems = result.starterItems
      .filter((item) => !existingKeys.has(`${item.name.toLowerCase()}::${item.category.toLowerCase()}`))
      .map((item, index) =>
        normalizeRFQItem({
          id: `scope-finder-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
          name: item.name,
          category: item.category,
          brand: item.brand,
          quantity: 1,
          unit: item.unit,
          notes: 'Added from Smart Scope Finder',
        }),
      );

    if (newItems.length === 0) {
      setAddFeedback('Starter items already exist in your RFQ Basket.');
      setAddedOnce(true);
      return;
    }

    writeRFQItems([...existing, ...newItems]);
    setAddedOnce(true);
    setAddFeedback(`${newItems.length} starter item${newItems.length > 1 ? 's' : ''} added to your RFQ Basket.`);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Smart utility</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Scope Finder</h1>
        <p className="mt-2 text-sm text-slate-700">Answer a few project questions and get a preliminary infrastructure direction, suggested solution pages, and starter RFQ items.</p>
        <p className="mt-3 rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-700">No pricing or final scope is generated here — HILTECH confirms details before quotation.</p>
      </section>

      {!showResult ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
              <p>Step {step + 1} of {questions.length}</p>
              <p>{progressPercent}%</p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-navy-900 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <fieldset>
            <legend className="text-base font-semibold text-slate-900">{current.label}</legend>
            <div className="mt-3 grid gap-2">
              {current.options.map((option) => (
                <label key={option.value} className="cursor-pointer rounded-lg border border-slate-300 p-3 text-sm text-slate-800 has-[:checked]:border-navy-700 has-[:checked]:bg-navy-50">
                  <input className="mr-2" type="radio" name={current.key} checked={answers[current.key] === option.value} onChange={() => setAnswers((prev) => ({ ...prev, [current.key]: option.value as never }))} />
                  <span className="font-medium">{option.label}</span>
                  {option.helper ? <span className="mt-0.5 block pl-6 text-xs text-slate-600">{option.helper}</span> : null}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button type="button" className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</button>
            {step < questions.length - 1 ? (
              <button type="button" className="btn-primary" onClick={() => setStep((s) => Math.min(questions.length - 1, s + 1))}>Next</button>
            ) : (
              <button type="button" className="btn-primary" onClick={() => setShowResult(true)}>See My Recommended Scope</button>
            )}
          </div>
        </section>
      ) : null}

      {showResult ? (
        <section className="rounded-2xl border border-navy-200 bg-navy-50 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Recommended direction: {result.title}</h2>
            <span className="rounded-full border border-navy-300 bg-white px-2.5 py-1 text-xs font-semibold text-navy-900">{fitBadge}</span>
          </div>
          <p className="mt-2 text-sm text-slate-700">{result.explanation}</p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Why this matches your project</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {whyBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Recommended solutions</p>
              <ul className="mt-2 space-y-1 text-sm">
                {result.solutionSlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={`/solutions/${slug}`} className="font-medium text-navy-900 underline">/solutions/{slug}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Suggested product categories</p>
              <ul className="mt-2 space-y-1 text-sm">
                {result.productSlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={`/products-partners/intelligence/${slug}`} className="font-medium text-navy-900 underline">/products-partners/{slug}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold">Suggested RFQ starter items</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {result.starterItems.map((item) => (
                <li key={item.name}>{item.name} ({item.category})</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold">What to include in your request</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {requestChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4 rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-700">This is a preliminary scope suggestion. Final product selection, availability, compatibility, and quotation must be confirmed by HILTECH.</p>

          <div className="mt-4 space-y-2">
            <button type="button" onClick={addStarterItems} disabled={addedOnce} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">{addedOnce ? 'Starter items added' : 'Add starter items to RFQ Basket'}</button>
            <div>
              <Link href="/rfq" className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">Review RFQ Basket</Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/contact" className="font-semibold text-navy-900 underline">Request Project Quote</Link>
              <a href={getRFQWhatsappLink(readRFQItems())} className="font-semibold text-navy-900 underline">WhatsApp HILTECH</a>
            </div>
            {addFeedback ? (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-sm text-emerald-800">{addFeedback} <Link href="/rfq" className="font-semibold underline">Review RFQ Basket</Link></p>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
