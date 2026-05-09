'use client';

import { projectBundles } from '@/content/project-bundles';
import { products } from '@/content/products';
import type { RFQItem } from '@/lib/rfq';
import { useEffect, useState } from 'react';

interface PostAddRecommendationPanelProps {
  addedProductId: string;
  items: RFQItem[];
  isArabic?: boolean;
  onClose: () => void;
  onAddProduct: (productId: string) => void;
}

export function PostAddRecommendationPanel({
  addedProductId,
  items,
  isArabic = false,
  onClose,
  onAddProduct,
}: PostAddRecommendationPanelProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the added product
    const addedProduct = products.find((p) => p.id === addedProductId);
    if (!addedProduct) {
      setLoading(false);
      return;
    }

    // Find bundles that contain this product
    const relevantBundles = projectBundles.filter((bundle) =>
      bundle.productIds.includes(addedProductId)
    );

    // Collect other product IDs from those bundles that aren't already in items
    const itemIds = new Set(items.map((item) => item.id));
    const recommendedIds = new Set<string>();

    for (const bundle of relevantBundles) {
      for (const id of bundle.productIds) {
        if (id !== addedProductId && !itemIds.has(id)) {
          recommendedIds.add(id);
        }
      }
    }

    // Limit to 4 recommendations
    setRecommendations(Array.from(recommendedIds).slice(0, 4));
    setLoading(false);
  }, [addedProductId, items]);

  if (loading || recommendations.length === 0) {
    return null;
  }

  const recommendedProducts = recommendations
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (recommendedProducts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 p-4 backdrop-blur-sm md:items-center md:justify-center">
      <div className="w-full max-w-md animate-in slide-in-from-bottom-4 rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur-sm md:max-w-lg md:slide-in-from-bottom-0">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {isArabic ? 'أكمل مشروعك' : 'Complete Your Project'}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {isArabic
                ? 'عادة ما يتم طلب هذه المنتجات معاً'
                : 'These items are commonly added together'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {recommendedProducts.map((product) => (
            <div
              key={product?.id}
              className="flex items-start justify-between rounded-lg border border-white/20 bg-white/5 p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white text-sm line-clamp-2">
                  {product?.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {product?.brand}
                </p>
                {product?.shortSpecs && (
                  <p className="mt-1 text-xs text-slate-300 line-clamp-1">
                    {product.shortSpecs}
                  </p>
                )}
              </div>
              <button
                onClick={() => onAddProduct(product?.id || '')}
                className="ml-2 shrink-0 rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200 hover:bg-orange-500/20 transition whitespace-nowrap"
              >
                {isArabic ? 'أضف' : 'Add'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-semibold text-slate-200 hover:bg-white/10 transition"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 font-semibold text-orange-200 hover:bg-orange-500/20 transition"
          >
            {isArabic ? 'عرض المزيد' : 'View More'}
          </button>
        </div>
      </div>
    </div>
  );
}
