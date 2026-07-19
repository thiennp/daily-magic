"use client";

import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const isRunHeartbeatForActiveRun = (
  raw: string,
  activeRunId: string,
): boolean => {
  try {
    const parsed: unknown = JSON.parse(raw);
    return (
      typeof parsed === "object" &&
      parsed !== null &&
      "type" in parsed &&
      parsed.type === AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT &&
      "payload" in parsed &&
      typeof parsed.payload === "object" &&
      parsed.payload !== null &&
      "agentRunId" in parsed.payload &&
      parsed.payload.agentRunId === activeRunId
    );
  } catch {
    return false;
  }
};

export const useAgentRunHeartbeatStallReset = (input: {
  readonly activeRunId: string | null;
  readonly isWorking: boolean;
  readonly noteRunHeartbeat: () => void;
}): void => {
  const enabled = input.isWorking && input.activeRunId !== null;

  useAgentWitchDashboardSubscription((raw) => {
    if (!enabled || input.activeRunId === null) {
      return;
    }

    if (isRunHeartbeatForActiveRun(raw, input.activeRunId)) {
      input.noteRunHeartbeat();
    }
  }, enabled);
};
