/**
 * Agent Witch marketing / public-site design system (v2026).
 * Enterprise landing reference: gray-50 canvas, brand blue accents, navy dark
 * bands, border-first cards, tight display headings. Shared with AWL inline CSS
 * via `@agent-witch/shared/ui`.
 */

export const MARKETING_DESIGN_SYSTEM_VERSION = "2026-09";

/** Top announcement strip (navy) above marketing header */
export const MARKETING_ANNOUNCEMENT_BAR_CLASSES =
  "bg-gray-950 px-4 py-2.5 text-center text-xs font-medium text-gray-200 sm:text-sm";

/** Page and section backgrounds */
export const MARKETING_PAGE_BACKGROUND_CLASSES = "bg-gray-50";

export const MARKETING_DARK_SECTION_CLASSES = "bg-gray-950 text-white";

export const MARKETING_DARK_SECTION_MUTED_TEXT_CLASSES = "text-gray-400";

export const MARKETING_CTA_BAND_CLASSES = "bg-brand-600 text-white";

/** Typography */
export const MARKETING_EYEBROW_CLASSES =
  "text-xs font-semibold uppercase tracking-[0.14em] text-brand-700";

export const MARKETING_DISPLAY_HEADING_CLASSES =
  "font-bold tracking-[-0.03em] text-gray-900";

export const MARKETING_SECTION_HEADING_CLASSES =
  "font-bold tracking-[-0.02em] text-gray-900";

export const MARKETING_BODY_CLASSES = "text-gray-600 leading-relaxed";

export const MARKETING_META_LABEL_CLASSES =
  "font-mono text-sm text-brand-600";

/** Surfaces */
export const MARKETING_BORDER_SUBTLE_CLASSES = "border border-gray-200";

export const MARKETING_CARD_RADIUS_CLASSES = "rounded-xl";

export const MARKETING_SURFACE_ELEVATED_CLASSES = [
  MARKETING_CARD_RADIUS_CLASSES,
  "bg-white",
  MARKETING_BORDER_SUBTLE_CLASSES,
  "shadow-sm",
].join(" ");

export const MARKETING_GROUPED_CARD_SHELL_CLASSES = [
  MARKETING_CARD_RADIUS_CLASSES,
  "overflow-hidden",
  MARKETING_BORDER_SUBTLE_CLASSES,
  "bg-white",
  "divide-y divide-gray-200 sm:divide-y-0 sm:divide-x",
].join(" ");

/** Icon tiles (feature grid) */
export const MARKETING_ICON_TILE_CLASSES = [
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
  "bg-brand-50 text-brand-600",
].join(" ");

/** Stats / trust metric dividers */
export const MARKETING_METRIC_DIVIDER_CLASSES =
  "border-brand-200 lg:divide-brand-200";

export const MARKETING_METRIC_VALUE_CLASSES =
  "text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl";

export const MARKETING_METRIC_DESCRIPTION_CLASSES =
  "mt-1 text-sm leading-snug text-gray-600";

/** Primary & secondary actions on light surfaces */
export const MARKETING_BUTTON_PRIMARY_CLASSES = [
  "inline-flex items-center justify-center",
  MARKETING_CARD_RADIUS_CLASSES,
  "px-5 py-2.5",
  "text-sm font-semibold text-white",
  "bg-brand-600 hover:bg-brand-700",
  "shadow-sm",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2",
  "motion-reduce:transition-none",
].join(" ");

export const MARKETING_BUTTON_SECONDARY_CLASSES = [
  "inline-flex items-center justify-center",
  MARKETING_CARD_RADIUS_CLASSES,
  "border border-gray-200 bg-white px-5 py-2.5",
  "text-sm font-semibold text-gray-800",
  "shadow-sm hover:border-gray-300 hover:bg-gray-50",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60 focus-visible:ring-offset-2",
  "motion-reduce:transition-none",
].join(" ");

export const MARKETING_BUTTON_ON_BRAND_BAND_CLASSES = [
  "inline-flex items-center justify-center",
  MARKETING_CARD_RADIUS_CLASSES,
  "bg-white px-6 py-3",
  "text-sm font-semibold text-brand-700",
  "shadow-sm hover:bg-brand-50",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600",
].join(" ");

export const MARKETING_LINK_CLASSES =
  "font-semibold text-brand-600 underline-offset-4 transition-colors hover:text-brand-700 hover:underline";
