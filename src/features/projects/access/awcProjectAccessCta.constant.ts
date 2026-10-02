import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

/** Compact Access-column CTAs — primary / secondary / danger. */
export const AWC_PROJECT_ACCESS_CTA = {
  primary: APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  secondary: APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  danger:
    "inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-all duration-200 hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-950/40",
} as const;
