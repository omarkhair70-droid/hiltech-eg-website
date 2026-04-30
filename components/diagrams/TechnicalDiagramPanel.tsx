import { ReactNode } from 'react';

type TechnicalDiagramPanelProps = {
  title: string;
  subtitle?: string;
  labels?: string[];
  note?: string;
  children: ReactNode;
};

export function TechnicalDiagramPanel({ title, subtitle, labels, note, children }: TechnicalDiagramPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-orange-300/20 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 p-4 text-white shadow-xl md:p-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.2) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
      <div className="relative z-10">
        <h3 className="text-base font-bold md:text-lg">{title}</h3>
        {subtitle ? <p className="mt-1 text-xs text-slate-300 md:text-sm">{subtitle}</p> : null}
        {labels?.length ? <div className="mt-3 flex flex-wrap gap-2">{labels.map((label) => <span key={label} className="rounded-full border border-orange-300/30 bg-orange-400/10 px-2 py-1 text-[11px] font-semibold text-orange-100">{label}</span>)}</div> : null}
        <div className="mt-4">{children}</div>
        {note ? <p className="mt-3 text-[11px] text-slate-300">{note}</p> : null}
      </div>
    </section>
  );
}
