import type { ReactNode } from "react";

import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type MarketingStatusTone = "success" | "warning";

const TONE_CLASSES: Record<MarketingStatusTone, string> = {
  success:
    "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400",
  warning:
    "bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/15 dark:bg-amber-500/10 dark:text-amber-400",
};

interface MarketingStatusBadgeProps {
  readonly tone: MarketingStatusTone;
  readonly children: ReactNode;
}

export default function MarketingStatusBadge({
  tone,
  children,
}: MarketingStatusBadgeProps) {
  return (
    <span
      className={mergeMarketingClasses(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-theme-xs font-medium",
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
