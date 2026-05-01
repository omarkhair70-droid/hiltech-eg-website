import Image from 'next/image';
import type { Metadata } from 'next';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About HILTECH | Network Infrastructure Company in Egypt',
  description:
    'Learn how HILTECH delivers structured cabling, fiber optics, data room infrastructure, CCTV connectivity, and project supply support across Egypt.',
  alternates: { canonical: `${site.siteUrl}/about` },
  openGraph: {
    title: 'About HILTECH | Infrastructure in Egypt',
    description:
      'Execution-first enterprise network infrastructure delivery with project supply support across Egypt.',
    url: `${site.siteUrl}/about`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page(){return <main className="section"><div className="container space-y-4"><h1 className="text-3xl font-bold leading-tight sm:text-4xl">About HILTECH</h1><p>HILTECH ({site.officialName}) delivers structured, reliable infrastructure solutions that help businesses stay connected, secure, and operational.</p><p>HILTECH combines technical execution with project-based product supply, helping businesses build reliable network infrastructure from the physical cabling layer to cabinets, testing, CCTV, and ongoing support.</p><section className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-navy-900 px-4 py-4 text-white shadow-sm sm:px-5 sm:py-5"><div className="absolute inset-y-0 right-0 w-full sm:w-[58%]"><Image src="/og-image.png" alt="HILTECH brand infrastructure visual" fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, 58vw" /><div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/50" /></div><div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/25" /><div className="relative z-10 flex min-h-[110px] flex-col justify-center gap-2.5 sm:max-w-[62%]"><Image src="/logo-dark.png" alt="HILTECH" width={90} height={30} className="h-6 w-auto sm:h-7" /><p className="text-sm leading-relaxed text-slate-100">Execution-first, enterprise-ready infrastructure capabilities built around physical network reliability.</p></div></section><p className="font-semibold text-orange-600">{site.slogan}</p></div></main>}
