export const APP_SURFACE_NESTED_CARD_CLASS =
  "rounded-xl border border-awc-border/80 bg-awc-surface-2/80 p-4 transition-all dark:border-gray-800/80 dark:bg-white/[0.03]";

export const APP_SURFACE_PANEL_CLASS =
  "rounded-2xl border border-awc-border/80 bg-white shadow-[0_4px_20px_-2px_rgba(16,24,40,0.05)] transition-all dark:border-gray-800/80 dark:bg-gray-900/60 dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)]";

export const APP_SURFACE_PANEL_PADDING_DEFAULT_CLASS = "p-6";

export const APP_SURFACE_PANEL_PADDING_COMPACT_CLASS = "p-5";

export const APP_SURFACE_ACCENT_PANEL_CLASS =
  "rounded-2xl border border-brand-200/90 bg-brand-50/60 shadow-[0_4px_20px_-2px_rgba(31,102,86,0.06)] dark:border-brand-900/50 dark:bg-brand-950/30";

export const APP_SURFACE_HERO_NEUTRAL_CLASS =
  "overflow-hidden rounded-3xl border border-awc-border/80 bg-gradient-to-br from-awc-surface-2/90 via-white to-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-awc-border/60 dark:border-gray-800/80 dark:from-gray-900/90 dark:via-gray-900/60 dark:to-gray-950/90 dark:ring-gray-800/80";

export const APP_SURFACE_HERO_BRAND_CLASS =
  "overflow-hidden rounded-3xl border border-awc-border/80 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-awc-border/60 dark:border-gray-800/80 dark:bg-gray-900/70 dark:ring-gray-800/80";

export const APP_SURFACE_HERO_PLAIN_CLASS =
  "rounded-3xl border border-awc-border/80 bg-white p-8 shadow-[0_4px_20px_-2px_rgba(16,24,40,0.05)] dark:border-gray-800/80 dark:bg-gray-900/60";

export const APP_SURFACE_TERMINAL_PRE_CLASS =
  "overflow-x-auto rounded-xl border border-awc-border/90 bg-gray-900 p-4 text-left font-mono text-xs text-gray-100 shadow-inner dark:border-gray-800 dark:bg-gray-950";

export const APP_SURFACE_STEP_BADGE_CLASS =
  "flex shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white shadow-sm dark:bg-brand-500 dark:text-white";

export const APP_SURFACE_BASH_TERMINAL_PRE_CLASS =
  "overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left font-mono text-xs text-zinc-100 shadow-inner";

export const APP_SURFACE_TERMINAL_COPY_BUTTON_CLASS =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-awc-border bg-white text-awc-fg-muted shadow-sm transition-all hover:bg-awc-surface-2 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

export const APP_SURFACE_BASH_TERMINAL_COPY_BUTTON_CLASS =
  "flex items-center justify-center self-stretch px-3 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white";

export const APP_SURFACE_EYEBROW_TEXT_CLASS =
  "text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400";

export const APP_SURFACE_PAGE_TITLE_CLASS =
  "text-2xl font-bold tracking-tight text-awc-fg dark:text-white";

export const APP_SURFACE_PAGE_DESCRIPTION_CLASS =
  "mt-2 text-sm text-awc-fg-muted dark:text-gray-400";

export const APP_SURFACE_SECTION_TITLE_CLASS =
  "text-lg font-semibold tracking-tight text-awc-fg dark:text-white";

export const APP_SURFACE_BODY_TEXT_CLASS =
  "text-sm text-awc-fg-muted leading-relaxed dark:text-gray-400";

const APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS =
  "dark:bg-brand-600 dark:hover:bg-brand-500 dark:focus-visible:ring-brand-500/40 dark:focus-visible:ring-offset-gray-950";

export const APP_SURFACE_CTA_PRIMARY_CLASS = [
  "inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-awc-blue-700 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-blue-600/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_CTA_PRIMARY_SM_CLASS = [
  "inline-flex items-center justify-center rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-awc-blue-700 hover:shadow active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-blue-600/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_CTA_PRIMARY_LG_CLASS = [
  "inline-flex h-[5.5rem] w-[300px] items-center justify-center rounded-2xl bg-brand-600 px-10 text-xl font-semibold text-white shadow-md transition-all duration-200 hover:bg-awc-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-blue-600/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_CTA_PRIMARY_ICON_CLASS = [
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm transition-all duration-200 hover:bg-awc-blue-700 hover:shadow-md hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-blue-600/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  APP_SURFACE_CTA_PRIMARY_DARK_MODE_CLASS,
].join(" ");

export const APP_SURFACE_FIELD_CLASS =
  "w-full rounded-xl border border-awc-border bg-white px-4 py-3 text-sm text-awc-fg shadow-sm outline-none transition-all duration-200 focus:border-awc-blue-600 focus:ring-4 focus:ring-awc-blue-600/15 dark:border-gray-700/80 dark:bg-gray-800/80 dark:text-white dark:focus:border-brand-400 dark:focus:ring-brand-400/20";

export const APP_SURFACE_CTA_SECONDARY_CLASS =
  "inline-flex h-10 items-center justify-center rounded-xl border border-awc-border/90 bg-white px-4 text-sm font-semibold text-awc-fg shadow-sm transition-all duration-200 hover:border-awc-border-strong hover:bg-awc-surface-2 hover:shadow active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-border-strong/60 focus-visible:ring-offset-2 dark:border-gray-700/80 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700/60";

export const APP_SURFACE_CTA_SECONDARY_SM_CLASS =
  "inline-flex items-center justify-center rounded-lg border border-awc-border/90 bg-white px-3 py-1.5 text-xs font-medium text-awc-fg transition-all duration-200 hover:bg-awc-surface-2 hover:border-awc-border-strong dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/60";

export const APP_SURFACE_TEXT_LINK_CLASS =
  "font-semibold text-brand-600 underline-offset-4 transition-colors hover:text-awc-blue-700 hover:underline dark:text-brand-400 dark:hover:text-brand-300";

export const APP_SURFACE_TEXT_LINK_MUTED_CLASS =
  "font-medium text-awc-fg-muted transition-colors hover:text-awc-fg dark:text-gray-400 dark:hover:text-gray-200";
