import type { Metadata } from 'next';
import Link from 'next/link';
import { productCategories, productDisclaimer, products, type ProductCategory } from '@/content/products';

export const metadata: Metadata = {
  title: 'Products & Project Supply | Enterprise Procurement Support | HILTECH',
  description:
    'Enterprise-focused product catalog for structured cabling, fiber optics, data room components, and security infrastructure procurement support.',
  openGraph: {
    title: 'Products & Project Supply | HILTECH',
    description: 'Browse infrastructure categories and request availability for enterprise network projects.',
  },
};

function ProductCard({
  category,
  name,
  brand,
  shortSpecs,
  useCase,
}: {
  category: ProductCategory;
  name: string;
  brand: string;
  shortSpecs: string;
  useCase: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
      <div className="mb-4 h-1 w-12 rounded-full bg-orange-400" />
      <p className="mb-3 inline-flex w-fit rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-700">
        {category}
      </p>
      <h3 className="text-lg font-bold leading-tight text-slate-900">{name}</h3>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">Brand:</span> {brand}
        </p>
        <p>
          <span className="font-semibold text-slate-800">Specs:</span> {shortSpecs}
        </p>
        <p>
          <span className="font-semibold text-slate-800">Use case:</span> {useCase}
        </p>
      </div>

      <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
        Price and availability upon request
      </p>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-2">
          <Link className="btn-primary" href="/contact">
            Request Availability
          </Link>
          <a
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            href="https://wa.me/201102815044"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-bold">Products &amp; Project Supply</h1>
        <p className="mt-4 max-w-4xl text-slate-700">
          Infrastructure products, cabling systems, cabinets, connectivity components, and security-ready supplies
          organized for project-based procurement and availability requests.
        </p>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-orange-50/30 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Featured Project Supply</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-orange-400" />
              <h3 className="text-base font-semibold text-slate-900">Structured Cabling Rollouts</h3>
              <p className="mt-2 text-sm text-slate-700">
                CAT6, fiber backbone, patch panels, faceplates, keystone modules, and connectivity components for
                office and enterprise networks.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-orange-400" />
              <h3 className="text-base font-semibold text-slate-900">Data Room Expansion</h3>
              <p className="mt-2 text-sm text-slate-700">
                Racks, cabinets, PDUs, ODFs, cable management, patch panels, and fiber/copper organization for
                technical rooms.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-orange-400" />
              <h3 className="text-base font-semibold text-slate-900">CCTV &amp; Security Readiness</h3>
              <p className="mt-2 text-sm text-slate-700">
                Camera connectivity, cabling paths, network links, and infrastructure preparation for surveillance
                systems.
              </p>
            </article>
          </div>
        </section>

        <section className="sticky top-16 z-20 mt-8 rounded-xl border border-slate-200 bg-white/95 p-4 backdrop-blur">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              className="rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-700 shadow-sm"
              href="#all"
            >
              All
            </a>
            {productCategories.map((category) => (
              <a
                key={category}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        <section id="all" className="mt-10 space-y-12">
          {productCategories.map((category) => {
            const categoryProducts = products.filter((item) => item.category === category);
            const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <div key={category} id={categoryId} className="scroll-mt-20">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">{category}</h3><p className="mt-1 text-sm text-slate-600">Category-aligned components selected to support compatibility, deployment quality, and procurement planning.</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {categoryProducts.map((item) => (
                    <ProductCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <p className="mt-12 rounded-xl border border-orange-200 bg-orange-50/60 p-5 text-sm leading-relaxed text-slate-700 shadow-sm">
          {productDisclaimer}
        </p>
      </div>
    </main>
  );
}
