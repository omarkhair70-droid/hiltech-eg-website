import Image from 'next/image';
import type { Metadata } from 'next';
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
    <main className="section">
      <div className="container space-y-4">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">About HILTECH</h1>
        <p>
          HILTECH ({site.officialName}) operates as a network infrastructure partner for organizations that need dependable communication and data connectivity foundations.
        </p>
        <p>
          Our core focus is the design, implementation, and management support of information network infrastructure projects, with practical delivery across fiber optic and copper cabling environments.
        </p>

        <section className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-navy-900 px-4 py-4 text-white shadow-sm sm:px-5 sm:py-5">
          <div className="absolute inset-y-0 right-0 w-full sm:w-[58%]">
            <Image src="/field-execution-technician.jpg" alt="HILTECH technician performing on-site infrastructure execution work" fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/50" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/25" />
          <div className="relative z-10 flex min-h-[110px] flex-col justify-center gap-2.5 sm:max-w-[62%]">
            <Image src="/logo-dark.png" alt="HILTECH" width={90} height={30} className="h-6 w-auto sm:h-7" />
            <p className="text-sm leading-relaxed text-slate-100">Execution-first technical delivery for reliable, maintainable, and scalable information networks.</p>
          </div>
        </section>



        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-slate-900">Built around field execution, not presentation only.</h2>
          <p className="mt-2 text-sm text-slate-700">From site preparation to termination and testing, our teams prioritize practical delivery quality and maintainable infrastructure outcomes.</p>
        </section>

        <section className="grid gap-4 pt-2 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">Mission</h2>
            <p className="mt-2 text-sm text-slate-700">Support companies with efficient network infrastructure implementation and management.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">Vision</h2>
            <p className="mt-2 text-sm text-slate-700">Support communication network development through specialized technical teams and trained personnel.</p>
          </div>
        </section>

        <p className="font-semibold text-orange-600">{site.slogan}</p>
      </div>
    </main>
  );
}
