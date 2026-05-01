import { ReactNode } from 'react';

type TechnicalDiagramPanelProps = {
  title: string;
  subtitle?: string;
  labels?: string[];
  note?: string;
  surface?: 'dark' | 'light';
  children: ReactNode;
};

export function TechnicalDiagramPanel({ title, subtitle, labels, note, surface = 'dark', children }: TechnicalDiagramPanelProps) {
  const isDark = surface === 'dark';
  return (
    <section className={`relative w-full max-w-full overflow-hidden rounded-2xl border p-4 shadow-xl md:p-5 ${isDark ? 'border-orange-300/20 bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
      <div aria-hidden className={`pointer-events-none absolute inset-0 z-0 ${isDark ? 'opacity-20' : 'opacity-25'}`} style={{ backgroundImage: `linear-gradient(${isDark ? 'rgba(148,163,184,0.2)' : 'rgba(100,116,139,0.18)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(148,163,184,0.2)' : 'rgba(100,116,139,0.18)'} 1px, transparent 1px)`, backgroundSize: '26px 26px' }} />
      <div className="relative z-10">
        <h3 className={`text-base font-bold md:text-lg ${isDark ? 'text-white' : 'text-navy-900'}`}>{title}</h3>
        {subtitle ? <p className={`mt-1 text-xs md:text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{subtitle}</p> : null}
        {labels?.length ? <div className="mt-3 flex flex-wrap gap-2">{labels.map((label) => <span key={label} className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${isDark ? 'border-orange-300/45 bg-orange-400/18 text-orange-100' : 'border-orange-200 bg-orange-50 text-orange-700'}`}>{label}</span>)}</div> : null}
        <div className="mt-4">{children}</div>
        {note ? <p className={`mt-3 text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{note}</p> : null}
      </div>
    </section>
  );
}
