'use client';

export default function PrintRFQButton({ label = 'Print RFQ Summary' }: { label?: string }) {
  return <button onClick={() => window.print()} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">{label}</button>;
}
