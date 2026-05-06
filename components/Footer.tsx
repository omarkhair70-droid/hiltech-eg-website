import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

const footerServices = [
  { label: 'Products Catalog', href: '/products-partners' },
  { label: 'Structured Cabling', href: '/solutions/structured-cabling' },
  { label: 'Fiber Infrastructure', href: '/solutions/fiber-backbone' },
  { label: 'CCTV Infrastructure', href: '/solutions/cctv-infrastructure' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container grid gap-8 py-12 md:grid-cols-4 md:py-14">
        <div>
          <div translate="no" className="inline-flex rounded-xl border border-slate-700/80 bg-white/5 px-3 py-2 shadow-sm">
            <Image src="/logo-dark.png" alt="HILTECH brand logo" width={152} height={44} className="h-8 w-auto object-contain" />
          </div>
          <p className="mt-3 text-sm text-slate-300">Network infrastructure products and RFQ support for business projects in Egypt.</p>
        </div>

        <div>
          <h4 className="font-semibold">Products & Services</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            {footerServices.map((service) => (
              <li key={service.label}>
                <Link className="underline hover:text-white" href={service.href}>{service.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Resources</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            <li><Link className="underline" href="/work">Field Work & References</Link></li>
            <li><Link className="underline" href="/solutions">Solutions</Link></li>
            <li><Link className="underline" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">RFQ & Contact</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            <li><a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li><a className="underline" href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
            <li><Link className="underline" href="/track">Track RFQ</Link></li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Link href="/rfq" className="inline-flex rounded-md border border-orange-300/40 px-3 py-1.5 text-sm font-semibold text-orange-300 hover:bg-white/10">Start RFQ</Link>
            <Link href="/track" className="inline-flex rounded-md border border-slate-500 px-3 py-1.5 text-sm font-semibold text-slate-100 hover:bg-white/10">Track RFQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
