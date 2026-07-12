import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingFeaturePreview from "@/features/marketing/MarketingFeaturePreview";
import type MarketingFeatureItem from "@/features/marketing/marketingFeatureItems.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
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
        item.emphasized ? "bg-gradient-to-b from-brand-500/[0.04] to-white" : "",
      )}
    >
      <MarketingFeaturePreview preview={item.preview} />
      <div>
        <h3
          className={mergeMarketingClasses(
            "text-sm font-semibold",
            MARKETING_TEXT_PRIMARY_CLASSES,
          )}
        >
          {item.title}
        </h3>
        <p
          className={mergeMarketingClasses(
            "mt-2 text-sm leading-relaxed",
            MARKETING_TEXT_SECONDARY_CLASSES,
          )}
        >
          {item.body}
        </p>
      </div>
    </MarketingCard>
  );
}
