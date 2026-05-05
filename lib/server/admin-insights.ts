import 'server-only';

import { getAdminActionCenterData } from '@/lib/server/admin-action-center';
import { getAdminProductAnalyticsData } from '@/lib/server/admin-product-analytics';
import { getAdminSalesDashboardData } from '@/lib/server/admin-sales-dashboard';
import { getGoogleAnalyticsAdvancedAnalytics, isGoogleAnalyticsAdminConfigured } from '@/lib/server/google-analytics-admin';

export type AdminInsight = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'sales' | 'rfq' | 'quote' | 'inventory' | 'product' | 'traffic' | 'operations';
  title: string;
  summary: string;
  recommendation: string;
  metricLabel: string;
  metricValue: string;
  href?: string;
  sourceLabel: string;
};

export async function getAdminInsightsData() {
  const insights: AdminInsight[] = [];
  let loaded = 0;

  const [sales, products, actions, ga] = await Promise.all([
    getAdminSalesDashboardData(30).then((x) => (loaded += 1, x)).catch(() => null),
    getAdminProductAnalyticsData(30).then((x) => (loaded += 1, x)).catch(() => null),
    getAdminActionCenterData().then((x) => (loaded += 1, x)).catch(() => null),
    isGoogleAnalyticsAdminConfigured() ? getGoogleAnalyticsAdvancedAnalytics(30).then((x) => (loaded += 1, x)).catch(() => null) : Promise.resolve(null),
  ]);

  if (sales) {
    if (sales.kpis.acceptanceRate > 0 && sales.kpis.acceptanceRate < 25) insights.push({ id: 'low-acceptance-rate', priority: 'high', category: 'quote', title: 'Quote acceptance rate is low', summary: 'Published quotations are converting below target in the last 30 days.', recommendation: 'Review quote terms, response timing, and customer follow-up cadence for active opportunities.', metricLabel: 'Acceptance rate', metricValue: `${sales.kpis.acceptanceRate.toFixed(1)}%`, href: '/admin/sales', sourceLabel: 'Sales Dashboard (30d)' });
    if (sales.kpis.openPipelineValue > 0 && sales.kpis.wonValue < sales.kpis.openPipelineValue * 0.2) insights.push({ id: 'pipeline-vs-won-gap', priority: 'medium', category: 'sales', title: 'Open pipeline is high vs won value', summary: 'Pipeline value significantly exceeds recently won value.', recommendation: 'Prioritize high-value opportunities and tighten progression from quote sent to accepted.', metricLabel: 'Open vs won', metricValue: `${Math.round((sales.kpis.wonValue / Math.max(1, sales.kpis.openPipelineValue)) * 100)}% won`, href: '/admin/sales', sourceLabel: 'Sales Dashboard (30d)' });
    if (sales.followup.publishedNoResponse > 0) insights.push({ id: 'published-awaiting-response', priority: 'high', category: 'quote', title: 'Published quotes are awaiting response', summary: 'Customers have published quotes with no recorded response.', recommendation: 'Run structured follow-up on these quotations from the Action Center.', metricLabel: 'Awaiting response', metricValue: String(sales.followup.publishedNoResponse), href: '/admin/actions', sourceLabel: 'Sales Dashboard (30d)' });
  }

  if (actions) {
    if (actions.overdueFollowUps.length > 0) insights.push({ id: 'followups-due', priority: 'high', category: 'operations', title: 'Follow-ups are due now', summary: 'RFQs have overdue follow-up dates that may impact conversion.', recommendation: 'Open Action Center and complete overdue follow-ups first.', metricLabel: 'Overdue follow-ups', metricValue: String(actions.overdueFollowUps.length), href: '/admin/actions', sourceLabel: 'Action Center' });
    if (actions.highValueUrgent.length > 0) insights.push({ id: 'urgent-highvalue-rfqs', priority: 'high', category: 'rfq', title: 'Urgent or high-value RFQs need prioritization', summary: 'Important opportunities are currently active.', recommendation: 'Prioritize triage and quotation for high-value and urgent RFQs.', metricLabel: 'Priority RFQs', metricValue: String(actions.highValueUrgent.length), href: '/admin/actions', sourceLabel: 'Action Center' });
    if (actions.quotesReadyToPublish.length > 0) insights.push({ id: 'quotes-ready-publish', priority: 'medium', category: 'quote', title: 'Quotations are ready to publish', summary: 'Prepared quotations are waiting for customer visibility.', recommendation: 'Publish ready quotations to reduce decision delays.', metricLabel: 'Ready quotes', metricValue: String(actions.quotesReadyToPublish.length), href: '/admin/actions', sourceLabel: 'Action Center' });
  }

  if (products) {
    if (products.kpis.requestedUnknownStock > 0) insights.push({ id: 'unknown-stock-demand', priority: 'medium', category: 'inventory', title: 'Demanded items have unknown stock status', summary: 'Requested products include unknown stock records.', recommendation: 'Update stock statuses for demanded items to improve sales reliability.', metricLabel: 'Unknown stock demanded', metricValue: String(products.kpis.requestedUnknownStock), href: '/admin/products/analytics', sourceLabel: 'Product Analytics (30d)' });
    if (products.kpis.requestedOutBackorder > 0) insights.push({ id: 'out-backorder-demand', priority: 'high', category: 'inventory', title: 'Demand is hitting out-of-stock/backorder items', summary: 'Requested products include out-of-stock or backorder inventory.', recommendation: 'Coordinate procurement and supplier checks for high-demand inventory gaps.', metricLabel: 'Out/backorder demanded', metricValue: String(products.kpis.requestedOutBackorder), href: '/admin/products/analytics', sourceLabel: 'Product Analytics (30d)' });
    if (products.kpis.unmatchedRequestedItems > 0) insights.push({ id: 'unmatched-requested-items', priority: 'medium', category: 'product', title: 'Requested items are not matched to catalog products', summary: 'Some RFQ items cannot be linked to product records.', recommendation: 'Map unmatched RFQ items to product records for better demand tracking.', metricLabel: 'Unmatched items', metricValue: String(products.kpis.unmatchedRequestedItems), href: '/admin/products/analytics', sourceLabel: 'Product Analytics (30d)' });
    if (products.insights.mostRequestedCategory && products.insights.mostRequestedCategory !== 'n/a') insights.push({ id: 'demand-focus-category', priority: 'low', category: 'product', title: 'Demand focus category identified', summary: 'One product category is leading RFQ demand in this range.', recommendation: 'Use this category for sourcing, pricing reviews, and quote templates.', metricLabel: 'Top category', metricValue: products.insights.mostRequestedCategory, href: '/admin/products/analytics', sourceLabel: 'Product Analytics (30d)' });
  }

  if (ga) {
    const topSource = ga.trafficSources[0];
    if (topSource && topSource.sessions > 0) insights.push({ id: 'top-traffic-source', priority: 'low', category: 'traffic', title: 'Top website traffic source', summary: 'Public site traffic has a dominant channel/source in the selected period.', recommendation: 'Align landing pages and RFQ conversion paths with the strongest source.', metricLabel: 'Top channel/source', metricValue: `${topSource.channelGroup} · ${topSource.sourceMedium}`, href: '/admin/analytics', sourceLabel: 'Google Analytics (30d)' });
    const attempts = ga.funnel.find((x) => x.eventName === 'rfq_submit_attempt')?.eventCount ?? 0;
    const success = ga.funnel.find((x) => x.eventName === 'rfq_submit_success')?.eventCount ?? 0;
    if (attempts > success) insights.push({ id: 'rfq-attempt-gap', priority: 'medium', category: 'traffic', title: 'RFQ submission attempts exceed successes', summary: 'RFQ users begin submission more often than successful completions.', recommendation: 'Check RFQ UX and validation flow to reduce form drop-off.', metricLabel: 'Attempts vs success', metricValue: `${attempts} vs ${success}`, href: '/admin/analytics', sourceLabel: 'Google Analytics (30d)' });
    const quoteViewed = ga.funnel.find((x) => x.eventName === 'quote_viewed')?.eventCount ?? 0;
    const quoteResponded = ga.funnel.find((x) => x.eventName === 'quote_response_submitted')?.eventCount ?? 0;
    if (quoteViewed > 0 && quoteResponded < Math.ceil(quoteViewed * 0.25)) insights.push({ id: 'quote-view-response-gap', priority: 'medium', category: 'quote', title: 'Quote views are high vs customer responses', summary: 'Customers view quotations but response submissions are relatively low.', recommendation: 'Improve quote follow-up workflow and response prompts.', metricLabel: 'Viewed vs responded', metricValue: `${quoteViewed} vs ${quoteResponded}`, href: '/admin/analytics', sourceLabel: 'Google Analytics (30d)' });
  }

  const sorted = insights.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.priority] - ({ high: 0, medium: 1, low: 2 }[b.priority])));
  return { insights: sorted, isUnavailable: loaded === 0 };
}
