import type { Metadata } from 'next';
import { PremiumCard, SectionShell } from '@/components/ui/primitives';
import { launchCopy, salesMessageTemplates } from '@/content/sales-materials';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Client Communication Templates | HILTECH Resources',
  description: 'Client-safe launch communication copy and outreach templates for HILTECH team coordination.',
  alternates: { canonical: `${site.siteUrl}/resources/launch-copy` },
  openGraph: { title: 'Client Communication Templates | HILTECH', description: 'Launch communication copy for announcements, client updates, and outreach alignment.', url: `${site.siteUrl}/resources/launch-copy`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const launchPosts = [
  ['Facebook Launch Post', 'Arabic', launchCopy.facebookAr],
  ['Facebook Launch Post', 'English', launchCopy.facebookEn],
  ['LinkedIn-Style B2B Post', 'English', launchCopy.linkedInEn],
  ['Short Caption', 'Arabic', launchCopy.captionAr],
  ['Short Caption', 'English', launchCopy.captionEn],
] as const;

export default function LaunchCopyPage() {
  return <main><SectionShell><h1 className="text-3xl font-bold text-slate-900">Client Communication Templates</h1><p className="mt-2 text-sm text-slate-600">Ready-to-use launch communication copy for social posts, WhatsApp outreach, and client updates. Review and adapt before publishing.</p><section className="mt-8"><h2 className="text-2xl font-semibold">Website Launch Posts</h2><div className="mt-4 grid gap-4">{launchPosts.map(([label, language, text]) => <PremiumCard key={label + language}><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{label} • {language}</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{text}</pre></PremiumCard>)}</div></section><section className="mt-8"><h2 className="text-2xl font-semibold">WhatsApp Broadcast Messages</h2><div className="mt-4 grid gap-4 md:grid-cols-2"><PremiumCard><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Arabic</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{launchCopy.whatsappAr}</pre></PremiumCard><PremiumCard><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">English</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{launchCopy.whatsappEn}</pre></PremiumCard></div></section><section className="mt-8"><h2 className="text-2xl font-semibold">Sales Message Templates</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{Object.entries(salesMessageTemplates).map(([key, text]) => <PremiumCard key={key}><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{key}</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{text}</pre></PremiumCard>)}</div></section></SectionShell></main>;
}
