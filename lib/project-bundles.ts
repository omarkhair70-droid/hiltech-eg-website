import { products, type ProductCategory, type ProductItem } from '@/content/products';
import {
  projectBundles,
  type BundleRequirement,
  type ProductId,
  type ProjectBundle,
} from '@/content/project-bundles';

interface BasketItemLike {
  id: string;
  category?: string;
}

export interface BundleCompletion {
  totalRequiredCount: number;
  completedRequiredCount: number;
  completionPercentage: number;
  matchedRequirementIds: string[];
  missingRequirementIds: string[];
}

const normalizeBasket = (basketItems: BasketItemLike[]) => {
  const basketProductIds = new Set<string>();
  const basketCategories = new Set<string>();

  for (const item of basketItems) {
    basketProductIds.add(item.id);
    if (item.category) basketCategories.add(item.category);

    const knownProduct = products.find((product) => product.id === item.id);
    if (knownProduct) basketCategories.add(knownProduct.category);
  }

  return { basketProductIds, basketCategories };
};

const isRequirementCompleted = (requirement: BundleRequirement, basketProductIds: Set<string>) =>
  requirement.completionProductIds.some((productId) => basketProductIds.has(productId));

const hasRequirementIntentSignal = (
  requirement: BundleRequirement,
  basketProductIds: Set<string>,
  basketCategories: Set<string>,
) =>
  requirement.recommendedProductIds.some((productId) => basketProductIds.has(productId)) ||
  requirement.acceptedCategories.some((category) => basketCategories.has(category));

export function getProjectBundleById(bundleId: string): ProjectBundle | null {
  return projectBundles.find((bundle) => bundle.id === bundleId) ?? null;
}

export function getBundleCompletion(bundle: ProjectBundle, basketItems: BasketItemLike[]): BundleCompletion {
  const { basketProductIds } = normalizeBasket(basketItems);
  const requiredRequirements = bundle.requirements.filter((requirement) => requirement.required);
  const matchedRequired = requiredRequirements.filter((requirement) => isRequirementCompleted(requirement, basketProductIds));

  const totalRequiredCount = requiredRequirements.length;
  const completedRequiredCount = matchedRequired.length;
  const completionPercentage =
    totalRequiredCount === 0 ? 100 : Math.round((completedRequiredCount / totalRequiredCount) * 100);

  return {
    totalRequiredCount,
    completedRequiredCount,
    completionPercentage,
    matchedRequirementIds: matchedRequired.map((requirement) => requirement.id),
    missingRequirementIds: requiredRequirements
      .filter((requirement) => !matchedRequired.includes(requirement))
      .map((requirement) => requirement.id),
  };
}

export function getMissingBundleRequirements(bundle: ProjectBundle, basketItems: BasketItemLike[]): BundleRequirement[] {
  const { basketProductIds } = normalizeBasket(basketItems);

  return bundle.requirements.filter(
    (requirement) => requirement.required && !isRequirementCompleted(requirement, basketProductIds),
  );
}

export function getSuggestedProductsForMissingRequirements(
  bundle: ProjectBundle,
  basketItems: BasketItemLike[],
  catalogProducts: ProductItem[],
): ProductItem[] {
  const basketProductIds = new Set(basketItems.map((item) => item.id));
  const suggestions: ProductItem[] = [];
  const suggestionIds = new Set<string>();

  for (const requirement of getMissingBundleRequirements(bundle, basketItems)) {
    for (const productId of requirement.recommendedProductIds) {
      if (basketProductIds.has(productId) || suggestionIds.has(productId)) continue;
      const product = catalogProducts.find((catalogItem) => catalogItem.id === productId);
      if (!product) continue;
      suggestions.push(product);
      suggestionIds.add(productId);
      break;
    }
  }

  return suggestions;
}

export function getBestMatchingBundleForBasket(basketItems: BasketItemLike[]) {
  if (basketItems.length === 0) return null;

  const { basketProductIds, basketCategories } = normalizeBasket(basketItems);
  const scoredBundles = projectBundles.map((bundle) => {
    const completion = getBundleCompletion(bundle, basketItems);
    const intentSignals = bundle.requirements.filter((requirement) =>
      hasRequirementIntentSignal(requirement, basketProductIds, basketCategories),
    ).length;

    return {
      bundle,
      completion,
      score: completion.completedRequiredCount * 100 + intentSignals,
      intentSignals,
    };
  });

  const meaningfulMatches = scoredBundles.filter(({ completion, intentSignals }) =>
    completion.completedRequiredCount > 0 || intentSignals >= 2,
  );
  if (meaningfulMatches.length === 0) return null;

  meaningfulMatches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.completion.completionPercentage - a.completion.completionPercentage;
  });

  const best = meaningfulMatches[0];
  return {
    bundle: best.bundle,
    completion: best.completion,
  };
}

const companionRules: Partial<Record<ProductCategory, ProductId[]>> = {
  'Copper / CAT6 Cabling': ['copper-cat6-patch', 'fp-excel-keystone', 'fp-single-faceplate'],
  'Fiber Optic Systems': ['fiber-odf', 'patch-fiber-lclc-om3', 'fiber-coupler-lc-sc'],
  'Cabinets / Racks / PDU': ['rack-19in-pdu', 'cable-routing-acc', 'fiber-panel-24p'],
  'CCTV & Security': ['cctv-cabling', 'cable-trunking', 'rack-network-cabinets'],
};

export function getCompanionRecommendationsForProduct(
  product: ProductItem,
  basketItems: BasketItemLike[],
  catalogProducts: ProductItem[],
  limit = 3,
): ProductItem[] {
  const productIdsInBasket = new Set(basketItems.map((item) => item.id));
  const candidateIds = companionRules[product.category] ?? [];
  const recommendations: ProductItem[] = [];

  for (const candidateId of candidateIds) {
    if (candidateId === product.id || productIdsInBasket.has(candidateId)) continue;
    const candidate = catalogProducts.find((catalogItem) => catalogItem.id === candidateId);
    if (!candidate) continue;
    recommendations.push(candidate);
    if (recommendations.length >= limit) break;
  }

  return recommendations;
}
