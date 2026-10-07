/** L3 V5-4 Chat dock layout — V5-1 `--awc-*` tokens only. */
export const CHAT_DOCK_ROOT_CLASS =
  "pointer-events-none fixed right-3 z-[60] flex flex-col items-end gap-2.5 max-md:bottom-[4.75rem] md:bottom-5 md:right-5";

export const CHAT_DOCK_ROOT_FULL_CLASS =
  "pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(16,24,40,0.35)] p-4 max-md:inset-0 max-md:rounded-none max-md:bg-awc-surface max-md:p-0 md:rounded-3xl";

export const CHAT_DOCK_FAB_CLASS =
  "awc-focus-ring pointer-events-auto relative inline-grid size-12 place-items-center rounded-awc-pill bg-awc-blue-600 text-white shadow-[0_8px_24px_rgba(31,102,86,0.35),0_2px_6px_rgba(16,24,40,0.15)] transition hover:bg-awc-blue-700 md:size-[3.25rem]";

export const CHAT_DOCK_BADGE_CLASS =
  "absolute -right-1 -top-1.5 grid h-[1.375rem] min-w-[1.375rem] place-items-center rounded-awc-pill bg-white px-1.5 text-[12px] font-semibold tabular-nums text-awc-blue-700 shadow-[0_0_0_2px_var(--awc-blue-600)]";

export const CHAT_DOCK_POP_CLASS =
  "pointer-events-auto flex w-[min(23.75rem,calc(100vw-1.5rem))] max-h-[min(40rem,calc(100dvh-6.25rem))] flex-col overflow-hidden rounded-[20px] bg-awc-surface shadow-awc-dock max-md:max-h-[calc(100dvh-9.375rem)]";

export const CHAT_DOCK_POP_FULL_CLASS =
  "pointer-events-auto flex h-full w-full max-w-[58.75rem] flex-col overflow-hidden rounded-[22px] bg-awc-surface shadow-awc-dock max-md:max-w-none max-md:rounded-none max-md:shadow-none";

export const CHAT_DOCK_HEAD_CLASS =
  "flex items-center justify-between bg-awc-blue-600 px-3 py-3 pl-[1.125rem] text-white";

export const CHAT_DOCK_HEAD_BTN_CLASS =
  "awc-focus-ring inline-grid size-8 place-items-center rounded-awc-control text-white transition hover:bg-white/15";

export const CHAT_DOCK_COMPOSER_CLASS =
  "overflow-y-auto bg-awc-surface-2 p-3 max-h-[55vh]";

/** P1-S1 full view hosts the project conversations (former Activity tab). */
export const CHAT_DOCK_BODY_FULL_CLASS =
  "min-h-0 flex-1 overflow-y-auto bg-awc-surface-2 p-3";

export const CHAT_DOCK_VIEWER_CLASS =
  "border-b border-awc-border bg-awc-tile px-3.5 py-2.5 text-[length:var(--awc-fs-sm)] text-awc-fg-subtle";
