import type { ReactNode } from "react";

import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type MarketingStatusTone = "success" | "warning";

interface MarketingStatusBadgeProps {
  readonly tone: MarketingStatusTone;
  readonly children: ReactNode;
  readonly onDark?: boolean;
}

const TONE_CLASSES: Record<
  MarketingStatusTone,
  { readonly light: string; readonly dark: string }
> = {
  success: {
    light:
      "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/15",
    dark: "bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700/80",
  },
  warning: {
    light: "bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/15",
    dark: "bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700/80",
  },
};

export default function MarketingStatusBadge({
  tone,
  children,
  onDark = false,
}: MarketingStatusBadgeProps) {
  const palette = onDark ? TONE_CLASSES[tone].dark : TONE_CLASSES[tone].light;

  return (
    <span
      className={mergeMarketingClasses(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-theme-xs font-medium",
        palette,
      )}
    >
      {children}
    </span>
  );
}
