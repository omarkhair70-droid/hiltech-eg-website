import type { Metadata } from 'next';
import { PremiumCard, SectionShell } from '@/components/ui/primitives';
import { launchCopy, salesMessageTemplates } from '@/content/sales-materials';

export const metadata: Metadata = {
  title: 'Launch Copy & Sales Templates | HILTECH Resources',
  description: 'Public-safe launch posts and sales message templates prepared for client communication.',
  alternates: { canonical: 'https://hiltech-eg.com/resources/launch-copy' },
  openGraph: { title: 'Launch Copy & Sales Templates | HILTECH', description: 'Available as sales copy for social launch and outreach workflows.', url: 'https://hiltech-eg.com/resources/launch-copy', images: ['/og-image.png'] },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};

const launchPosts = [
  ['Facebook Launch Post', 'Arabic', launchCopy.facebookAr],
  ['Facebook Launch Post', 'English', launchCopy.facebookEn],
  ['LinkedIn-Style B2B Post', 'English', launchCopy.linkedInEn],
  ['Short Caption', 'Arabic', launchCopy.captionAr],
  ['Short Caption', 'English', launchCopy.captionEn],
] as const;

export default function LaunchCopyPage() {
  return <main><SectionShell><h1 className="text-3xl font-bold text-slate-900">Launch Copy & Sales Templates</h1><p className="mt-2 text-sm text-slate-600">Available as sales copy. Copy manually as needed before publishing.</p><section className="mt-8"><h2 className="text-2xl font-semibold">Website Launch Posts</h2><div className="mt-4 grid gap-4">{launchPosts.map(([label, language, text]) => <PremiumCard key={label + language}><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{label} • {language}</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{text}</pre></PremiumCard>)}</div></section><section className="mt-8"><h2 className="text-2xl font-semibold">WhatsApp Broadcast Messages</h2><div className="mt-4 grid gap-4 md:grid-cols-2"><PremiumCard><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Arabic</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{launchCopy.whatsappAr}</pre></PremiumCard><PremiumCard><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">English</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{launchCopy.whatsappEn}</pre></PremiumCard></div></section><section className="mt-8"><h2 className="text-2xl font-semibold">Sales Message Templates</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{Object.entries(salesMessageTemplates).map(([key, text]) => <PremiumCard key={key}><p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{key}</p><pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{text}</pre></PremiumCard>)}</div></section></SectionShell></main>;
}
