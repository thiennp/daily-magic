import { describe, expect, it } from "vitest";

import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
  HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
import resolveHomeDashboardLayoutClasses from "@/features/home/utils/resolveHomeDashboardLayoutClasses";

describe("resolveHomeDashboardLayoutClasses", () => {
  it("reserves the left track only while the onboarding rail is visible (HOME-064)", () => {
    const withRail = resolveHomeDashboardLayoutClasses(true);

    expect(withRail.showLeftRail).toBe(true);
    expect(withRail.gridClassName).toBe(HOME_DASHBOARD_GRID_CLASS);
    expect(withRail.mainColumnClassName).toBe(HOME_MAIN_COLUMN_CLASS);
    expect(withRail.gridClassName).toContain(
      "xl:grid-cols-[minmax(17.5rem,20rem)_minmax(0,1.6fr)_minmax(0,1fr)]",
    );
  });

  it("drops the left track when the rail is hidden so main starts in column 1 (HOME-064)", () => {
    const withoutRail = resolveHomeDashboardLayoutClasses(false);

    expect(withoutRail.showLeftRail).toBe(false);
    expect(withoutRail.gridClassName).toBe(
      HOME_DASHBOARD_GRID_WITHOUT_LEFT_RAIL_CLASS,
    );
    expect(withoutRail.mainColumnClassName).toBe(
      HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS,
    );
    expect(withoutRail.gridClassName).not.toContain(
      "xl:grid-cols-[minmax(17.5rem,20rem)",
    );
    expect(withoutRail.mainColumnClassName.split(" ")).not.toContain(
      "xl:col-start-2",
    );
    expect(withoutRail.rightRailClassName.split(" ")).not.toContain(
      "xl:col-start-2",
    );
    expect(withoutRail.gridClassName).toContain(
      "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]",
    );
  });
});
