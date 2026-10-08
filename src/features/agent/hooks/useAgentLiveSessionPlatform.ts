"use client";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { AGENT_LIVE_TERMINAL_PLATFORM_LABELS } from "@/features/agent/utils/agentLiveTerminalPlatformLabels.constant";
import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

/** bd7e7aeb: platform + terminal chrome of the device running the session (defaults to mac). */
export function useAgentLiveSessionPlatform(
  sessionDeviceId: string | null | undefined,
): {
  readonly platform: AgentWitchDevicePlatform;
  readonly heading: string;
  readonly windowTitle: string;
} {
  const { devices } = useMyMacDevices();
  const platform =
    sessionDeviceId === null || sessionDeviceId === undefined
      ? "mac"
      : (devices.find((device) => device.id === sessionDeviceId)?.platform ??
        "mac");
  return { platform, ...AGENT_LIVE_TERMINAL_PLATFORM_LABELS[platform] };
}
