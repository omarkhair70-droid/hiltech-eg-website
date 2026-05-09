import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { design } from '@/lib/design';

const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(' ');

export function SectionShell({ children, className, compact = false }: { children: ReactNode; className?: string; compact?: boolean }) {
  return <section className={cx(compact ? design.sectionYCompact : design.sectionY, 'scroll-mt-24 md:scroll-mt-20', className)}><div className={design.container}>{children}</div></section>;
}

export function SectionHeader({ eyebrow, title, description, className }: { eyebrow?: string; title: string; description?: string; className?: string }) {
  return <div className={cx('max-w-4xl', className)}>{eyebrow ? <p className={cx(design.label, 'text-orange-400')}>{eyebrow}</p> : null}<h2 className={cx(design.headingSection, eyebrow ? 'mt-2.5' : '', 'text-white')}>{title}</h2>{description ? <p className="public-copy mt-3.5 text-slate-300">{description}</p> : null}</div>;
}

export function PremiumCard({ children, className, accent = false }: { children: ReactNode; className?: string; accent?: boolean }) {
  return <article className={cx('rounded-xl border backdrop-blur-sm', accent ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/15' : 'bg-white border-slate-200', 'text-slate-900 [&_a]:text-navy-900 [&_a]:decoration-navy-700 [&_a:hover]:text-navy-800', className)}>{accent ? <div className="mb-3 h-1.5 w-12 rounded bg-orange-500" /> : null}{children}</article>;
}

export function CTAButton({ href, children, variant = 'primary', className, onClick }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'link'; className?: string; onClick?: () => void }) {
  const styles = {
    primary: 'inline-flex items-center justify-center px-5 py-2.5 font-semibold text-white transition-colors rounded-[var(--radius-button)] bg-orange-600 hover:bg-orange-700',
    secondary: 'inline-flex items-center justify-center border border-white/20 px-5 py-2.5 font-semibold text-slate-200 hover:bg-white/10 hover:border-white/30 rounded-[var(--radius-button)] transition-colors backdrop-blur-sm',
    ghost: 'inline-flex items-center justify-center rounded-[var(--radius-button)] border border-white/20 bg-white/5 px-5 py-2.5 font-semibold text-slate-200 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-colors',
    link: 'inline-flex items-center gap-1 font-semibold text-orange-400 underline underline-offset-4 hover:text-orange-300',
  };
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return <a href={href} onClick={onClick} className={cx(styles[variant], 'gap-2', className)}>{children}</a>;
  return <Link href={href} onClick={onClick} className={cx(styles[variant], 'gap-2', className)}>{children}</Link>;
}

export function BadgePill({ children, tone = 'orange' }: { children: ReactNode; tone?: 'orange' | 'slate' | 'navy' }) {
  const tones = {
    orange: 'border-orange-500/40 bg-orange-500/10 text-orange-200',
    slate: 'border-white/20 bg-white/5 text-slate-200',
    navy: 'border-white/20 bg-white/5 text-slate-200',
  };
  return <span className={cx('inline-flex rounded-full border px-3 py-1 text-xs font-semibold', tones[tone])}>{children}</span>;
}

export function CapabilityPill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-200">{children}</span>;
}

export function NoticeBox({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'highlight' }) {
  return <div className={tone === 'highlight' ? 'rounded-xl border border-orange-500/40 bg-orange-500/10 p-4 text-sm text-orange-200 backdrop-blur-sm' : 'rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-300 backdrop-blur-sm'}>{children}</div>;
}

export function VisualPanel({ title, description, imageSrc = '/og-image.png', labels }: { title: string; description: string; imageSrc?: string; labels?: string[] }) {
  return <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900 to-slate-950 p-5 text-white lg:p-7 backdrop-blur-sm"><Image src={imageSrc} alt={title} fill className="object-cover opacity-25" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" /><div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/55 to-slate-950/90" /><div className="relative z-10"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm text-slate-200">{description}</p>{labels?.length ? <div className="mt-4 flex flex-wrap gap-2">{labels.map((label) => <BadgePill key={label} tone="navy">{label}</BadgePill>)}</div> : null}</div><div className="absolute left-6 top-12 h-1 w-24 rounded bg-orange-500" /></div>;
}
