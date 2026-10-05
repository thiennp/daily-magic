import { APP_SURFACE_CTA_PRIMARY_ICON_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

/**
 * Header "New task" icon CTA: ~60% of the shared 44px (`h-11 w-11`) primary
 * icon button → 26px (`size-6.5`). Still above the WCAG 2.5.8 24px minimum
 * target; keeps the shared focus ring and aria-label on the link.
 */
export const APP_SHELL_HEADER_NEW_TASK_BUTTON_CLASS =
  APP_SURFACE_CTA_PRIMARY_ICON_CLASS.replace("h-11 w-11", "size-6.5");
