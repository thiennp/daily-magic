import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

/** bd7e7aeb: terminal chrome follows the session device's platform. */
export const AGENT_LIVE_TERMINAL_PLATFORM_LABELS: Readonly<
  Record<
    AgentWitchDevicePlatform,
    { readonly heading: string; readonly windowTitle: string }
  >
> = {
  mac: {
    heading: "Local Mac terminal",
    windowTitle: "agent-witch@mac — -zsh — 80×24",
  },
  linux: {
    heading: "Local Linux terminal",
    windowTitle: "agent-witch@linux — bash — 80×24",
  },
};
