"use client";

import type { ReactNode } from "react";

import useShowHomeLeftRail from "@/features/home/HomeLeftRailVisibility";
import resolveHomeDashboardLayoutClasses from "@/features/home/utils/resolveHomeDashboardLayoutClasses";

interface HomeDashboardLowerSectionProps {
  readonly children: ReactNode;
}

export default function HomeDashboardLowerSection({
  children,
}: HomeDashboardLowerSectionProps) {
  const layout = resolveHomeDashboardLayoutClasses(useShowHomeLeftRail());

  return (
    <div className={layout.gridClassName}>
      <div className={layout.mainColumnClassName}>{children}</div>
    </div>
  );
}
