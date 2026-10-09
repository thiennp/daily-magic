/** Overview chrome — V5-1 `--awc-*` tokens; dark: kept for app theme toggle. */
export const OVERVIEW_CARD_CLASS =
  "flex flex-col gap-3 rounded-awc-card border border-awc-border bg-awc-surface p-[18px] shadow-awc-card";

export const OVERVIEW_CTA_PRIMARY_SM_CLASS =
  "awc-focus-ring inline-flex shrink-0 items-center justify-center rounded-awc-pill bg-awc-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-awc-blue-700";

export const OVERVIEW_CTA_SECONDARY_SM_CLASS =
  "awc-focus-ring inline-flex shrink-0 items-center justify-center rounded-awc-pill border border-awc-border-strong bg-awc-surface px-3 py-1.5 text-xs font-medium text-awc-fg transition hover:bg-awc-tile dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300";

export const OVERVIEW_CTA_GHOST_SM_CLASS =
  "awc-focus-ring inline-flex shrink-0 items-center justify-center rounded-awc-pill px-2.5 py-1.5 text-xs font-medium text-awc-fg-muted transition hover:bg-awc-tile dark:text-gray-300";

export const OVERVIEW_PILL_DONE_CLASS =
  "inline-flex items-center rounded-awc-pill bg-awc-fg px-2.5 py-0.5 text-xs font-medium text-awc-surface dark:bg-white dark:text-gray-900";

export const OVERVIEW_GRID2_CLASS =
  "grid grid-cols-1 gap-4 min-[1040px]:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] min-[1040px]:items-start";

export const OVERVIEW_FACT_CLASS =
  "awc-focus-ring inline-flex items-center gap-1.5 rounded-awc-pill bg-awc-surface px-3.5 py-1.5 text-[13.5px] text-awc-fg-muted shadow-awc-lift transition hover:bg-awc-tile-2 hover:text-awc-fg dark:bg-white/10 dark:text-gray-300";

export const OVERVIEW_FACT_WARN_CLASS =
  "awc-focus-ring inline-flex items-center gap-1.5 rounded-awc-pill bg-awc-warn-soft px-3.5 py-1.5 text-[13.5px] text-awc-warn shadow-none transition";

/** Neutral pill — shared with Pitfalls severity `info` (main export name). */
export const OVERVIEW_PILL_NEUTRAL_CLASS =
  "inline-flex items-center rounded-full bg-awc-fill px-2.5 py-0.5 text-xs font-medium text-awc-fg-muted dark:bg-white/10 dark:text-gray-300";

/** Severity block pill — shared with Pitfalls (main export name). */
export const OVERVIEW_SEVERITY_BLOCK_CLASS =
  "inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300";

/** Severity warn pill — shared with Pitfalls (main export name; distinct from FACT_WARN). */
export const OVERVIEW_SEVERITY_WARN_CLASS =
  "inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300";
