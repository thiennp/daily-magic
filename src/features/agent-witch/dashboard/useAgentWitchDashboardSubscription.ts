"use client";

import { useEffect } from "react";

import { useOptionalAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";

export const useAgentWitchDashboardSubscription = (
  onMessage: (raw: string) => void,
  enabled = true,
): void => {
  const dashboard = useOptionalAgentWitchDashboard();

  useEffect(() => {
    if (!enabled || dashboard === null) {
      return;
    }

    return dashboard.subscribe(onMessage);
  }, [dashboard, enabled, onMessage]);
};
