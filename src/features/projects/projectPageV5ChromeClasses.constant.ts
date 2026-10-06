/**
 * L3 V5-3 project chrome classes — light styles use V5-1 `--awc-*` tokens
 * only; `dark:` kept so the app-wide theme toggle does not regress.
 */
export const PROJECT_V5_H1_CLASS =
  "text-[length:var(--awc-fs-h1)] font-semibold leading-tight tracking-[-0.02em] text-awc-fg dark:text-white";

export const PROJECT_V5_BREADCRUMB_CLASS =
  "flex min-w-0 items-center gap-1.5 text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400";

export const PROJECT_V5_CHIP_BASE_CLASS =
  "inline-flex h-[var(--awc-chip-h)] w-fit items-center gap-1.5 rounded-awc-chip px-2 text-[length:var(--awc-fs-chip)] font-semibold";

export const PROJECT_V5_NEUTRAL_CHIP_CLASS = `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-tile-2 text-awc-fg-muted dark:bg-white/10 dark:text-gray-200`;

/** Secondary white pill (header Edit on this computer). */
export const PROJECT_V5_PILL_BUTTON_CLASS =
  "awc-focus-ring inline-flex h-9 w-full items-center justify-center rounded-awc-pill border border-awc-border-strong bg-awc-surface px-4 text-[length:var(--awc-fs-sm)] font-medium text-awc-fg shadow-awc-lift transition hover:bg-awc-tile sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

export const PROJECT_V5_REASON_CLASS =
  "text-[length:var(--awc-fs-row-sub)] text-awc-fg-subtle dark:text-gray-400";

export const PROJECT_V5_ROUND_TRIGGER_CLASS =
  "awc-focus-ring inline-grid size-9 shrink-0 place-items-center rounded-awc-pill border border-awc-border bg-awc-surface text-awc-fg-muted transition hover:bg-awc-tile dark:border-gray-700 dark:bg-white/10 dark:text-gray-300";

export const PROJECT_V5_MENU_CLASS =
  "absolute right-0 top-11 z-20 flex min-w-[14.5rem] flex-col rounded-awc-lg border border-awc-border bg-awc-surface p-1.5 shadow-awc-overlay dark:border-gray-700 dark:bg-gray-950";

export const PROJECT_V5_TABLIST_CLASS =
  "flex max-w-full gap-1 self-start overflow-x-auto rounded-awc-pill bg-awc-surface p-1 shadow-awc-card [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-white/10 [&::-webkit-scrollbar]:hidden";

export const PROJECT_V5_TAB_BASE_CLASS =
  "awc-focus-ring inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-awc-pill px-4 text-[length:var(--awc-fs-body)] font-medium transition-colors";

export const PROJECT_V5_TAB_ACTIVE_CLASS =
  "bg-awc-accent-soft text-awc-blue-700 dark:bg-white/15 dark:text-white";

export const PROJECT_V5_TAB_INACTIVE_CLASS =
  "text-awc-fg-muted hover:bg-awc-tile hover:text-awc-fg dark:text-gray-400 dark:hover:text-gray-200";

/** New / unread: solid blue-600 + white number. */
export const PROJECT_V5_TAB_UNREAD_BADGE_CLASS =
  "inline-grid h-5 min-w-5 place-items-center rounded-awc-pill bg-awc-blue-600 px-1.5 text-[11px] font-semibold tabular-nums text-white";

export const PROJECT_V5_TAB_COUNT_CHIP_CLASS =
  "inline-flex h-5 items-center rounded-awc-chip-sm bg-awc-tile-2 px-1.5 text-[11px] font-semibold tabular-nums text-awc-fg-muted dark:bg-white/10 dark:text-gray-300";

export const PROJECT_V5_PANEL_SUBTITLE_CLASS =
  "px-1 text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400";
