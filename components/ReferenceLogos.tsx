import Image from 'next/image';
import { SectionHeader, SectionShell } from '@/components/ui/primitives';
import { getReferenceLogos } from '@/lib/server/reference-logos';

function LogoStrip({ title, logos }: { title: string; logos: { src: string; alt: string }[] }) {
  if (!logos.length) return null;

  return <article><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</h3><div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:grid sm:mx-0 sm:grid-cols-2 sm:gap-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">{logos.map((logo) => <div key={logo.src} className="relative h-16 min-w-[128px] shrink-0 rounded-lg border border-slate-200 bg-white"><Image src={logo.src} alt={logo.alt} fill className="object-contain p-3" sizes="(max-width: 640px) 128px, (max-width: 1024px) 45vw, 220px" /></div>)}</div></article>;
}

export async function ReferenceLogosSection() {
  const { partners, clients } = await getReferenceLogos();
  const limitedPartners = partners.slice(0, 6);
  const limitedClients = clients.slice(0, 6);

  if (!limitedPartners.length && !limitedClients.length) return null;

  return <SectionShell compact><section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><SectionHeader eyebrow="References" title="Trusted References" description="Selected brand and client references from HILTECH project and supply materials." /><div className="mt-5 space-y-4"><LogoStrip title="Technology / Partner References" logos={limitedPartners} /><LogoStrip title="Client References" logos={limitedClients} /></div><p className="mt-4 text-[11px] text-slate-500">Brand and client references are shown for context and do not imply formal partnership unless explicitly stated.</p></section></SectionShell>;
}
