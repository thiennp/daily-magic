/**
 * Home dashboard grid (design home-v1):
 * - Default: two columns ~1.6fr / 1fr (Needs attention + projects | computers-adjacent cards)
 * - Optional left rail (onboarding checklist) only when still shown by gate
 * - Mobile: single column
 */
export const HOME_DASHBOARD_GRID_CLASS =
  "grid grid-cols-1 gap-5 text-left sm:gap-6 xl:grid-cols-[minmax(17.5rem,20rem)_minmax(0,1.6fr)_minmax(0,1fr)]";

export const HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS =
  "grid grid-cols-1 gap-5 text-left sm:gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]";

export const HOME_LEFT_RAIL_CLASS =
  "order-2 space-y-5 xl:order-none xl:col-start-1 xl:row-span-2";

export const HOME_MAIN_COLUMN_CLASS =
  "order-1 space-y-5 xl:col-start-2 xl:row-start-1";

export const HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS = "order-1 space-y-5";

export const HOME_RIGHT_RAIL_CLASS =
  "order-3 space-y-5 xl:col-start-3 xl:row-start-1";

export const HOME_RIGHT_RAIL_WITHOUT_LEFT_RAIL_CLASS =
  "order-3 space-y-5 lg:col-start-2 lg:row-start-1";
