/**
 * Projects list (PP-1) chrome classes. Light styles use only V5-1 `--awc-*`
 * tokens (warm-grey borders, no cool slate) and the self-hosted Plex font
 * var. `dark:` variants are kept so the app-wide theme toggle does not
 * regress. Extends the L3 V5 project chrome constants — no new greys.
 */
import { PROJECT_V5_NEUTRAL_CHIP_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { APP_SHELL_V5_FONT_CLASS } from "@/features/shell/v5/public-api/types";

export const PROJECTS_V5_PAGE_CLASS = `${APP_PAGE_STACK_CLASS} ${APP_SHELL_V5_FONT_CLASS}`;

export const PROJECTS_V5_PANEL_CLASS =
  "rounded-awc-card bg-awc-surface p-5 shadow-awc-card dark:bg-gray-900/60 dark:ring-1 dark:ring-gray-800";

export const PROJECTS_V5_MUTED_TEXT_CLASS =
  "text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400";

export const PROJECTS_V5_HEADING_CLASS =
  "text-[length:var(--awc-fs-body)] font-semibold text-awc-fg dark:text-white/90";

export const PROJECTS_V5_DIVIDER_CLASS =
  "border-t border-awc-border dark:border-gray-800";

/** Inset card inside the panel (My bots wrapper). */
export const PROJECTS_V5_INSET_CLASS =
  "rounded-awc-lg border border-awc-border bg-awc-surface p-4 dark:border-gray-800 dark:bg-white/[0.02]";

/** Project card: 20px radius, warm border, blue-600 hover/focus ring (artifact v6 .pc). */
export const PROJECTS_V5_CARD_CLASS =
  "rounded-awc-card border border-awc-border bg-awc-surface p-4 transition hover:border-awc-border-strong hover:ring-2 hover:ring-awc-blue-600/30 focus-within:ring-2 focus-within:ring-awc-blue-600/30 dark:border-gray-800/80 dark:bg-white/[0.03]";

export const PROJECTS_V5_CARD_LINK_CLASS =
  "awc-focus-ring absolute inset-0 z-0 rounded-awc-card focus-visible:outline-none";

export const PROJECTS_V5_CARD_TITLE_CLASS =
  "truncate text-[length:var(--awc-fs-card-title)] font-semibold text-awc-fg dark:text-white/90";

export const PROJECTS_V5_CARD_META_CLASS =
  "text-[length:var(--awc-fs-row-sub)] text-awc-fg-muted dark:text-gray-400";

/** "Default" chip: neutral tonal (`--awc-tile-2` + muted ink), never solid blue-600 (I5). */
export const PROJECTS_V5_DEFAULT_CHIP_CLASS = PROJECT_V5_NEUTRAL_CHIP_CLASS;

export const PROJECTS_V5_SEARCH_FIELD_CLASS =
  "w-full rounded-awc-control border border-awc-border-strong bg-awc-surface px-4 py-2.5 text-[length:var(--awc-fs-body)] text-awc-fg outline-none transition placeholder:text-awc-fg-subtle focus:border-awc-blue-600 focus:ring-4 focus:ring-awc-blue-600/15 dark:border-gray-700/80 dark:bg-gray-800/80 dark:text-white dark:focus:border-brand-400";

export const PROJECTS_V5_ICON_BUTTON_CLASS =
  "awc-focus-ring flex items-center justify-center rounded-awc-pill text-awc-fg-muted transition hover:bg-awc-tile hover:text-awc-fg dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200";

/** Card "…" menu panel — replaces the shared Dropdown cool-slate base. */
export const PROJECTS_V5_MENU_PANEL_CLASS =
  "w-56 rounded-awc-lg border border-awc-border bg-awc-surface p-1.5 shadow-awc-overlay dark:border-gray-800 dark:bg-gray-dark";

const MENU_ROW_BASE_CLASS =
  "flex min-h-11 w-full items-center gap-2 rounded-awc-chip px-3 py-2.5 text-left text-[length:var(--awc-fs-body)] sm:min-h-0 sm:py-2";

export const PROJECTS_V5_MENU_ITEM_CLASS = `${MENU_ROW_BASE_CLASS} text-awc-fg hover:bg-awc-tile focus-visible:bg-awc-tile focus-visible:outline-none dark:text-gray-300 dark:hover:bg-white/5`;

export const PROJECTS_V5_MENU_ITEM_DANGER_CLASS = `${MENU_ROW_BASE_CLASS} text-awc-bad hover:bg-awc-bad-soft focus-visible:bg-awc-bad-soft focus-visible:outline-none dark:text-error-400 dark:hover:bg-error-950/30`;

/**
 * `[aria-disabled=true]` menu row (I7): V5-1 `.awc-disabled` tokens
 * (`--awc-disabled-bg/-fg`, dashed `--awc-disabled-border`). Stays focusable.
 */
export const PROJECTS_V5_MENU_ITEM_DISABLED_CLASS = `awc-disabled ${MENU_ROW_BASE_CLASS} cursor-not-allowed justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-awc-blue-600`;

export const PROJECTS_V5_MENU_REASON_ICON_CLASS =
  "inline-grid size-4 shrink-0 place-items-center rounded-awc-pill border border-current text-[10px] font-semibold leading-none";

/** (i) reason bubble — shown on row hover / focus; always in the a11y tree. */
export const PROJECTS_V5_MENU_REASON_CLASS =
  "pointer-events-none absolute right-1.5 top-full z-10 mt-1 w-max max-w-[13rem] rounded-awc-chip bg-awc-fg px-2.5 py-1.5 text-[length:var(--awc-fs-chip)] text-awc-surface opacity-0 shadow-awc-overlay transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-gray-100 dark:text-gray-900";
