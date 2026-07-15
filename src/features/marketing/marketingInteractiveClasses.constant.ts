export const MARKETING_CARD_INTERACTIVE_CLASSES = [
  "transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:shadow-md",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");

const MARKETING_CTA_PRIMARY_DARK_MODE_CLASS =
  "dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-gray-900";

export const MARKETING_CTA_PRIMARY_CLASSES = [
  "inline-flex h-11 items-center justify-center",
  "rounded-lg px-5",
  "text-sm font-medium text-white",
  "bg-zinc-900 hover:bg-zinc-800",
  MARKETING_CTA_PRIMARY_DARK_MODE_CLASS,
  "shadow-sm hover:shadow-lg hover:shadow-zinc-900/20",
  "transition-all duration-200 ease-out hover:-translate-y-0.5",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");

export const MARKETING_CTA_SECONDARY_CLASSES = [
  "inline-flex h-11 items-center justify-center",
  "rounded-lg border border-zinc-200 px-5",
  "text-sm font-medium text-zinc-700",
  "bg-white shadow-sm",
  "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-white/[0.03]",
  "transition-all duration-200 ease-out hover:border-zinc-400 hover:bg-zinc-50",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-2",
  "motion-reduce:transition-none",
].join(" ");

export const MARKETING_CTA_GHOST_CLASSES = [
  "inline-flex items-center",
  "text-sm font-medium text-zinc-600 underline-offset-4",
  "rounded-sm",
  "dark:text-gray-400 dark:hover:text-white",
  "transition-all duration-200 ease-out hover:text-zinc-900 hover:underline",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2",
].join(" ");

export const MARKETING_TEXT_LINK_CLASSES = [
  "font-medium text-zinc-700 underline-offset-4",
  "rounded-sm",
  "dark:text-gray-300 dark:hover:text-white",
  "transition-all duration-200 ease-out hover:text-zinc-900 hover:underline",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2",
].join(" ");

export const MARKETING_SHOWCASE_CARD_BASE_CLASSES = [
  "group rounded-2xl p-6",
  "bg-white shadow-sm ring-1 ring-zinc-200/50",
  "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md",
  "focus-within:ring-2 focus-within:ring-zinc-300/60 focus-within:ring-offset-2",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");
