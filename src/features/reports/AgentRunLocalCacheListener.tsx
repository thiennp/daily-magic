"use client";

import { useEffect } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";

const handleAgentRunLocalCacheSocketMessage = (raw: string): void => {
  trackOnboardingFromAgentWitchSocketMessage(raw);
  syncAgentRunLocalCacheFromSocket(raw);
};

export default function AgentRunLocalCacheListener() {
  const demoPreview = useDemoPreview();

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    return subscribeAgentWitchDashboardSocket({
      onStatusChange: () => undefined,
      onMessage: handleAgentRunLocalCacheSocketMessage,
      onSocketChange: () => undefined,
    });
  }, [demoPreview]);

  return null;
}
