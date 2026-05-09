'use client';

import Link from 'next/link';
import { getCompanionRecommendations } from '@/content/project-bundles';
import { products as staticProducts } from '@/content/products';
import { trackEvent } from '@/lib/client/analytics';
import type { ProductItem } from '@/content/products';

interface ProductCompanionRecommendationsProps {
  productId: string;
  onAddProduct: (product: ProductItem) => void;
  onAddAll: (productIds: string[]) => void;
  isArabic?: boolean;
  justAddedId?: string | null;
}

export function ProductCompanionRecommendations({
  productId,
  onAddProduct,
  onAddAll,
  isArabic = false,
  justAddedId = null,
}: ProductCompanionRecommendationsProps) {
  const companionIds = getCompanionRecommendations(productId);
  if (!companionIds.length) return null;

  const companions = companionIds
    .map((id) => staticProducts.find((p) => p.id === id))
    .filter((p) => p !== undefined) as ProductItem[];

  if (!companions.length) return null;

  const handleAddAll = () => {
    trackEvent('add_all_recommended_items', {
      product_id: productId,
      recommendation_count: companions.length,
    });
    onAddAll(companions.map((p) => p.id));
  };

  return (
    <section className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{isArabic ? 'عناصر مقترحة' : 'Recommended Items'}</h3>
          <p className="mt-1 text-sm text-slate-300">
            {isArabic
              ? 'عادة ما يتم طلب هذه العناصر مع هذا المنتج لإكمال نطاق المشروع'
              : 'These items are commonly ordered together to complete your project scope'}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {companions.map((companion) => (
          <article key={companion.id} className="rounded-lg border border-white/15 bg-white/5 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-400">{companion.category}</p>
                <p className="mt-1 font-semibold text-white text-sm leading-tight">{companion.name}</p>
                <p className="mt-1 text-xs text-slate-400">{companion.brand}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  trackEvent('recommendation_add_to_rfq', { product_id: companion.id, from_product_id: productId });
                  onAddProduct(companion);
                }}
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                  justAddedId === companion.id
                    ? 'border border-green-500/40 bg-green-500/10 text-green-200'
                    : 'border border-orange-500/40 bg-orange-500/10 text-orange-200 hover:bg-orange-500/20'
                }`}
              >
                {justAddedId === companion.id ? (isArabic ? 'تمت ✓' : 'Added ✓') : (isArabic ? 'أضف' : 'Add')}
              </button>
              <Link
                href={isArabic ? `/ar/products-partners/${companion.id}` : `/products-partners/${companion.id}`}
                className="flex-1 rounded-lg border border-white/20 bg-white/5 px-2 py-1.5 text-center text-xs font-semibold text-slate-200 hover:bg-white/10 transition"
              >
                {isArabic ? 'تفاصيل' : 'Details'}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <button
        onClick={handleAddAll}
        className="mt-4 w-full rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2.5 font-semibold text-orange-200 hover:bg-orange-500/20 transition"
      >
        {isArabic ? 'أضف كل العناصر المقترحة' : 'Add all recommended items'}
      </button>
    </section>
  );
}
