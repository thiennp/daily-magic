import type { ReactElement } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import { MARKETING_ACCENT_EMERALD_CLASSES } from "@/features/marketing/marketingPalette.constant";
import type { MarketingFeaturePreviewKey } from "@/features/marketing/marketingFeatureItems.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { LockIcon } from "@/icons";

const DISPATCH_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200/40">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-zinc-700">Organization setup</span>
      <MarketingStatusBadge tone="success">
        4 agents connected
      </MarketingStatusBadge>
    </div>
    <div className="rounded-lg bg-white px-3 py-2 text-xs text-zinc-600 ring-1 ring-zinc-200/30">
      Team workflows · ready to deploy
    </div>
  </div>
);

const APPROVE_PREVIEW = (): ReactElement => (
  <div
    className={mergeMarketingClasses(
      "space-y-2 rounded-xl p-3 ring-1",
      MARKETING_ACCENT_EMERALD_CLASSES.mutedBg,
      "ring-emerald-500/10",
    )}
  >
    <span
      className={mergeMarketingClasses(
        "inline-flex items-center gap-1.5 text-xs font-semibold",
        MARKETING_ACCENT_EMERALD_CLASSES.text,
      )}
    >
      <AppIcon
        icon={LockIcon}
        size="xs"
        className={MARKETING_ACCENT_EMERALD_CLASSES.icon}
      />
      Organization policy
    </span>
    <p className="text-xs leading-relaxed text-zinc-600">
      Managers approve before cross-Mac jobs run.
    </p>
  </div>
);

const REPORT_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200/40">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-zinc-700">Team workflow #1042</span>
      <MarketingStatusBadge tone="success">Finished</MarketingStatusBadge>
    </div>
    <p className="truncate text-xs text-zinc-500">
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
