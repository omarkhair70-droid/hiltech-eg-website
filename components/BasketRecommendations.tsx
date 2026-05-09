'use client';

import { getBasketRecommendations } from '@/content/project-bundles';
import { products as staticProducts } from '@/content/products';
import { trackEvent } from '@/lib/client/analytics';
import type { ProductItem } from '@/content/products';

interface BasketRecommendationsProps {
  productIds: string[];
  onAddProduct: (product: ProductItem) => void;
  isArabic?: boolean;
  justAddedId?: string | null;
}

export function BasketRecommendations({
  productIds,
  onAddProduct,
  isArabic = false,
  justAddedId = null,
}: BasketRecommendationsProps) {
  const rules = getBasketRecommendations(productIds);
  if (!rules.length) return null;

  // Show the first applicable recommendation
  const rule = rules[0];

  const products = rule.recommendedProductIds
    .map((id) => staticProducts.find((p) => p.id === id))
    .filter((p) => p !== undefined && !productIds.includes(p.id)) as ProductItem[];

  if (!products.length) return null;

  const handleAdd = (product: ProductItem) => {
    trackEvent('rfq_recommendation_add', {
      rule_name: rule.name,
      product_id: product.id,
      product_count: products.length,
    });
    onAddProduct(product);
  };

  return (
    <section className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-orange-400">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{isArabic ? rule.titleAr : rule.titleEn}</h3>
          <p className="mt-1 text-sm text-slate-300">{isArabic ? rule.messageAr : rule.messageEn}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {products.slice(0, 4).map((product) => (
          <article key={product.id} className="rounded-lg border border-white/15 bg-white/5 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-400">{product.category}</p>
            <p className="mt-1 font-semibold text-white text-sm line-clamp-2">{product.name}</p>
            <p className="mt-1 text-xs text-slate-400">{product.brand}</p>
            <button
              onClick={() => handleAdd(product)}
              className={`mt-2 w-full rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                justAddedId === product.id
                  ? 'border border-green-500/40 bg-green-500/10 text-green-200'
                  : 'border border-orange-500/40 bg-orange-500/10 text-orange-200 hover:bg-orange-500/20'
              }`}
            >
              {justAddedId === product.id ? (isArabic ? 'تمت ✓' : 'Added ✓') : (isArabic ? 'أضف' : 'Add')}
            </button>
          </article>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400 text-center">{isArabic ? 'هذه تقترحات مفيدة لإكمال نطاق مشروعك' : 'These suggestions help complete your project scope'}</p>
    </section>
  );
}
