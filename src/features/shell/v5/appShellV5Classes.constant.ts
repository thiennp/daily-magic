/**
 * L3 v5 Shell chrome classes. Light styles use only V5-1 `--awc-*` tokens
 * (via the `awc-*` @theme utilities) and `--font-awc-sans`. Existing `dark:`
 * variants are kept so the app-wide theme toggle (out of V5-2 scope) does
 * not regress.
 */
export const APP_SHELL_V5_FONT_CLASS =
  "font-[family-name:var(--font-awc-sans)]";

export const APP_SHELL_V5_TOPBAR_CLASS = [
  "sticky top-0 z-50 border-b border-awc-border bg-awc-surface",
  APP_SHELL_V5_FONT_CLASS,
  "dark:border-gray-800/80 dark:bg-gray-900/90",
].join(" ");

export const APP_SHELL_V5_SIDE_PANEL_CLASS = [
  "rounded-awc-card bg-awc-surface p-3 shadow-awc-card",
  APP_SHELL_V5_FONT_CLASS,
  "dark:bg-gray-900 dark:ring-1 dark:ring-gray-800",
].join(" ");

export const APP_SHELL_V5_WORDMARK_CLASS =
  "text-sm font-semibold tracking-tight text-awc-blue-950 dark:text-zinc-100";

export const APP_SHELL_V5_SECTION_CLASS =
  "border-t border-awc-border pt-4 dark:border-gray-700";

export const APP_SHELL_V5_HEADING_CLASS =
  "text-[length:var(--awc-fs-sm)] font-semibold text-awc-fg dark:text-white/90";

export const APP_SHELL_V5_META_CLASS =
  "text-[length:var(--awc-fs-chip)] text-awc-fg-muted dark:text-gray-400";

export const APP_SHELL_V5_LATEST_CHIP_CLASS =
  "inline-flex h-[var(--awc-chip-h-sm)] items-center rounded-awc-chip bg-awc-tile-2 px-2 text-[length:var(--awc-fs-chip)] font-semibold tabular-nums text-awc-fg-muted dark:bg-white/10 dark:text-gray-300";

/** Secondary pill: Update, Connect another computer. */
export const APP_SHELL_V5_PILL_BUTTON_CLASS =
  "awc-focus-ring inline-flex h-8 items-center rounded-awc-pill border border-awc-border-strong bg-awc-surface px-3 text-[length:var(--awc-fs-sm)] font-medium text-awc-fg hover:bg-awc-tile dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

export const APP_SHELL_V5_REASON_CLASS =
  "text-[length:var(--awc-fs-row-sub)] text-awc-fg-subtle dark:text-gray-400";
