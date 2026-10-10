import type AgentWitchPresenceTier from "@/lib/agentWitch/types/AgentWitchPresenceTier.type";
import { resolveMacPresenceTier } from "@/features/agent-witch/online-wake/resolveMacPresenceTier";

export type MacPresenceTier = AgentWitchPresenceTier;

export interface MacDevicePresence {
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly presenceTier?: MacPresenceTier;
  readonly isDispatchReady?: boolean;
  readonly lastSeenAt?: string | null;
}

/** Live on this server — preferred default Mac for writer dispatch. */
export const canRunWriterDispatchToMac = (device: MacDevicePresence): boolean =>
  resolveMacPresenceTier(device) === "live";

/** Mac can receive queued work when live locally or on another server instance. */
export const canDispatchToMac = (device: MacDevicePresence): boolean => {
  const tier = resolveMacPresenceTier(device);
  return tier === "live" || tier === "live_other_instance";
};
