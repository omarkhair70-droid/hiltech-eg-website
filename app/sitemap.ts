import type { MetadataRoute } from 'next';
import { productIntelligenceCategories } from '@/content/product-intelligence';
import { onePagers } from '@/content/sales-materials';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiltech-eg.com';
  const coreRoutes = ['', '/services', '/about', '/solutions', '/products-partners', '/rfq', '/contact', '/resources', '/resources/company-profile', '/resources/rfq-guide', '/resources/launch-copy'];
  const intelligenceRoutes = productIntelligenceCategories.map((category) => `/products-partners/${category.slug}`);

  const solutionRoutes = ['/solutions/structured-cabling', '/solutions/fiber-backbone', '/solutions/data-rooms', '/solutions/cctv-infrastructure', '/solutions/network-testing', '/solutions/project-supply-rfq'];
  const onePagerRoutes = onePagers.map((item) => `/resources/one-pagers/${item.slug}`);

  return [...coreRoutes, ...solutionRoutes, ...intelligenceRoutes, ...onePagerRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
