import {
  APP_SURFACE_PANEL_CLASS,
  APP_SURFACE_PANEL_PADDING_COMPACT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

/** Desktop primary nav — card panel from the `md` breakpoint (mobile uses bottom nav). */
export const APP_SHELL_DESKTOP_NAV_CLASS = [
  APP_SURFACE_PANEL_CLASS,
  APP_SURFACE_PANEL_PADDING_COMPACT_CLASS,
  "hidden w-full flex-col gap-4 md:flex",
].join(" ");

export const APP_SHELL_NAV_LINK_BASE_CLASSES =
  "flex w-full rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30";

export const APP_SHELL_NAV_LINK_ACTIVE_CLASSES =
  "bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-500/20 dark:bg-brand-500/20 dark:text-brand-300 dark:ring-brand-400/30";

export const APP_SHELL_NAV_LINK_INACTIVE_CLASSES =
  "text-gray-600 hover:bg-gray-100/70 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white";
