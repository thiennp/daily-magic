import type { ReactElement } from "react";

import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import type { MarketingFeaturePreviewKey } from "@/features/marketing/marketingFeatureItems.constant";
import {
  MARKETING_TEXT_MUTED_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import { LockIcon } from "@/icons";

const DISPATCH_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-slate-50/80 p-3 ring-1 ring-slate-200/40">
    <div className="flex items-center justify-between text-xs">
      <span className={mergeMarketingClasses("font-medium", MARKETING_TEXT_SECONDARY_CLASSES)}>
        Who is online
      </span>
      <MarketingStatusBadge tone="success">2 teammates</MarketingStatusBadge>
    </div>
    <div
      className={mergeMarketingClasses(
        "rounded-lg bg-white px-3 py-2 text-xs ring-1 ring-slate-200/30",
        MARKETING_TEXT_SECONDARY_CLASSES,
      )}
    >
      Send to your Mac · ready
    </div>
  </div>
);

const APPROVE_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-brand-500/[0.05] p-3 ring-1 ring-brand-500/10">
    <div className="flex items-center justify-between gap-2">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-800">
        <LockIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Company rule
      </span>
      <MarketingStatusBadge tone="warning">Ask first</MarketingStatusBadge>
    </div>
    <p className="text-xs leading-relaxed text-brand-900/75">
      A manager approves before using someone else&apos;s Mac.
    </p>
  </div>
);

const REPORT_PREVIEW = (): ReactElement => (
  <div className="space-y-2 rounded-xl bg-slate-50/80 p-3 ring-1 ring-slate-200/40">
    <div className="flex items-center justify-between text-xs">
      <span className={mergeMarketingClasses("font-medium", MARKETING_TEXT_SECONDARY_CLASSES)}>
        Job #1042
      </span>
      <MarketingStatusBadge tone="success">Finished</MarketingStatusBadge>
    </div>
    <p className={mergeMarketingClasses("truncate text-xs", MARKETING_TEXT_MUTED_CLASSES)}>
      Saved with the full answer
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
