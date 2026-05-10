import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About HILTECH | Network Infrastructure Company in Egypt',
  description:
    'Learn how HILTECH supports information network infrastructure design, implementation, and project management with fiber and copper expertise.',
  alternates: { canonical: `${site.siteUrl}/about` },
  openGraph: {
    title: 'About HILTECH | Infrastructure in Egypt',
    description:
      'HILTECH is a technical partner for information network infrastructure design, implementation, and management across Egypt.',
    url: `${site.siteUrl}/about`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <section className="py-16">
        <div className="container space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white text-balance">About HILTECH</h1>
            <p className="mt-4 text-slate-300 max-w-2xl">
              HILTECH ({site.officialName}) operates as a network infrastructure partner for organizations that need dependable communication and data connectivity foundations.
            </p>
            <p className="mt-2 text-slate-300 max-w-2xl">
              Our core focus is the design, implementation, and management support of information network infrastructure projects, with practical delivery across fiber optic and copper cabling environments.
            </p>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 text-white">
            <div className="absolute inset-y-0 right-0 w-full sm:w-[58%] opacity-30">
              <Image
                src="/field-execution-technician.jpg"
                alt="HILTECH technician performing on-site infrastructure execution work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/50" />
            </div>
            <div className="relative z-10 flex min-h-[110px] flex-col justify-center gap-2.5 sm:max-w-[62%]">
              <Image src="/logo-dark.png" alt="HILTECH" width={90} height={30} className="h-6 w-auto sm:h-7" />
              <p className="text-sm leading-relaxed text-slate-100">
                Execution-first technical delivery for reliable, maintainable, and scalable information networks.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">Built around field execution, not presentation only.</h2>
            <p className="text-slate-300">
              From site preparation to termination and testing, our teams prioritize practical delivery quality and maintainable infrastructure outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 space-y-3">
              <div className="inline-flex w-2 h-8 rounded bg-orange-500" />
              <h2 className="text-xl font-bold text-white">Mission</h2>
              <p className="text-slate-300">
                Support companies with efficient network infrastructure implementation and management.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 space-y-3">
              <div className="inline-flex w-2 h-8 rounded bg-orange-500" />
              <h2 className="text-xl font-bold text-white">Vision</h2>
              <p className="text-slate-300">
                Support communication network development through specialized technical teams and trained personnel.
              </p>
            </div>
          </div>

          <p className="font-semibold text-orange-400 pt-4">{site.slogan}</p>

          <div className="flex flex-col gap-3 sm:flex-row pt-4">
            <Link href="/rfq" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-colors">
              Request Project Quote
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white border border-white/30 hover:bg-white/10 rounded-md transition-colors">
              Contact HILTECH
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

