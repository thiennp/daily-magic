"use client";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { AGENT_LIVE_TERMINAL_PLATFORM_LABELS } from "@/features/agent/utils/agentLiveTerminalPlatformLabels.constant";
import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

const guessBrowserDevicePlatform = (): AgentWitchDevicePlatform =>
  typeof navigator !== "undefined" &&
  /Linux/i.test(navigator.userAgent) &&
  !/Android/i.test(navigator.userAgent)
    ? "linux"
    : "mac";

/** bd7e7aeb: platform + terminal chrome of the device running the session (defaults to mac). */
export function useAgentLiveSessionPlatform(
  sessionDeviceId: string | null | undefined,
): {
  readonly platform: AgentWitchDevicePlatform;
  readonly heading: string;
  readonly windowTitle: string;
} {
  const { devices } = useMyMacDevices();
  // ed42d8ce: with no known session device, use this browser's OS instead of
  // always showing "agent-witch@mac ~ %" (a Linux box showed the mac prompt).
  const platform =
    devices.find((device) => device.id === sessionDeviceId)?.platform ??
    guessBrowserDevicePlatform();
  return { platform, ...AGENT_LIVE_TERMINAL_PLATFORM_LABELS[platform] };
}
