import type { ReactElement } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import { MARKETING_ACCENT_BRAND_CLASSES } from "@/features/marketing/marketingPalette.constant";
import type { MarketingFeaturePreviewKey } from "@/features/marketing/marketingFeatureItems.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { LockIcon } from "@/icons";

const DISPATCH_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-lg bg-gray-50 p-3 ring-1 ring-gray-200/80">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-gray-800">Organization setup</span>
      <MarketingStatusBadge tone="success">
        4 agents connected
      </MarketingStatusBadge>
    </div>
    <div className="rounded-lg bg-white px-3 py-2 text-xs text-gray-600 ring-1 ring-gray-200/80">
      Team workflows · ready to deploy
    </div>
  </div>
);

const APPROVE_PREVIEW = (): ReactElement => (
  <div
    className={mergeMarketingClasses(
      "space-y-2 rounded-xl p-3 ring-1",
      MARKETING_ACCENT_BRAND_CLASSES.mutedBg,
      "ring-brand-500/15",
    )}
  >
    <span
      className={mergeMarketingClasses(
        "inline-flex items-center gap-1.5 text-xs font-semibold",
        MARKETING_ACCENT_BRAND_CLASSES.text,
      )}
    >
      <AppIcon
        icon={LockIcon}
        size="xs"
        className={MARKETING_ACCENT_BRAND_CLASSES.icon}
      />
      Organization policy
    </span>
    <p className="text-xs leading-relaxed text-gray-600">
      Managers approve before cross-Mac jobs run.
    </p>
  </div>
);

const REPORT_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-lg bg-gray-50 p-3 ring-1 ring-gray-200/80">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-gray-800">Team workflow #1042</span>
      <MarketingStatusBadge tone="success">Finished</MarketingStatusBadge>
    </div>
    <p className="truncate text-xs text-gray-500">
      Visible to managers and teammates
    </p>
  </div>
);

const PREVIEW_MAP: Record<MarketingFeaturePreviewKey, () => ReactElement> = {
  dispatch: DISPATCH_PREVIEW,
  approve: APPROVE_PREVIEW,
  report: REPORT_PREVIEW,
};

interface MarketingFeaturePreviewProps {
  readonly preview: MarketingFeaturePreviewKey;
}

export default function MarketingFeaturePreview({
  preview,
}: MarketingFeaturePreviewProps) {
  return PREVIEW_MAP[preview]();
}
