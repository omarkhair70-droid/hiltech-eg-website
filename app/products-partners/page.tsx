import type { Metadata } from 'next';
import Link from 'next/link';
import {
  featuredProjectSupply,
  productCategories,
  productDisclaimer,
  products,
  type ProductCategory,
} from '@/content/products';

export const metadata: Metadata = {
  title: 'Products Catalog Lite | HILTECH',
  description:
    'Premium B2B product catalog for structured cabling, fiber optics, cabinets, and security infrastructure supply.',
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
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 inline-flex w-fit rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-700">
        {category}
      </p>
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Brand:</span> {brand}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Short specs:</span> {shortSpecs}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Use case:</span> {useCase}
      </p>
      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
        Price and availability upon request
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link className="btn-primary" href="/contact">
          Request Availability
        </Link>
        <a className="btn-secondary" href="https://wa.me/201102815044">
          WhatsApp
        </a>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-bold">Products Catalog Lite</h1>
        <p className="mt-4 max-w-4xl text-slate-700">
          Premium static catalog for B2B infrastructure procurement support. Product examples below are organized by
          category for project scoping and supply discussions.
        </p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
          <h2 className="text-2xl font-bold">Featured Project Supply</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {featuredProjectSupply.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <a className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium" href="#all">
              All
            </a>
            {productCategories.map((category) => (
              <a
                key={category}
                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium"
                href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                {category}
              </a>
            ))}
          </div>
        </section>

        <section id="all" className="mt-10 space-y-10">
          {productCategories.map((category) => {
            const categoryProducts = products.filter((item) => item.category === category);
            const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <div key={category} id={categoryId}>
                <h3 className="text-xl font-bold">{category}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {categoryProducts.map((item) => (
                    <ProductCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <p className="mt-10 rounded-md border-l-4 border-orange-500 bg-orange-50 p-4 text-sm text-slate-700">
          {productDisclaimer}
        </p>
      </div>
    </main>
  );
}
