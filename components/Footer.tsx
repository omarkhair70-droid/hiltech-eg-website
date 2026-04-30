import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

const footerServices = [
  'Structured Cabling',
  'Fiber Optic Installation',
  'Network Infrastructure',
  'CCTV & Security Systems',
  'Data Center Setup',
  'Network Testing & Certification',
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="rounded-xl border border-slate-700 bg-white/5 p-3">
            <Image
              src="/logo-dark.png"
              alt="HILTECH brand logo"
              width={168}
              height={48}
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="mt-3">{site.officialName}</p>
          <p className="text-orange-300">{site.slogan}</p>
          <p className="mt-3 text-sm">© HILTECH. All rights reserved.</p>
        </div>

        <div>
          <h4 className="font-semibold">Services</h4>
          <ul className="mt-3 space-y-1 text-sm">
            {footerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <Link href="/contact" className="mt-3 inline-block text-sm font-semibold text-orange-300 underline">Request Quote</Link>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-3 space-y-1 text-sm">
            <li><a className="underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li><a className="underline" href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
            <li><a className="underline" href={site.contact.whatsappGeneralLink}>{site.contact.whatsappIntl}</a></li>
            <li>{site.contact.addressEn}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Compliance</h4>
          <p className="mt-3 text-sm">
            Brands and product references indicate ecosystems we work with and do not imply formal partnership unless explicitly stated.
          </p>
        </div>
      </div>
    </footer>
  );
}
