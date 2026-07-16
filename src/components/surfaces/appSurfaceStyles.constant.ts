export const APP_SURFACE_NESTED_CARD_CLASS =
  "rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]";

export const APP_SURFACE_PANEL_CLASS =
  "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]";

export const APP_SURFACE_PANEL_PADDING_DEFAULT_CLASS = "p-6";

export const APP_SURFACE_PANEL_PADDING_COMPACT_CLASS = "p-5";

export const APP_SURFACE_ACCENT_PANEL_CLASS =
  "rounded-2xl border border-brand-200 bg-brand-50/50 dark:border-brand-900/40 dark:bg-brand-950/20";

export const APP_SURFACE_HERO_NEUTRAL_CLASS =
  "overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-br from-gray-50 via-white to-white p-8 shadow-theme-sm ring-1 ring-gray-200/50 dark:border-gray-800 dark:from-white/[0.04] dark:via-white/[0.02] dark:to-white/[0.02]";

export const APP_SURFACE_HERO_BRAND_CLASS =
  "overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-8 shadow-theme-sm ring-1 ring-gray-200/50 dark:border-gray-800 dark:bg-white/[0.03] dark:ring-gray-800/80";

export const APP_SURFACE_HERO_PLAIN_CLASS =
  "rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]";

export const APP_SURFACE_TERMINAL_PRE_CLASS =
  "overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-left font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

export const APP_SURFACE_STEP_BADGE_CLASS =
  "flex shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900";

export const APP_SURFACE_BASH_TERMINAL_PRE_CLASS =
  "overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-left font-mono text-xs text-white";

export const APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-600 shadow-sm transition hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

export const APP_SURFACE_BASH_TERMINAL_COPY_BUTTON_CLASS =
  "flex items-center justify-center self-stretch px-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-white";

export const APP_SURFACE_EYEBROW_TEXT_CLASS =
  "text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400";

export const APP_SURFACE_PAGE_TITLE_CLASS =
  "text-2xl font-semibold text-gray-800 dark:text-white/90";

export const APP_SURFACE_PAGE_DESCRIPTION_CLASS =
  "mt-2 text-sm text-gray-600 dark:text-gray-400";

export const APP_SURFACE_SECTION_TITLE_CLASS =
  "text-lg font-semibold text-gray-800 dark:text-white/90";

export const APP_SURFACE_BODY_TEXT_CLASS =
  "text-sm text-gray-600 dark:text-gray-400";

const APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS =
  "dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 dark:focus-visible:ring-white/40 dark:focus-visible:ring-offset-gray-900";

export const APP_SURFACE_CTA_PRIMARY_CLASS = [
  "inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_CTA_PRIMARY_SM_CLASS = [
  "inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_CTA_PRIMARY_LG_CLASS = [
  "inline-flex h-[5.5rem] items-center justify-center rounded-2xl bg-zinc-900 px-10 text-xl font-semibold text-white shadow-md transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_FIELD_CLASS =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90";

export const APP_SURFACE_CTA_SECONDARY_CLASS =
  "inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-white/[0.03]";

export const APP_SURFACE_CTA_SECONDARY_SM_CLASS =
  "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5";

export const APP_SURFACE_TEXT_LINK_CLASS =
  "font-medium text-zinc-700 underline-offset-4 transition hover:text-zinc-900 hover:underline dark:text-gray-300 dark:hover:text-white";

export const APP_SURFACE_TEXT_LINK_MUTED_CLASS =
  "font-medium text-gray-600 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200";
