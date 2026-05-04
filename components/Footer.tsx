import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

const footerServices = [
  { label: 'Structured Cabling', href: '/solutions/structured-cabling' },
  { label: 'Fiber Infrastructure', href: '/solutions/fiber-backbone' },
  { label: 'Data Room Readiness', href: '/solutions/data-rooms' },
  { label: 'Project Supply & RFQ', href: '/products-partners' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container grid gap-8 py-12 md:grid-cols-4 md:py-14">
        <div>
          <div translate="no" className="inline-flex rounded-xl border border-slate-700/80 bg-white/5 px-3 py-2 shadow-sm">
            <Image
              src="/logo-dark.png"
              alt="HILTECH brand logo"
              width={152}
              height={44}
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="mt-2.5 text-slate-100">{site.officialName}</p>
          <p className="text-orange-300">{site.slogan}</p>
          <p className="mt-3 text-sm text-slate-300">© HILTECH. All rights reserved.</p>
        </div>

        <div>
          <h4 className="font-semibold">Services</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            {footerServices.map((service) => (
              <li key={service.label}>
                <Link className="underline hover:text-white" href={service.href}>{service.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-3 inline-flex rounded-md border border-orange-300/40 px-3 py-1.5 text-sm font-semibold text-orange-300 hover:bg-white/10">Request Project Quote</Link>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            <li><a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li><a className="underline" href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
            <li><a className="underline" href={site.contact.whatsappGeneralLink}>{site.contact.whatsappIntl}</a></li>
            <li>{site.contact.addressEn}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Resources</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-200">
            <li><Link className="underline" href="/resources">Resources Hub</Link></li>
            <li><Link className="underline" href="/resources/rfq-guide">RFQ Preparation Guide</Link></li>
            <li><Link className="underline" href="/scope-finder">Scope Finder</Link></li>
            <li><Link className="underline" href="/track">Track RFQ Request</Link></li>
          </ul>
          <h4 className="mt-4 font-semibold">Compliance</h4>
          <p className="mt-3 text-sm text-slate-300">
            Brands and product references indicate ecosystems we work with and do not imply formal partnership unless explicitly stated.
          </p>
        </div>
      </div>
    </footer>
  );
}
