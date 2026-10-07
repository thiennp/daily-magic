/**
 * One-window Activity chrome — awc sand + locked brand Pine #1f6656 / #19564a.
 * Scoped to messenger/oneWindow (+ Activity consumers); brand Pine + sand only.
 */

/** P1-S2: the One window — one full-width chat column filling the Chat full view. */
export const OW_SURFACE_CLASS =
  "flex min-h-0 min-w-0 flex-1 flex-col bg-awc-surface";

export const OW_PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-awc-primary bg-awc-primary px-3.5 py-2 text-sm font-medium text-white transition hover:bg-awc-blue-700 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-primary/40";

export const OW_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-awc-control-border bg-awc-surface px-3.5 py-2 text-sm font-medium text-awc-fg transition hover:bg-awc-surface-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-control-border";

export const OW_GHOST_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 py-1.5 text-sm font-medium text-awc-fg-muted transition hover:bg-awc-tile hover:text-awc-fg disabled:opacity-50";

export const OW_KEPT_CHIP_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-accent-soft-2 bg-awc-accent-soft px-2.5 py-0.5 text-[13px] font-semibold text-awc-blue-700";

export const OW_FILTER_CHIP_IDLE_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-border bg-awc-surface px-2.5 py-1 text-[13px] text-awc-fg hover:bg-awc-tile";

export const OW_FILTER_CHIP_ACTIVE_CLASS =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-accent-soft-2 bg-awc-accent-soft px-2.5 py-1 text-[13px] font-medium text-awc-blue-700";

export const OW_COMPOSER_BOX_CLASS =
  "flex items-end gap-2 rounded-[10px] border border-awc-control-border bg-awc-surface px-2.5 py-2 focus-within:border-awc-fg";

export const OW_TEXTAREA_CLASS =
  "min-h-[40px] max-h-40 w-full flex-1 resize-none border-0 bg-transparent text-sm text-awc-fg placeholder:text-awc-fg-subtle focus:outline-none disabled:opacity-50";

export const OW_BUBBLE_OTHER_CLASS =
  "rounded-tl-sm rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] border border-awc-border bg-awc-surface px-3 py-2 text-sm text-awc-fg";

export const OW_BUBBLE_SELF_CLASS =
  "rounded-tl-[10px] rounded-tr-sm rounded-br-[10px] rounded-bl-[10px] border border-awc-accent-soft-2 bg-awc-accent-soft px-3 py-2 text-sm text-awc-fg";

export const OW_CARD_CLASS =
  "max-w-[760px] rounded-[10px] border border-awc-border bg-awc-surface p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.06)]";

export const OW_CARD_NEEDS_CLASS =
  "max-w-[760px] rounded-[10px] border border-awc-accent-soft-2 bg-awc-surface p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-awc-accent-soft";

export const OW_NOTICE_CLASS =
  "flex max-w-[760px] flex-wrap items-start gap-2.5 rounded-[10px] bg-awc-tile px-3 py-2 text-[13px] text-awc-fg-muted";

export const OW_GONE_CLASS =
  "mb-2 flex items-start gap-2 rounded-lg bg-awc-warn-soft px-2.5 py-2 text-[13px] text-awc-warn";

export const OW_STATE_WRAP_CLASS =
  "grid flex-1 place-items-center px-5 py-8 text-center";

export const OW_ILL_CLASS =
  "grid h-14 w-14 place-items-center rounded-2xl bg-awc-tile-2 text-awc-fg-muted";

/** Status pill tones (task card / update pill) — existing awc ok / warn / Pine tint tokens. */
export const OW_STATUS_TONE_CLASS = {
  ok: "bg-awc-ok-soft text-awc-ok",
  warn: "bg-awc-warn-soft text-awc-warn",
  info: "bg-awc-accent-soft text-awc-blue-700",
} as const;

/** P1-S4a day separator: centred label between hairlines. */
export const OW_DAY_SEPARATOR_CLASS =
  "flex items-center gap-2.5 text-[12px] font-semibold text-awc-fg-subtle before:h-px before:flex-1 before:bg-awc-border after:h-px after:flex-1 after:bg-awc-border";

/** P1-S4a "New" marker at the first unread message. */
export const OW_NEW_MARKER_CLASS =
  "flex items-center gap-2.5 text-[12px] font-bold text-awc-bad after:h-px after:flex-1 after:bg-awc-bad after:opacity-50";

/** P1-S4a jump-to-new pill, floating over the bottom of the feed. */
export const OW_JUMP_NEW_CLASS =
  "absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-lg border border-awc-primary bg-awc-primary px-2.5 py-1 text-[12.5px] font-medium text-white shadow-md hover:bg-awc-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-awc-primary/40";
