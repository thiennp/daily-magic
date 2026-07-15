"use client";

import { useEffect } from "react";

import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";

const handleAgentRunLocalCacheSocketMessage = (raw: string): void => {
  trackOnboardingFromAgentWitchSocketMessage(raw);
  syncAgentRunLocalCacheFromSocket(raw);
};

export default function AgentRunLocalCacheListener() {
  useEffect(() => {
    return subscribeAgentWitchDashboardSocket({
      onStatusChange: () => undefined,
      onMessage: handleAgentRunLocalCacheSocketMessage,
      onSocketChange: () => undefined,
    });
  }, []);

  return null;
}
