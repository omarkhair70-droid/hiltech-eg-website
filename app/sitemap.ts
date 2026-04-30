import type { MetadataRoute } from 'next';
import { productIntelligenceCategories } from '@/content/product-intelligence';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiltech-eg.com';
  const coreRoutes = ['', '/services', '/about', '/products-partners', '/rfq', '/contact'];
  const intelligenceRoutes = productIntelligenceCategories.map((category) => `/products-partners/${category.slug}`);

  return [...coreRoutes, ...intelligenceRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
