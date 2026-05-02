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

const fieldGalleryGroups = [
  {
    title: 'Fiber work',
    images: [
      { src: '/fiber-cable-closeup.jpg', alt: 'Close-up of installed fiber optic cable strands and protective jacket.' },
      { src: '/fiber-connectors-closeup.jpg', alt: 'Fiber connectors arranged during preparation and termination tasks.' },
      { src: '/fiber-distribution-panel.jpg', alt: 'Fiber distribution panel showing organized termination points.' },
      { src: '/fiber-patch-panel-closeup.jpg', alt: 'Fiber patch panel with labeled ports and patching points.' },
      { src: '/fiber-termination-box.jpg', alt: 'Wall-mounted fiber termination box with routed patch leads.' },
    ],
  },
  {
    title: 'Rack & data room work',
    images: [
      { src: '/rack-cable-management-white.jpg', alt: 'Structured rack cable management with clean white patch routing.' },
      { src: '/rack-data-room.jpg', alt: 'Data room rack layout prepared for enterprise network deployment.' },
      { src: '/rack-front-cabling.jpg', alt: 'Front-facing rack cabling with neat horizontal and vertical routing.' },
      { src: '/rack-patch-panel-blue.jpg', alt: 'Rack patch panel with blue cabling arranged for maintainability.' },
      { src: '/rack-terminal-panel.jpg', alt: 'Rack terminal panel with grouped terminations and labels.' },
      { src: '/rack-yellow-patching.jpg', alt: 'Yellow network patch leads routed inside rack infrastructure.' },
    ],
  },
  {
    title: 'Copper cabling work',
    images: [
      { src: '/copper-cable-tray.jpg', alt: 'Copper cabling routed through tray infrastructure in a building corridor.' },
      { src: '/copper-cabling-closeup.jpg', alt: 'Close-up of copper cable bundle prepared for structured cabling deployment.' },
      { src: '/copper-ceiling-routing.jpg', alt: 'Copper route paths installed above ceiling for office connectivity.' },
      { src: '/copper-floor-routing.jpg', alt: 'Copper floor-level routing prepared for workstation connectivity points.' },
      { src: '/copper-patch-panel.jpg', alt: 'Copper patch panel with terminated and organized network ports.' },
      { src: '/copper-riser-routing.jpg', alt: 'Vertical copper riser routing prepared between building floors.' },
    ],
  },
  {
    title: 'Testing tools',
    images: [
      { src: '/testing-fluke-meter.jpg', alt: 'Fluke test meter used for field validation and diagnostics.' },
      { src: '/testing-otdr-device.jpg', alt: 'OTDR testing device used for fiber path and fault measurements.' },
      { src: '/testing-power-meter.jpg', alt: 'Optical power meter used for fiber signal level verification.' },
      { src: '/testing-digital-copper-tester.jpg', alt: 'Digital copper tester used for cable continuity and performance checks.' },
    ],
  },
] as const;

type LogoItem = { src: string; alt: string; filename: string };

async function getReferenceLogos() {
  const directories = [
    {
      fileSystemPath: path.join(process.cwd(), 'public/company-profile/references-unconfirmed'),
      publicPath: '/company-profile/references-unconfirmed',
      matcher: (file: string) => /^(client|partner)-.+\.(png|jpe?g|webp|svg)$/i.test(file),
    },
    {
      fileSystemPath: path.join(process.cwd(), 'public/references-unconfirmed'),
      publicPath: '/references-unconfirmed',
      matcher: (file: string) => /^(client|partner)-.+\.(png|jpe?g|webp|svg)$/i.test(file),
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
            filename: file,
            alt: `${file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')} logo shown in supplied company profile`,
          }));
      } catch {
        return [];
      }
    }),
  );

  const bySource = new Map<string, LogoItem>();
  logos.flat().forEach((logo) => bySource.set(logo.src, logo));

  const sorted = [...bySource.values()].sort((a, b) => a.filename.localeCompare(b.filename));

  return {
    partners: sorted.filter((logo) => logo.filename.toLowerCase().startsWith('partner-')),
    clients: sorted.filter((logo) => logo.filename.toLowerCase().startsWith('client-')),
  };
}

