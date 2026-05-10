'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { productIntelligenceCategories, productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { productCategories, products as staticProducts, type ProductItem } from '@/content/products';
import { trackEvent } from '@/lib/client/analytics';
import { getRFQWhatsappLink, normalizeRFQItem, normalizeRFQQuantity, readRFQItems, writeRFQItems, type RFQItem } from '@/lib/rfq';

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;
const ARABIC_ALIAS_MAP: Record<string, string[]> = {
  '\u0643\u0627\u0628\u0644\u0627\u062a': ['cable', 'cables', 'cat6', 'copper'],
  '\u0641\u0627\u064a\u0628\u0631': ['fiber', 'optic', 'om3', 'os2'],
  '\u0631\u0627\u0643\u0627\u062a': ['rack', 'cabinet', 'pdu'],
  '\u0643\u0627\u0645\u064a\u0631\u0627\u062a': ['cctv', 'camera', 'security'],
  '\u0623\u0644\u064a\u0627\u0641': ['fiber', 'optic'],
  '\u0634\u0628\u0643\u0629': ['network', 'connectivity', 'switching'],
};

function toRFQItem(item: ProductItem): RFQItem {
  return normalizeRFQItem({
    id: item.id,
    name: item.name,
    category: item.category,
    brand: item.brand,
    specs: item.shortSpecs,
    quantity: 1,
    priceNote: item.priceNote,
  });
}

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

