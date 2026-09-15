import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import type AgentWitchPresenceTier from "@/lib/agentWitch/types/AgentWitchPresenceTier.type";

export const resolveAgentWitchDevicePresenceTier = (input: {
  readonly deviceId: string;
  readonly lastSeenAt: string | null;
  readonly localLiveDeviceIds: ReadonlySet<string>;
  readonly remoteLiveDeviceIds: ReadonlySet<string>;
  readonly nowMs?: number;
}): AgentWitchPresenceTier => {
  if (input.localLiveDeviceIds.has(input.deviceId)) {
    return "live";
  }

  if (input.remoteLiveDeviceIds.has(input.deviceId)) {
    return "live_other_instance";
  }

  if (
    isAgentWitchDeviceRecentlySeen(input.lastSeenAt, input.nowMs ?? Date.now())
  ) {
    return "recent";
  }

  return "offline";
};

export const isAgentWitchDeviceDispatchReadyTier = (
  tier: AgentWitchPresenceTier,
): boolean => tier === "live" || tier === "live_other_instance";