export default async function Page() {
  const hasPartnerPanel = await fs
    .access(path.join(process.cwd(), 'public/references-partners-panel.jpg'))
    .then(() => true)
    .catch(() => false);
  const hasClientPanel = await fs
    .access(path.join(process.cwd(), 'public/references-clients-panel.jpg'))
    .then(() => true)
    .catch(() => false);
  const hasReferencePanels = hasPartnerPanel && hasClientPanel;

  const { partners, clients } = await getReferenceLogos();
  const hasLogos = partners.length > 0 || clients.length > 0;

  return (
    <main className="section">
      <div className="container">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Infrastructure Services Designed for Reliable Business Operations.</h1>
        <p className="mt-3 text-slate-700">HILTECH provides practical, standards-driven network infrastructure services covering site inspection, engineering planning, implementation, and measured delivery support.</p>
      </div>

      <ServicesGrid />

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Field-proven infrastructure work</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {proofAreas.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="relative aspect-[16/10] w-full">
                    <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-700">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Company profile field gallery</h2>
            <p className="mt-2 text-sm text-slate-700">Selected visuals from HILTECH&apos;s supplied company profile, organized by delivery area.</p>
            <div className="mt-5 space-y-5">
              {fieldGalleryGroups.map((group) => (
                <article key={group.title} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.images.map((image) => (
                      <div key={image.src} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <div className="relative aspect-[4/3] w-full">
                          <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw" />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Testing tools used across delivery</h2>
            <p className="mt-2 text-sm text-slate-700">Used across inspection, testing, and delivery workflows where applicable.</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              {testingTools.map((tool) => (
                <li key={tool} className="rounded-lg border border-slate-200 bg-white px-3 py-2">• {tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {hasReferencePanels || hasLogos ? (
        <section className="section pt-0">
          <div className="container">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <h2 className="text-2xl font-bold text-slate-900">Selected partners and client references</h2>
              <p className="mt-2 text-sm text-slate-700">Displayed based on HILTECH&apos;s supplied company profile.</p>

              {hasReferencePanels ? (
                <div className="mt-5 grid gap-4">
                  <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Partners</h3>
                    <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                      <div className="relative aspect-[16/10] w-full sm:aspect-[21/10]">
                        <Image
                          src="/references-partners-panel.jpg"
                          alt="HILTECH supplied company profile page showing selected partner references."
                          fill
                          className="object-contain"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </article>

                  <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Client references</h3>
                    <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                      <div className="relative aspect-[16/10] w-full sm:aspect-[21/10]">
                        <Image
                          src="/references-clients-panel.jpg"
                          alt="HILTECH supplied company profile page showing selected client references."
                          fill
                          className="object-contain"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </article>
                </div>
              ) : (
                <>
                  {partners.length > 0 ? (
                    <div className="mt-5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Partners</h3>
                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {partners.map((logo) => (
                          <div key={logo.src} className="flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <Image src={logo.src} alt={logo.alt} width={140} height={64} className="h-auto max-h-10 w-auto object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {clients.length > 0 ? (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Client references</h3>
                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {clients.map((logo) => (
                          <div key={logo.src} className="flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <Image src={logo.src} alt={logo.alt} width={140} height={64} className="h-auto max-h-10 w-auto object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section pt-0">
        <div className="container">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
            <h2 className="text-2xl font-bold text-slate-900">Map services to solution pathways</h2>
            <p className="mt-2 text-sm text-slate-700">Move from service scope to business-outcome solution pages for planning and RFQ readiness.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'Structured Cabling', slug: 'structured-cabling' },
                { label: 'Fiber Backbone', slug: 'fiber-backbone' },
                { label: 'Data Room Infrastructure', slug: 'data-rooms' },
                { label: 'CCTV Infrastructure', slug: 'cctv-infrastructure' },
                { label: 'Testing & Validation', slug: 'network-testing' },
                { label: 'Project Supply & RFQ', slug: 'project-supply-rfq' },
              ].map((item) => (
                <Link key={item.slug} href={`/solutions/${item.slug}`} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
