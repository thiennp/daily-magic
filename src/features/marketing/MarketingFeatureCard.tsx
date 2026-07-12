import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingFeaturePreview from "@/features/marketing/MarketingFeaturePreview";
import type MarketingFeatureItem from "@/features/marketing/marketingFeatureItems.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingFeatureCardProps {
  readonly item: MarketingFeatureItem;
}

export default function MarketingFeatureCard({
  item,
}: MarketingFeatureCardProps) {
  return (
    <MarketingCard
      as="article"
      interactive
      className={mergeMarketingClasses(
        "flex h-full flex-col gap-4 p-5",
        item.emphasized
          ? "border-brand-200/70 bg-gradient-to-b from-brand-50/50 to-white ring-brand-100/80"
          : "",
      )}
    >
      <MarketingFeaturePreview preview={item.preview} />
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {item.body}
        </p>
      </div>
    </MarketingCard>
  );
}
