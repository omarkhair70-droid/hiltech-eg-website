import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { design } from '@/lib/design';

const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(' ');

export function SectionShell({ children, className, compact = false }: { children: ReactNode; className?: string; compact?: boolean }) {
  return <section className={cx(compact ? design.sectionYCompact : design.sectionY, className)}><div className={design.container}>{children}</div></section>;
}

export function SectionHeader({ eyebrow, title, description, className }: { eyebrow?: string; title: string; description?: string; className?: string }) {
  return <div className={cx('max-w-4xl', className)}>{eyebrow ? <p className={cx(design.label, 'text-orange-600')}>{eyebrow}</p> : null}<h2 className={cx(design.headingSection, eyebrow ? 'mt-2' : '')}>{title}</h2>{description ? <p className="mt-3 text-slate-700">{description}</p> : null}</div>;
}

export function PremiumCard({ children, className, accent = false }: { children: ReactNode; className?: string; accent?: boolean }) {
  return <article className={cx(design.cardBase, className)}>{accent ? <div className="mb-3 h-1.5 w-12 rounded bg-orange-500" /> : null}{children}</article>;
}

export function CTAButton({ href, children, variant = 'primary', className }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'link'; className?: string }) {
  const styles = {
    primary: 'inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600',
    secondary: 'inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-900 hover:bg-slate-100',
    ghost: 'inline-flex items-center justify-center rounded-md border border-slate-500/80 bg-transparent px-5 py-2.5 font-semibold text-slate-100 hover:border-orange-300 hover:text-orange-200',
    link: 'inline-flex items-center gap-1 font-semibold text-navy-900 underline-offset-4 hover:underline',
  };
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return <a href={href} className={cx(styles[variant], className)}>{children}</a>;
  return <Link href={href} className={cx(styles[variant], className)}>{children}</Link>;
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
  return <span className="inline-flex rounded-full border border-orange-300/40 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-200">{children}</span>;
}

export function NoticeBox({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'highlight' }) {
  return <div className={tone === 'highlight' ? 'rounded-xl border border-orange-200 bg-orange-50/60 p-4 text-sm text-slate-700' : 'rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'}>{children}</div>;
}

export function VisualPanel({ title, description, imageSrc = '/og-image.png', labels }: { title: string; description: string; imageSrc?: string; labels?: string[] }) {
  return <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-navy-800 to-navy-900 p-5 text-white lg:p-7"><Image src={imageSrc} alt={title} fill className="object-cover opacity-25" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" /><div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-900/55 to-navy-900/90" /><div className="relative z-10"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 max-w-xl text-sm text-slate-200">{description}</p>{labels?.length ? <div className="mt-4 flex flex-wrap gap-2">{labels.map((label) => <BadgePill key={label} tone="navy">{label}</BadgePill>)}</div> : null}</div><div className="absolute left-6 top-12 h-1 w-24 rounded bg-orange-500" /></div>;
}
