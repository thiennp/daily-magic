import type { ReactNode } from "react";

import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export type MarketingStatusTone =
  | "success"
  | "warning"
  | "info"
  | "neutral";

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
      "bg-success-50 text-success-700 ring-1 ring-success-500/20",
    dark: "bg-gray-800 text-success-300 ring-1 ring-gray-700/80",
  },
  warning: {
    light: "bg-amber-50 text-amber-800 ring-1 ring-amber-500/20",
    dark: "bg-gray-800 text-amber-200 ring-1 ring-gray-700/80",
  },
  info: {
    light: "bg-brand-50 text-brand-700 ring-1 ring-brand-500/20",
    dark: "bg-gray-800 text-brand-200 ring-1 ring-gray-700/80",
  },
  neutral: {
    light: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
    dark: "bg-gray-800 text-gray-300 ring-1 ring-gray-700/80",
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
