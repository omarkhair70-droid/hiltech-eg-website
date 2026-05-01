import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTAButton, PremiumCard, SectionShell } from '@/components/ui/primitives';
import { onePagers } from '@/content/sales-materials';
import { site } from '@/content/site';

export function generateStaticParams() {
  return onePagers.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const onePager = onePagers.find((item) => item.slug === params.slug);
  if (!onePager) return {};
  const url = `https://hiltech-eg.com/resources/one-pagers/${onePager.slug}`;
  return {
    title: `${onePager.title} | HILTECH Resources`,
    description: onePager.shortIntro,
    alternates: { canonical: url },
    openGraph: { title: `${onePager.title} | HILTECH`, description: onePager.shortIntro, url, images: [site.ogImage] },
    twitter: { card: 'summary_large_image', images: [site.ogImage] },
  };
}

export default function OnePagerPage({ params }: { params: { slug: string } }) {
  const onePager = onePagers.find((item) => item.slug === params.slug);
  if (!onePager) notFound();

  return <main><SectionShell><article className="mx-auto max-w-4xl"><nav className="mb-4 text-sm text-slate-600"><Link className="underline" href="/resources">Resources</Link> / <span>One-Pagers</span> / <span className="text-slate-900">{onePager.title}</span></nav><h1 className="text-3xl font-bold text-slate-900">{onePager.title}</h1><p className="mt-3 text-slate-700">{onePager.shortIntro}</p><div className="mt-6 space-y-4"><PremiumCard><h2 className="text-lg font-semibold">Client Problem</h2><p className="mt-2 text-sm text-slate-700">{onePager.clientProblem}</p></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">How HILTECH Helps</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{onePager.howHiltechHelps.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">Typical Scope</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{onePager.typicalScope.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard><PremiumCard><h2 className="text-lg font-semibold">Request Checklist</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{onePager.requestChecklist.map((item) => <li key={item}>{item}</li>)}</ul></PremiumCard></div>{onePager.relatedSolution ? <p className="mt-4 text-sm">Related solution: <Link className="font-semibold text-navy-900 underline" href={onePager.relatedSolution}>View solution details</Link></p> : null}<div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-sm text-slate-700">{onePager.cta}</p><div className="mt-4 flex flex-wrap gap-2"><CTAButton href="/contact">Request Project Quote</CTAButton><CTAButton href="/rfq" variant="secondary">Review RFQ Basket</CTAButton><CTAButton href={site.contact.whatsappGeneralLink} variant="ghost">WhatsApp</CTAButton></div></div></article></SectionShell></main>;
}
