/** Desktop primary nav — left rail in AppShell grid (mobile uses header Menu). */
export const APP_SHELL_DESKTOP_NAV_CLASS = [
  "hidden w-full flex-col gap-4 md:flex",
].join(" ");

/** L3 v5 Shell: light styles use only V5-1 `--awc-*` tokens; dark kept. */
export const APP_SHELL_NAV_LINK_BASE_CLASSES =
  "awc-focus-ring flex w-full rounded-awc-control px-3 py-2 text-[length:var(--awc-fs-body)] font-medium transition-colors duration-200";

/** Selected = tonal accent-soft + blue-700 (v5 Projects-active pattern). */
export const APP_SHELL_NAV_LINK_ACTIVE_CLASSES =
  "bg-awc-accent-soft text-awc-blue-700 dark:bg-brand-500/20 dark:text-brand-300";

export const APP_SHELL_NAV_LINK_INACTIVE_CLASSES =
  "text-awc-fg-muted hover:bg-awc-tile hover:text-awc-fg dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white";
