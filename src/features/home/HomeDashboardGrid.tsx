"use client";

import type { ReactNode } from "react";

import HomeOnboardingAutomateNudge from "@/features/home/HomeOnboardingAutomateNudge";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import { HOME_LEFT_RAIL_CLASS } from "@/features/home/homeDashboardLayout.constant";
import useShowHomeLeftRail from "@/features/home/HomeLeftRailVisibility";
import resolveHomeDashboardLayoutClasses from "@/features/home/utils/resolveHomeDashboardLayoutClasses";

interface HomeDashboardGridProps {
  readonly main: ReactNode;
  readonly right: ReactNode;
}

export default function HomeDashboardGrid({
  main,
  right,
}: HomeDashboardGridProps) {
  const layout = resolveHomeDashboardLayoutClasses(useShowHomeLeftRail());

  return (
    <div className={layout.gridClassName}>
      {layout.showLeftRail ? (
        <aside className={HOME_LEFT_RAIL_CLASS}>
          <HomeOnboardingChecklist />
          <HomeOnboardingAutomateNudge />
        </aside>
      ) : null}
      <main className={layout.mainColumnClassName}>{main}</main>
      <aside className={layout.rightRailClassName}>{right}</aside>
    </div>
  );
}
