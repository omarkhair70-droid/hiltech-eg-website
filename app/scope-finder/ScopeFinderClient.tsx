'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getRFQWhatsappLink, normalizeRFQItem, readRFQItems, writeRFQItems } from '@/lib/rfq';
import { requestChecklist, resolveScopeResult, type ScopeAnswers } from '@/content/scope-finder';

const questions = [
  { key: 'environment', label: 'What type of environment are you planning for?', options: [['office-commercial', 'Office / Commercial Space'], ['school-training', 'School / Training Facility'], ['warehouse-factory', 'Warehouse / Factory'], ['data-room', 'Data Room / Technical Room'], ['retail-branch', 'Retail / Branch Location'], ['cctv-security', 'CCTV / Security Infrastructure'], ['not-sure', 'Not sure yet']] },
  { key: 'mainNeed', label: 'What is the main need?', options: [['new-network', 'New network installation'], ['upgrade-network', 'Upgrade existing network'], ['fiber-backbone', 'Fiber backbone / inter-floor connection'], ['cctv-readiness', 'CCTV and security readiness'], ['data-room-organization', 'Data room / rack organization'], ['product-supply-only', 'Product supply only'], ['testing-validation', 'Testing and validation'], ['not-sure', 'Not sure yet']] },
  { key: 'scale', label: 'Approximate scale?', options: [['small', 'Small: under 20 endpoints/cameras'], ['medium', 'Medium: 20–80 endpoints/cameras'], ['large', 'Large: 80+ endpoints/cameras'], ['multi-floor', 'Multi-floor / multi-zone'], ['not-sure', 'Not sure yet']] },
  { key: 'supplyMode', label: 'Do you need HILTECH to supply products?', options: [['supply-install', 'Yes, supply and installation'], ['supply-only', 'Product supply only'], ['install-only', 'Installation only'], ['not-sure', 'Not sure yet']] },
  { key: 'cctv', label: 'Do you need CCTV/security?', options: [['yes', 'Yes'], ['no', 'No'], ['maybe-later', 'Maybe later']] },
  { key: 'testing', label: 'Is testing/handover validation required?', options: [['full-testing', 'Yes, include testing/reporting'], ['basic-handover', 'Basic handover only'], ['not-sure', 'Not sure yet']] },
  { key: 'urgency', label: 'How urgent is the request?', options: [['standard', 'Standard'], ['urgent', 'Urgent'], ['planning', 'Planning stage only']] },
] as const;

const initial: ScopeAnswers = { environment: 'not-sure', mainNeed: 'not-sure', scale: 'not-sure', supplyMode: 'not-sure', cctv: 'maybe-later', testing: 'not-sure', urgency: 'standard' };

export default function ScopeFinderClient() {
  const [answers, setAnswers] = useState<ScopeAnswers>(initial);
  const result = useMemo(() => resolveScopeResult(answers), [answers]);

  const addStarterItems = () => {
    const existing = readRFQItems();
    const combined = [...existing];
    result.starterItems.forEach((item, index) => {
      combined.push(normalizeRFQItem({ id: `scope-finder-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`, name: item.name, category: item.category, brand: item.brand, quantity: 1, unit: item.unit, notes: 'Added from Smart Scope Finder' }));
    });
    writeRFQItems(combined);
  };

  return <div className="space-y-6"><section className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Smart utility</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Smart Project Scope Finder</h1><p className="mt-2 text-sm text-slate-700">Answer a few project questions to get a preliminary scope direction and RFQ starter path.</p></section><section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-semibold text-slate-900">Progress: {questions.length}/{questions.length}</p><div className="mt-4 space-y-5">{questions.map((question) => <fieldset key={question.key}><legend className="text-sm font-semibold text-slate-900">{question.label}</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{question.options.map(([value, label]) => <label key={value} className="cursor-pointer rounded-lg border border-slate-300 p-3 text-sm text-slate-800 has-[:checked]:border-navy-700 has-[:checked]:bg-navy-50"><input className="mr-2" type="radio" name={question.key} checked={answers[question.key] === value} onChange={() => setAnswers((prev) => ({ ...prev, [question.key]: value }))} />{label}</label>)}</div></fieldset>)}</div></section><section className="rounded-2xl border border-navy-200 bg-navy-50 p-5"><h2 className="text-xl font-bold text-slate-900">Recommended Scope: {result.title}</h2><p className="mt-2 text-sm text-slate-700">{result.explanation}</p><div className="mt-4 grid gap-4 md:grid-cols-2"><div><p className="text-sm font-semibold">Recommended solutions</p><ul className="mt-2 space-y-1 text-sm">{result.solutionSlugs.map((slug) => <li key={slug}><Link href={`/solutions/${slug}`} className="font-medium text-navy-900 underline">/solutions/{slug}</Link></li>)}</ul></div><div><p className="text-sm font-semibold">Suggested product categories</p><ul className="mt-2 space-y-1 text-sm">{result.productSlugs.map((slug) => <li key={slug}><Link href={`/products-partners/${slug}`} className="font-medium text-navy-900 underline">/products-partners/{slug}</Link></li>)}</ul></div></div><div className="mt-4"><p className="text-sm font-semibold">Suggested RFQ starter items</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{result.starterItems.map((item) => <li key={item.name}>{item.name} ({item.category})</li>)}</ul></div><div className="mt-4"><p className="text-sm font-semibold">What to include in your request</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{requestChecklist.map((item) => <li key={item}>{item}</li>)}</ul></div><p className="mt-4 rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-700">This is a preliminary scope suggestion. Final product selection, availability, compatibility, and quotation must be confirmed by HILTECH.</p><div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap"><button onClick={addStarterItems} className="btn-primary">Add suggested starter items to RFQ Basket</button><Link href="/rfq" className="inline-flex items-center rounded-lg border px-4 py-2">Review RFQ Basket</Link><Link href="/contact" className="inline-flex items-center rounded-lg border px-4 py-2">Request Project Quote</Link><a href={getRFQWhatsappLink(readRFQItems())} className="inline-flex items-center rounded-lg border px-4 py-2">WhatsApp HILTECH</a></div></section></div>;
}
