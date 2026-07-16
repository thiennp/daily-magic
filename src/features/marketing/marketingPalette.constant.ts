export const MARKETING_ACCENT_EMERALD_CLASSES = {
  ring: "ring-emerald-500/30",
  border: "border-emerald-600/35",
  text: "text-emerald-700",
  icon: "text-emerald-600/90",
  mutedBg: "bg-emerald-500/8",
} as const;

export const MARKETING_CTA_INK_CLASSES = [
  "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900/40",
  "dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-gray-900",
].join(" ");

export const MARKETING_FOCAL_CARD_CLASSES =
  "rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(9,9,11,0.22),0_8px_24px_-8px_rgba(9,9,11,0.08)] ring-1 ring-zinc-200/70";

export const MARKETING_FORM_PRIMARY_BUTTON_CLASSES = [
  "inline-flex w-full items-center justify-center gap-2",
  "rounded-lg px-5 py-3.5",
  "text-sm font-medium text-white",
  "bg-zinc-900 hover:bg-zinc-800",
  "dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
  "shadow-md hover:shadow-lg hover:shadow-zinc-900/20",
  "transition-all duration-200 ease-out hover:-translate-y-0.5",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/50 focus-visible:ring-offset-2",
  "dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-gray-900",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
].join(" ");

export const MARKETING_FORM_OUTLINE_BUTTON_CLASSES = [
  "inline-flex w-full items-center justify-center gap-2",
  "rounded-lg px-5 py-3.5",
  "text-sm font-medium text-zinc-900",
  "border border-zinc-200 bg-white",
  "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-white/[0.03]",
  "shadow-sm",
  "transition-all duration-200 ease-out hover:border-zinc-400 hover:bg-zinc-50",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-2",
].join(" ");

export const MARKETING_MOCK_SHELL_CLASSES = [
  "pointer-events-none select-none overflow-hidden",
  "rounded-xl",
  "bg-zinc-950 text-zinc-300",
  "ring-1 ring-zinc-800/80 shadow-inner",
].join(" ");

export const MARKETING_TRUST_CARD_CLASSES = [
  "flex w-full items-center gap-3",
  "rounded-xl border border-zinc-200/80 bg-white px-3.5 py-3",
  "text-sm font-medium leading-snug text-zinc-700",
  "shadow-sm ring-1 ring-zinc-200/40",
  "transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-50/80",
  "motion-reduce:transition-none",
].join(" ");

export const MARKETING_TRUST_ICON_SHELL_CLASSES = [
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
  "bg-zinc-100 text-zinc-600",
].join(" ");
