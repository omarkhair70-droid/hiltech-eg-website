import Image from 'next/image';
import { SectionHeader, SectionShell } from '@/components/ui/primitives';
import { getReferenceLogos } from '@/lib/server/reference-logos';

function LogoGroup({ title, logos }: { title: string; logos: { src: string; alt: string }[] }) {
  if (!logos.length) return null;
  return <article><h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{logos.map((logo) => <div key={logo.src} className="relative aspect-[3/2] rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><Image src={logo.src} alt={logo.alt} fill className="object-contain p-3" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" /></div>)}</div></article>;
}

export async function ReferenceLogosSection() {
  const { partners, clients } = await getReferenceLogos();
  if (!partners.length && !clients.length) return null;
  return <SectionShell compact><section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><SectionHeader eyebrow="Social Proof" title="Product &amp; Client References" description="Selected product and client references from HILTECH project and supply materials." /><div className="mt-6 space-y-5"><LogoGroup title="Technology / Product References" logos={partners} /><LogoGroup title="Client References" logos={clients} /></div><p className="mt-5 text-xs text-slate-500">Product references are shown for catalog/context purposes only and do not imply formal partnership unless explicitly stated.</p></section></SectionShell>;
}
