/**
 * Home dashboard grid:
 * - Mobile: single column (hero first via order-*)
 * - xl (1280+): 280–320px left rail + fluid main/right stack (stage layout)
 * - 2xl (1536+): fixed side rails with flexible center (~960px+ at 1600 canvas)
 */
export const HOME_DASHBOARD_GRID_CLASS =
  "grid grid-cols-1 gap-6 text-left sm:gap-8 xl:grid-cols-[minmax(17.5rem,20rem)_minmax(0,1fr)] 2xl:grid-cols-[minmax(17.5rem,20rem)_minmax(0,1fr)_minmax(17.5rem,22rem)]";

export const HOME_LEFT_RAIL_CLASS =
  "order-2 space-y-6 xl:order-none xl:col-start-1 xl:row-span-2 2xl:row-span-1";

export const HOME_MAIN_COLUMN_CLASS =
  "order-1 space-y-6 xl:col-start-2 xl:row-start-1 2xl:col-start-2 2xl:row-start-1";

export const HOME_RIGHT_RAIL_CLASS =
  "order-3 space-y-6 xl:col-start-2 xl:row-start-2 2xl:col-start-3 2xl:row-start-1";
