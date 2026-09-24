import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export interface AgentAccessMacSummary {
  readonly id: string;
  readonly name: string;
  readonly lastSeenAt: string | null;
  readonly platform: string | null;
}

export const summarizeAgentAccessMac = (
  device: AgentWitchDeviceRecord,
): AgentAccessMacSummary => ({
  id: device.id,
  name: device.displayName ?? device.deviceLabel ?? "Mac",
  lastSeenAt: device.lastSeenAt,
  platform: device.platform ?? null,
});
