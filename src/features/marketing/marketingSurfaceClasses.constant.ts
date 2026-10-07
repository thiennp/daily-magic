import {
  MARKETING_BODY_CLASSES,
  MARKETING_BORDER_SUBTLE_CLASSES,
  MARKETING_CARD_RADIUS_CLASSES,
  MARKETING_EYEBROW_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";

export const MARKETING_LIGHT_SURFACE_CLASS = "marketing-light-surface";

export const MARKETING_INPUT_BASE_CLASSES = [
  "mt-2 w-full",
  `${MARKETING_CARD_RADIUS_CLASSES} border border-awc-border px-3 py-2.5`,
  "text-sm text-awc-fg dark:text-white/90",
  "bg-white shadow-sm placeholder:text-awc-fg-muted",
  "dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-white/40",
].join(" ");

export const MARKETING_INPUT_FOCUS_CLASSES = [
  "outline-none",
  "transition-all duration-200 ease-out",
  "focus:border-awc-blue-600 focus:outline-none focus:ring-2 focus:ring-awc-blue-600/30",
  "dark:focus:border-white/50 dark:focus:ring-white/30",
].join(" ");

export const MARKETING_SURFACE_BASE_CLASSES = [
  MARKETING_CARD_RADIUS_CLASSES,
  "bg-white shadow-sm",
  MARKETING_BORDER_SUBTLE_CLASSES,
  "dark:bg-white/[0.02] dark:border-gray-800",
].join(" ");

export const MARKETING_TEXT_PRIMARY_CLASSES =
  "text-awc-fg dark:text-white/90";

export const MARKETING_TEXT_SECONDARY_CLASSES = [
  MARKETING_BODY_CLASSES,
  "dark:text-gray-300",
].join(" ");

/** Muted labels (card categories, helper copy) — WCAG AA on white / sand. */
export const MARKETING_TEXT_MUTED_CLASSES = "text-awc-fg-muted dark:text-gray-400";

/** Uppercase section eyebrows — WCAG AA on marketing sand / white surfaces. */
export const MARKETING_EYEBROW_TEXT_CLASSES = [
  MARKETING_EYEBROW_CLASSES,
  "dark:text-brand-300",
].join(" ");

export const MARKETING_HEADER_LINK_CLASSES =
  "text-awc-fg transition hover:text-awc-fg dark:text-gray-300 dark:hover:text-white";
