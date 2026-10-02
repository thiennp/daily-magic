import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
  HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS,
  HOME_RIGHT_RAIL_CLASS,
  HOME_RIGHT_RAIL_WITHOUT_LEFT_RAIL_CLASS,
} from "@/features/home/homeDashboardLayout.constant";

export interface HomeDashboardLayoutClasses {
  readonly gridClassName: string;
  readonly mainColumnClassName: string;
  readonly rightRailClassName: string;
  readonly showLeftRail: boolean;
}

const resolveHomeDashboardLayoutClasses = (
  showLeftRail: boolean,
): HomeDashboardLayoutClasses => {
  if (showLeftRail) {
    return {
      gridClassName: HOME_DASHBOARD_GRID_CLASS,
      mainColumnClassName: HOME_MAIN_COLUMN_CLASS,
      rightRailClassName: HOME_RIGHT_RAIL_CLASS,
      showLeftRail: true,
    };
  }

  return {
    gridClassName: HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS,
    mainColumnClassName: HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS,
    rightRailClassName: HOME_RIGHT_RAIL_WITHOUT_LEFT_RAIL_CLASS,
    showLeftRail: false,
  };
};

export default resolveHomeDashboardLayoutClasses;
