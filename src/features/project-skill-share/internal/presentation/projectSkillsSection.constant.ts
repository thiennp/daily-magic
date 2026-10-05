import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

/** Mirrors Project Access nested section cards (projects/access) without a cross-feature import. */
export const PROJECT_SKILLS_SECTION_CLASS =
  "space-y-3 rounded-xl border border-gray-200/80 bg-white/70 p-3 dark:border-gray-800/80 dark:bg-white/[0.02]";

export const PROJECT_SKILLS_TITLE_CLASS =
  "text-sm font-semibold text-gray-900 dark:text-white";

export const PROJECT_SKILLS_HINT_CLASS =
  "text-xs text-gray-500 dark:text-gray-400";

export const PROJECT_SKILLS_BADGE_CLASS =
  "inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200";

export const PROJECT_SKILLS_INPUT_CLASS =
  "w-full rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

export const PROJECT_SKILLS_CTA = {
  primary: APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  secondary: APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  danger:
    "inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-all duration-200 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-950/40",
} as const;
