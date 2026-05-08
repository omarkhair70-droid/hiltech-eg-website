import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { design } from '@/lib/design';

const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(' ');

export function SectionShell({ children, className, compact = false }: { children: ReactNode; className?: string; compact?: boolean }) {
  return <section className={cx(compact ? design.sectionYCompact : design.sectionY, 'scroll-mt-24 md:scroll-mt-20', className)}><div className={design.container}>{children}</div></section>;
}

export function SectionHeader({ eyebrow, title, description, className }: { eyebrow?: string; title: string; description?: string; className?: string }) {
  return <div className={cx('max-w-4xl', className)}>{eyebrow ? <p className={cx(design.label, 'text-orange-600')}>{eyebrow}</p> : null}<h2 className={cx(design.headingSection, eyebrow ? 'mt-2.5' : '')}>{title}</h2>{description ? <p className="public-copy mt-3.5">{description}</p> : null}</div>;
}


export function PublicPageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="rounded-2xl border border-slate-700/30 bg-gradient-to-br from-navy-900 via-slate-900 to-navy-900 p-6 text-white shadow-[0_18px_48px_rgba(2,6,23,0.35)] md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h1><p className="mt-3 max-w-4xl text-sm text-slate-200 md:text-base">{description}</p></section>;
}

export function PremiumCard({ children, className, accent = false }: { children: ReactNode; className?: string; accent?: boolean }) {
  return <article className={cx(design.cardBase, 'text-slate-900 [&_a]:text-navy-900 [&_a]:decoration-navy-700 [&_a:hover]:text-navy-800', className)}>{accent ? <div className="mb-3 h-1.5 w-12 rounded bg-orange-500" /> : null}{children}</article>;
}

export function CTAButton({ href, children, variant = 'primary', className }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'link'; className?: string }) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'inline-flex items-center justify-center rounded-[var(--radius-button)] border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-900 hover:border-slate-400 hover:bg-slate-50',
    link: 'inline-flex items-center gap-1 font-semibold text-navy-900 underline underline-offset-4 hover:text-navy-800',
  };
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return <a href={href} className={cx(styles[variant], 'gap-2', className)}>{children}</a>;
  return <Link href={href} className={cx(styles[variant], 'gap-2', className)}>{children}</Link>;
}

export function BadgePill({ children, tone = 'orange' }: { children: ReactNode; tone?: 'orange' | 'slate' | 'navy' }) {
  const tones = {
    orange: 'border-orange-200 bg-orange-50 text-orange-700',
    slate: 'border-slate-300 bg-slate-100 text-slate-700',
    navy: 'border-slate-600 bg-navy-900/70 text-slate-100',
  };
  return <span className={cx('inline-flex rounded-full border px-3 py-1 text-xs font-semibold', tones[tone])}>{children}</span>;
}

export function CapabilityPill({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full border border-orange-300/70 bg-orange-100/80 px-3 py-1 text-[11px] font-semibold text-navy-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">{children}</span>;
}

export function NoticeBox({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'highlight' }) {
  return <div className={tone === 'highlight' ? 'rounded-xl border border-orange-200 bg-orange-50/60 p-4 text-sm text-slate-700' : 'rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'}>{children}</div>;
}

export function VisualPanel({ title, description, imageSrc = '/og-image.png', labels }: { title: string; description: string; imageSrc?: string; labels?: string[] }) {
  return <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-navy-800 to-navy-900 p-5 text-white lg:p-7"><Image src={imageSrc} alt={title} fill className="object-cover opacity-25" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" /><div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-900/55 to-navy-900/90" /><div className="relative z-10"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm text-slate-200">{description}</p>{labels?.length ? <div className="mt-4 flex flex-wrap gap-2">{labels.map((label) => <BadgePill key={label} tone="navy">{label}</BadgePill>)}</div> : null}</div><div className="absolute left-6 top-12 h-1 w-24 rounded bg-orange-500" /></div>;
}
