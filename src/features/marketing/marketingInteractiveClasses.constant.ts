import {
  MARKETING_BUTTON_PRIMARY_CLASSES,
  MARKETING_BUTTON_SECONDARY_CLASSES,
  MARKETING_LINK_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";

export const MARKETING_CARD_INTERACTIVE_CLASSES = [
  "transition-all duration-300 ease-out",
  "hover:border-gray-300 hover:shadow-md",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");

const MARKETING_CTA_PRIMARY_DARK_MODE_CLASS =
  "dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:ring-brand-400/40 dark:focus-visible:ring-offset-gray-900";

export const MARKETING_CTA_PRIMARY_CLASSES = [
  MARKETING_BUTTON_PRIMARY_CLASSES,
  "h-11",
  MARKETING_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const MARKETING_CTA_SECONDARY_CLASSES = [
  MARKETING_BUTTON_SECONDARY_CLASSES,
  "h-11",
  "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-white/[0.03]",
].join(" ");

export const MARKETING_CTA_GHOST_CLASSES = [
  "inline-flex items-center",
  "text-sm font-medium text-gray-700 underline-offset-4",
  "rounded-sm",
  "dark:text-gray-400 dark:hover:text-white",
  "transition-all duration-200 ease-out hover:text-gray-900 hover:underline",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50 focus-visible:ring-offset-2",
].join(" ");

export const MARKETING_TEXT_LINK_CLASSES = [
  MARKETING_LINK_CLASSES,
  "rounded-sm",
  "dark:text-brand-300 dark:hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2",
].join(" ");

export const MARKETING_SHOWCASE_CARD_BASE_CLASSES = [
  "group rounded-xl p-6",
  "bg-white shadow-sm ring-1 ring-gray-200/80",
  "dark:bg-white/[0.02] dark:ring-gray-800",
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:ring-gray-300/80",
  "focus-within:ring-2 focus-within:ring-brand-500/25 focus-within:ring-offset-2",
  "dark:focus-within:ring-white/20 dark:focus-within:ring-offset-gray-900",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");
