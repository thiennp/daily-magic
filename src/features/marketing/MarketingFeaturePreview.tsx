import type { ReactElement } from "react";

import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import { MARKETING_ACCENT_EMERALD_CLASSES } from "@/features/marketing/marketingPalette.constant";
import type { MarketingFeaturePreviewKey } from "@/features/marketing/marketingFeatureItems.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { LockIcon } from "@/icons";

const DISPATCH_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200/40">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-zinc-700">Who is online</span>
      <MarketingStatusBadge tone="success">2 teammates</MarketingStatusBadge>
    </div>
    <div className="rounded-lg bg-white px-3 py-2 text-xs text-zinc-600 ring-1 ring-zinc-200/30">
      Send to your Mac · ready
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
    <div className="flex items-center justify-between gap-2">
      <span
        className={mergeMarketingClasses(
          "inline-flex items-center gap-1.5 text-xs font-semibold",
          MARKETING_ACCENT_EMERALD_CLASSES.text,
        )}
      >
        <LockIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Company rule
      </span>
      <MarketingStatusBadge tone="warning">Ask first</MarketingStatusBadge>
    </div>
    <p className="text-xs leading-relaxed text-zinc-600">
      A manager approves before using someone else&apos;s Mac.
    </p>
  </div>
);

const REPORT_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-zinc-50 p-3 ring-1 ring-zinc-200/40">
    <div className="flex items-center justify-between text-xs">
      <span className="font-medium text-zinc-700">Job #1042</span>
      <MarketingStatusBadge tone="success">Finished</MarketingStatusBadge>
    </div>
    <p className="truncate text-xs text-zinc-500">Saved with the full answer</p>
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
