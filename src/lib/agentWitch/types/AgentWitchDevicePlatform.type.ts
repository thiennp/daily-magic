export const AGENT_WITCH_DEVICE_PLATFORMS = ["mac", "linux"] as const;

export type AgentWitchDevicePlatform =
  (typeof AGENT_WITCH_DEVICE_PLATFORMS)[number];
