import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ServicesGrid } from '@/components/Sections';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services | Enterprise Infrastructure Delivery in Egypt',
  description:
    'Site surveys, engineering drawings, fiber and copper installation, rack readiness, and testing workflows for enterprise network infrastructure in Egypt.',
  alternates: { canonical: `${site.siteUrl}/services` },
  openGraph: {
    title: 'HILTECH Services | Enterprise Infrastructure Delivery',
    description:
      'Information network infrastructure services from technical survey and planning to implementation and testing workflows in Egypt.',
    url: `${site.siteUrl}/services`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const proofAreas = [
  {
    title: 'Fiber Installation',
    description: 'Fiber cable extension, splicing, termination, and testing support.',
    image: '/fiber-splicing-workbench.jpg',
    alt: 'Technician performing fiber splicing on a cable workbench with precision tools.',
  },
  {
    title: 'Rack Installation',
    description: 'Rack preparation, cable routing, patching, and infrastructure readiness.',
    image: '/rack-cable-management-blue.jpg',
    alt: 'Network rack with organized blue cable management and labeled patching.',
  },
  {
    title: 'Copper Installation',
    description: 'Structured copper cabling, termination, labeling, and office network delivery.',
    image: '/copper-cable-pulling.jpg',
    alt: 'Field team pulling copper cables through building pathways during installation.',
  },
  {
    title: 'Testing & Measurement Tools',
    description: 'Fluke, OTDR, power meter, copper testing, and splice support where applicable.',
    image: '/testing-field-device.jpg',
    alt: 'Field engineer using handheld testing equipment to validate network infrastructure.',
  },
];

const testingTools = ['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester', 'Fiber fusion splice'];

async function getReferenceLogos() {
  const directories = [
    {
      fileSystemPath: path.join(process.cwd(), 'public/company-profile/references-unconfirmed'),
      publicPath: '/company-profile/references-unconfirmed',
      matcher: (file: string) => /\.(png|jpe?g|webp|svg)$/i.test(file),
    },
    {
      fileSystemPath: path.join(process.cwd(), 'public/references-unconfirmed'),
      publicPath: '/references-unconfirmed',
      matcher: (file: string) => /\.(png|jpe?g|webp|svg)$/i.test(file),
    },
    {
      fileSystemPath: path.join(process.cwd(), 'public'),
      publicPath: '',
      matcher: (file: string) => /^(client|partner)-.+\.png$/i.test(file),
    },
  ];

  const logos = await Promise.all(
    directories.map(async ({ fileSystemPath, publicPath, matcher }) => {
      try {
        const files = await fs.readdir(fileSystemPath);
        return files
          .filter((file) => matcher(file))
          .map((file) => ({
            src: `${publicPath}/${file}`,
            alt: `${file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')} reference logo`,
          }));
      } catch {
        return [];
      }
    }),
  );

  return logos.flat();
}

export default async function Page() {
  const logos = await getReferenceLogos();

  return <main className="section"><div className="container"><h1 className="text-3xl font-bold leading-tight sm:text-4xl">Infrastructure Services Designed for Reliable Business Operations.</h1><p className="mt-3 text-slate-700">HILTECH provides practical, standards-driven network infrastructure services covering site inspection, engineering planning, implementation, and measured delivery support.</p></div><ServicesGrid />
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Field-proven infrastructure work</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{proofAreas.map((item) => <article key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><div className="relative aspect-[16/10] w-full"><Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="p-4"><h3 className="font-semibold text-slate-900">{item.title}</h3><p className="mt-1 text-sm text-slate-700">{item.description}</p></div></article>)}</div></div></div></section>
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Testing tools used across delivery</h2><p className="mt-2 text-sm text-slate-700">Used across inspection, testing, and delivery workflows where applicable.</p><ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">{testingTools.map((tool) => <li key={tool} className="rounded-lg border border-slate-200 bg-white px-3 py-2">• {tool}</li>)}</ul></div></div></section>
    {logos.length > 0 ? <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Selected partners and client references</h2><p className="mt-2 text-sm text-slate-700">Displayed based on HILTECH&apos;s supplied company profile.</p><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{logos.map((logo) => <div key={logo.src} className="flex h-20 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-3"><Image src={logo.src} alt={logo.alt} width={130} height={56} className="h-auto max-h-10 w-auto object-contain" /></div>)}</div></div></div></section> : null}
    <section className="section pt-0"><div className="container"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><h2 className="text-2xl font-bold text-slate-900">Map services to solution pathways</h2><p className="mt-2 text-sm text-slate-700">Move from service scope to business-outcome solution pages for planning and RFQ readiness.</p><div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{[{label:'Structured Cabling',slug:'structured-cabling'},{label:'Fiber Backbone',slug:'fiber-backbone'},{label:'Data Room Infrastructure',slug:'data-rooms'},{label:'CCTV Infrastructure',slug:'cctv-infrastructure'},{label:'Testing & Validation',slug:'network-testing'},{label:'Project Supply & RFQ',slug:'project-supply-rfq'}].map((item)=><Link key={item.slug} href={`/solutions/${item.slug}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">{item.label}</Link>)}</div></div></div></section></main>;
}
