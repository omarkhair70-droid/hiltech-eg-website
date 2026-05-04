'use client';

export default function PrintRFQButton() {
  return <button onClick={() => window.print()} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">Print RFQ Summary</button>;
}
