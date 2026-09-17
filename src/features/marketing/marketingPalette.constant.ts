import {
  MARKETING_BORDER_SUBTLE_CLASSES,
  MARKETING_CARD_RADIUS_CLASSES,
  MARKETING_ICON_TILE_CLASSES,
  MARKETING_SURFACE_ELEVATED_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";

export const MARKETING_ACCENT_BRAND_CLASSES = {
  ring: "ring-brand-500/25",
  border: "border-brand-600/30",
  text: "text-brand-700",
  icon: "text-brand-600",
  mutedBg: "bg-brand-50",
} as const;

/** @deprecated Use MARKETING_ACCENT_BRAND_CLASSES */
export const MARKETING_ACCENT_EMERALD_CLASSES = MARKETING_ACCENT_BRAND_CLASSES;

export const MARKETING_CTA_INK_CLASSES = [
  "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500/40",
  "dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:ring-brand-400/40 dark:focus-visible:ring-offset-gray-900",
].join(" ");

export const MARKETING_FOCAL_CARD_CLASSES = MARKETING_SURFACE_ELEVATED_CLASSES;

export const MARKETING_FORM_PRIMARY_BUTTON_CLASSES = [
  "inline-flex w-full items-center justify-center gap-2",
  `${MARKETING_CARD_RADIUS_CLASSES} px-5 py-3.5`,
  "text-sm font-semibold text-white",
  "bg-brand-600 hover:bg-brand-700",
  "dark:bg-brand-500 dark:hover:bg-brand-400",
  "shadow-sm hover:shadow-md hover:shadow-brand-600/15",
  "transition-all duration-200 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2",
  "dark:focus-visible:ring-brand-400/40 dark:focus-visible:ring-offset-gray-900",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "motion-reduce:transition-none",
].join(" ");

export const MARKETING_FORM_OUTLINE_BUTTON_CLASSES = [
  "inline-flex w-full items-center justify-center gap-2",
  `${MARKETING_CARD_RADIUS_CLASSES} px-5 py-3.5`,
  "text-sm font-semibold text-gray-800",
  MARKETING_BORDER_SUBTLE_CLASSES,
  "bg-white",
  "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-white/[0.03]",
  "shadow-sm",
  "transition-all duration-200 ease-out hover:border-gray-300 hover:bg-gray-50",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60 focus-visible:ring-offset-2",
].join(" ");

export const MARKETING_MOCK_SHELL_CLASSES = [
  "pointer-events-none select-none overflow-hidden",
  MARKETING_CARD_RADIUS_CLASSES,
  "bg-gray-100 text-gray-700",
  MARKETING_BORDER_SUBTLE_CLASSES,
  "shadow-sm",
].join(" ");

export const MARKETING_TRUST_CARD_CLASSES = [
  "flex w-full flex-col items-start gap-1",
  "border-l-2 border-brand-500 pl-4 py-1",
  "text-sm leading-snug text-gray-800",
  "dark:text-gray-200",
].join(" ");

export const MARKETING_TRUST_ICON_SHELL_CLASSES = MARKETING_ICON_TILE_CLASSES;
