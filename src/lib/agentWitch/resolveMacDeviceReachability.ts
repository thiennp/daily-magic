import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";

export const isMacDeviceReachableViaHeartbeat = (input: {
  readonly lastSeenAt: string | null;
  readonly nowMs?: number;
}): boolean => isAgentWitchDeviceRecentlySeen(input.lastSeenAt, input.nowMs);

export const canDispatchToMacDevice = (input: {
  readonly isHubConnected: boolean;
  readonly lastSeenAt: string | null;
}): boolean =>
  input.isHubConnected ||
  isMacDeviceReachableViaHeartbeat({ lastSeenAt: input.lastSeenAt });