function ProductVisual({ item, isArabic = false }: { item: ProductItem; isArabic?: boolean }) {
  const visual = visualsByProductId.get(item.id);
  const imagePath = item.image || visual?.imagePath || '';
  const alt = visual?.alt || `Product image for ${item.name}`;
  const [broken, setBroken] = useState(false);

  if (!imagePath || broken) {
    return <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm"><div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5/5 text-center"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{isArabic ? 'صورة توضيحية للمنتج' : 'Illustrative visual'}</p><p className="mt-1 px-4 text-sm font-medium text-slate-100">{item.name}</p></div></div></div>;
  }

  return <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm"><div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5/5"><div className="absolute left-3 top-3 z-10 h-0.5 w-6 rounded-full bg-orange-400/80" /><Image src={imagePath} alt={alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain p-3" onError={() => setBroken(true)} /></div></div>;
}

function expandQuery(rawQuery: string) {
  const normalized = rawQuery.trim().toLowerCase();
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const expanded = new Set(tokens);

  for (const token of tokens) {
    (ARABIC_ALIAS_MAP[token] || []).forEach((alias) => expanded.add(alias));
  }

  return Array.from(expanded);
}

export default function ProductsClient({ initialProducts = staticProducts, locale = 'en', messages, rfqHref = '/rfq', productsHref = '/products-partners' }: { initialProducts?: ProductItem[]; locale?: 'en'|'ar'; messages?: any; rfqHref?: string; productsHref?: string }) {
  const t = messages;
  const isArabic = locale === 'ar';
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [items, setItems] = useState<RFQItem[]>([]);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | (typeof productCategories)[number]>('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + normalizeRFQQuantity(item.quantity), 0), [items]);
  const totalUnits = count;

  const baseCategoryProducts = useMemo(
    () => (activeCategory === 'All' ? initialProducts : initialProducts.filter((item) => item.category === activeCategory)),
    [activeCategory, initialProducts],
  );

  const queryTokens = useMemo(() => expandQuery(query), [query]);

  const filteredProducts = useMemo(() => {
    if (!queryTokens.length) return baseCategoryProducts;

    return baseCategoryProducts.filter((item) => {
      const haystack = [item.name, item.brand, item.category, item.shortSpecs, item.useCase].join(' ').toLowerCase();
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [baseCategoryProducts, queryTokens]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory, query]);

  useEffect(() => {
    trackEvent('product_category_filter', {
      category: activeCategory,
      visible_count: visibleProducts.length,
      total_count: filteredProducts.length,
    });
  }, [activeCategory, filteredProducts.length, visibleProducts.length]);

  useEffect(() => {
    const productParam = searchParams.get('product');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');

    setQuery(queryParam?.trim() || '');

    if (productParam) {
      const target = initialProducts.find((item) => item.id === productParam);
      if (!target) return;
      setActiveCategory(target.category);
      setVisibleCount((prev) => Math.max(prev, initialProducts.filter((item) => item.category === target.category).length));
      setHighlightedProductId(target.id);
      return;
    }

    if (categoryParam && productCategories.includes(categoryParam as (typeof productCategories)[number])) {
      setActiveCategory(categoryParam as (typeof productCategories)[number]);
      setHighlightedProductId(null);
      window.setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }

    setActiveCategory('All');
    setHighlightedProductId(null);
  }, [initialProducts, searchParams]);

  useEffect(() => {
    if (!highlightedProductId) return;
    const timeout = window.setTimeout(() => {
      const node = document.getElementById(`product-${highlightedProductId}`);
      if (!node) return;
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => {
        node.classList.add('ring-2', 'ring-orange-400', 'ring-offset-2');
      }, 200);
    }, 180);

    const clear = window.setTimeout(() => {
      setHighlightedProductId((curr) => (curr === highlightedProductId ? null : curr));
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(clear);
    };
  }, [highlightedProductId]);

  const setUrlState = (nextCategory: typeof activeCategory, nextQuery: string, includeProduct = false) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory !== 'All') params.set('category', nextCategory);
    else params.delete('category');

    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    else params.delete('q');

    if (!includeProduct) params.delete('product');

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('All');
    setHighlightedProductId(null);
    setVisibleCount(INITIAL_VISIBLE);
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(query.trim()) || activeCategory !== 'All' || Boolean(searchParams.get('product'));
  const localizeCategory = (category: string) => isArabic ? (t?.categoryLabels?.[category] || category) : category;
  const productDetailHref = (id: string) => isArabic ? `/ar/products-partners/${id}` : `/products-partners/${id}`;

  const arabicIntelligenceLabels: Record<string, { title: string; intro: string }> = {
    fiber: {
      title: 'ملاحظات فنية للفايبر',
      intro: 'سياق فني يساعد على فهم مكونات الفايبر وODF والباتش كورد قبل طلب عرض السعر.',
    },
    copper: {
      title: 'ملاحظات فنية للكابلات النحاسية',
      intro: 'إرشادات سريعة لاختيار الكابلات وملحقات التوصيل المناسبة قبل تجهيز طلب التسعير.',
    },
    patching: {
      title: 'ملاحظات فنية للربط والتوصيل',
      intro: 'ملخص عملي حول عناصر الباتش كورد والتنظيم لضمان توافق المكونات داخل المشروع.',
    },
    access: {
      title: 'ملاحظات فنية لنقاط الشبكة',
      intro: 'نظرة مختصرة على الفيس بليت والكيستون وتنسيق المخارج بما يلائم نطاق العمل.',
    },
    infrastructure: {
      title: 'ملاحظات فنية للبنية التحتية',
      intro: 'محتوى مساعد لفهم الراك والكابينات وإدارة الطاقة قبل طلب العرض النهائي.',
    },
    pathways: {
      title: 'ملاحظات فنية لمسارات الكابلات',
      intro: 'توجيهات أساسية لتخطيط المسارات والدكت بما يدعم تنفيذًا منظمًا وسهل الصيانة.',
    },
    security: {
      title: 'ملاحظات فنية للبنية الأمنية',
      intro: 'نقاط فنية مختصرة لمكونات CCTV والملحقات قبل إدراجها ضمن طلب عرض السعر.',
    },
  };

  const intelligenceHref = (slug?: string) => {
    if (!slug) return isArabic ? '/ar/products-partners' : '/products-partners';
    return isArabic ? `/ar/products-partners/intelligence/${slug}` : `/products-partners/intelligence/${slug}`;
  };

  const updateItem = (id: string, patch: Partial<RFQItem>) => setItems((prev) => prev.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)));

  const scopeKits = isArabic
    ? [
        { title: 'تجهيز شبكة مكتب', items: ['كابلات CAT6', 'باتش بانل', 'فيس بليت', 'ملحقات الراك', 'الاختبار'], href: '/ar/rfq' },
        { title: 'تجهيز راك وغرفة بيانات', items: ['راك', 'PDU', 'تنظيم الكابلات', 'باتش بانل', 'التسمية والاختبار'], href: '/ar/rfq' },
        { title: 'نطاق فايبر وODF', items: ['كابل فايبر', 'ODF', 'باتش كورد', 'اللحام والاختبار'], href: '/ar/rfq' },
        { title: 'بنية تحتية للكاميرات', items: ['نقاط شبكة', 'كابلات', 'راك', 'تجهيزات الطاقة والشبكة'], href: '/ar/rfq' },
      ]
    : [
        { title: 'Office Network Setup', items: ['CAT6 cabling', 'patch panel', 'faceplates', 'rack accessories', 'testing'], href: '/rfq' },
        { title: 'Rack Room Preparation', items: ['racks', 'PDU', 'cable management', 'patch panels', 'labeling/testing'], href: '/rfq' },
        { title: 'Fiber Backbone Scope', items: ['fiber cable', 'ODF', 'patch cords', 'splicing/testing'], href: '/rfq' },
        { title: 'CCTV Infrastructure Scope', items: ['network points', 'cabling', 'racks', 'power/network preparation'], href: '/rfq' },
      ];

  

  const addToRFQ = (product: ProductItem) => {
    setItems((prev) => {
      const found = prev.find((entry) => entry.id === product.id);
      const nextItems = found ? prev.map((entry) => (entry.id === product.id ? { ...entry, quantity: normalizeRFQQuantity(entry.quantity + 1) } : entry)) : [...prev, toRFQItem(product)];

      trackEvent('product_add_to_rfq', {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        brand: product.brand,
        basket_count_after: nextItems.length,
      });

      return nextItems;
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded((curr) => (curr === product.id ? null : curr)), 1400);
  };

  

}
