'use client';

interface RecommendationBadgeProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'savings' | 'efficiency';
}

export function RecommendationBadge({
  label,
  icon,
  variant = 'default',
}: RecommendationBadgeProps) {
  const variantClasses = {
    default: 'border-white/20 bg-white/5 text-slate-200',
    savings: 'border-green-500/40 bg-green-500/10 text-green-200',
    efficiency: 'border-blue-500/40 bg-blue-500/10 text-blue-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {icon}
      {label}
    </span>
  );
}

interface RecommendationCardProps {
  title: string;
  description: string;
  itemCount?: number;
  savings?: string;
  onActionClick: () => void;
  actionLabel: string;
  isActive?: boolean;
  isArabic?: boolean;
}

export function RecommendationCard({
  title,
  description,
  itemCount,
  savings,
  onActionClick,
  actionLabel,
  isActive = false,
  isArabic = false,
}: RecommendationCardProps) {
  return (
    <div
      className={`rounded-xl border transition p-4 ${
        isActive
          ? 'border-orange-500/40 bg-orange-500/10'
          : 'border-white/15 bg-gradient-to-br from-white/10 to-white/5 hover:border-white/20'
      }`}
    >
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {itemCount && (
          <RecommendationBadge
            label={`${itemCount} ${isArabic ? 'عنصر' : 'items'}`}
            variant="default"
          />
        )}
        {savings && (
          <RecommendationBadge label={savings} variant="savings" />
        )}
      </div>

      <button
        onClick={onActionClick}
        className={`mt-4 inline-flex rounded-lg px-4 py-2 text-sm font-semibold border transition ${
          isActive
            ? 'border-orange-500/60 bg-orange-500/20 text-orange-100 hover:bg-orange-500/30'
            : 'border-orange-500/40 bg-orange-500/10 text-orange-200 hover:bg-orange-500/20'
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
}

interface RecommendationSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function RecommendationSection({
  title,
  subtitle,
  children,
}: RecommendationSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-300">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

interface ProductRecommendationItemProps {
  productName: string;
  brand: string;
  specs?: string;
  onAdd: () => void;
  onView: () => void;
  isArabic?: boolean;
}

export function ProductRecommendationItem({
  productName,
  brand,
  specs,
  onAdd,
  onView,
  isArabic = false,
}: ProductRecommendationItemProps) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-white text-sm line-clamp-2">
            {productName}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{brand}</p>
          {specs && (
            <p className="mt-1 text-xs text-slate-300 line-clamp-1">{specs}</p>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={onAdd}
          className="flex-1 rounded-lg border border-orange-500/40 bg-orange-500/10 px-2.5 py-1.5 text-xs font-semibold text-orange-200 hover:bg-orange-500/20 transition"
        >
          {isArabic ? 'أضف' : 'Add'}
        </button>
        <button
          onClick={onView}
          className="flex-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition"
        >
          {isArabic ? 'عرض' : 'View'}
        </button>
      </div>
    </div>
  );
}
