"use client";

import type { ReactNode } from "react";

import HomeOnboardingAutomateNudge from "@/features/home/HomeOnboardingAutomateNudge";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";

interface HomeDashboardBoardProps {
  readonly head: ReactNode;
  readonly lead: ReactNode;
  readonly grid: ReactNode;
}

/** Top-of-home stack: head, setup card, lead actions, then 2-col grid. */
export default function HomeDashboardBoard({
  head,
  lead,
  grid,
}: HomeDashboardBoardProps) {
  return (
    <div className="space-y-5">
      {head}
      <HomeOnboardingChecklist />
      <HomeOnboardingAutomateNudge />
      {lead}
      {grid}
    </div>
  );
}
