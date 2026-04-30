import type { MetadataRoute } from 'next';
import { productIntelligenceCategories } from '@/content/product-intelligence';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hiltech-eg.com';
  const coreRoutes = ['', '/services', '/about', '/solutions', '/products-partners', '/rfq', '/contact'];
  const intelligenceRoutes = productIntelligenceCategories.map((category) => `/products-partners/${category.slug}`);

  const solutionRoutes = ['/solutions/structured-cabling', '/solutions/fiber-backbone', '/solutions/data-rooms', '/solutions/cctv-infrastructure', '/solutions/network-testing', '/solutions/project-supply-rfq'];

  return [...coreRoutes, ...solutionRoutes, ...intelligenceRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
