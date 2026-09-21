import type { ReactElement } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingFeaturePreview from "@/features/marketing/MarketingFeaturePreview";
import type {
  MarketingFeaturePreviewKey,
  MarketingFeatureItem,
} from "@/features/marketing/marketingFeatureItems.constant";
import { MARKETING_ICON_TILE_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { BoltIcon, LockIcon, PieChartIcon } from "@/icons";

const FEATURE_ICON_MAP: Record<MarketingFeaturePreviewKey, typeof BoltIcon> = {
  dispatch: BoltIcon,
  approve: LockIcon,
  report: PieChartIcon,
};

interface MarketingFeatureCardProps {
  readonly item: MarketingFeatureItem;
  readonly grouped?: boolean;
}

function FeatureCardBody({ item }: { readonly item: MarketingFeatureItem }) {
  const Icon = FEATURE_ICON_MAP[item.preview];

  return (
    <>
      <span className={MARKETING_ICON_TILE_CLASSES} aria-hidden="true">
        <AppIcon icon={Icon} size="sm" className="text-brand-600" />
      </span>
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
    </>
  );
}

export default function MarketingFeatureCard({
  item,
  grouped = false,
}: MarketingFeatureCardProps): ReactElement {
  if (grouped) {
    return (
      <article className="flex h-full flex-col gap-4 p-6">
        <FeatureCardBody item={item} />
      </article>
    );
  }

  return (
    <MarketingCard
      as="article"
      interactive
      className="flex h-full flex-col gap-4 p-5"
    >
      <FeatureCardBody item={item} />
    </MarketingCard>
  );
}
