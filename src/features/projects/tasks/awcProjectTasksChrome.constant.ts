/**
 * Tasks-tab sand chrome — awc tokens only (PALETTE-LOCK / design HTML).
 * Scoped to Tasks files so parallel palette tips can own globals.
 */

/** Primary CTA — brand blue LOCK (`bg-awc-primary` = awc-blue-600). */
export const AWC_TASKS_PRIMARY_BUTTON_CLASS =
  "rounded-lg border border-awc-primary bg-awc-primary px-3 py-1.5 text-[13px] font-medium text-white hover:bg-awc-blue-700 disabled:opacity-50";

/** Secondary / ghost outline — design .btn (control-border). */
export const AWC_TASKS_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center gap-1.5 rounded-lg border border-awc-control-border bg-awc-surface px-3 py-1.5 text-[13px] font-medium text-awc-fg hover:bg-awc-surface-2 disabled:opacity-45";

export const AWC_TASKS_GHOST_BUTTON_CLASS =
  "inline-flex items-center gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 py-1 text-[13px] font-medium text-awc-fg-muted hover:bg-awc-tile hover:text-awc-fg";

export const AWC_TASKS_INPUT_CLASS =
  "w-full rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-1.5 text-sm text-awc-fg placeholder:text-awc-fg-subtle focus:border-awc-fg focus:outline-none";

export const AWC_TASKS_LINK_CLASS =
  "text-[13px] font-medium text-awc-fg underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-control-border";

export const AWC_TASKS_CARD_CLASS =
  "overflow-hidden rounded-xl border border-awc-border bg-awc-surface shadow-[0_1px_2px_rgba(16,24,40,0.06)]";

export const AWC_TASKS_LIST_CLASS = "list-none m-0 p-0";

export const AWC_TASKS_ROW_CLASS =
  "grid w-full grid-cols-[minmax(0,1fr)_auto_5.75rem] items-center gap-3 border-b border-awc-border px-3.5 py-3 text-left last:border-b-0 hover:bg-awc-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-awc-fg";

export const AWC_TASKS_ROW_TITLE_CLASS =
  "block truncate text-[14px] font-semibold text-awc-fg";

export const AWC_TASKS_ROW_META_CLASS =
  "mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-awc-fg-muted";

export const AWC_TASKS_ROW_TIME_CLASS =
  "text-right text-[12.5px] text-awc-fg-subtle whitespace-nowrap";

export const AWC_TASKS_PANEL_HEADING_CLASS =
  "text-[13px] font-semibold uppercase tracking-[0.04em] text-awc-fg-subtle";

export const AWC_TASKS_STATUS_CLASS =
  "px-1 py-3 text-[13px] text-awc-fg-muted";
