import {
  resolveAgentWitchDefaultWakePort,
  resolveAgentWitchLaunchAgentPrefix,
} from "./resolveAgentWitchLocalLayout";

export const AGENT_WITCH_WAKE_DEFAULT_PORT = resolveAgentWitchDefaultWakePort();

export const AGENT_WITCH_WAKE_LAUNCH_AGENT_LABEL = `${resolveAgentWitchLaunchAgentPrefix()}-wake`;

export const AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL =
  resolveAgentWitchLaunchAgentPrefix();

export const resolveAgentWitchWakePort = (): number => {
  const fromEnv = process.env.AGENT_WITCH_WAKE_PORT?.trim();
  if (fromEnv !== undefined && fromEnv.length > 0) {
    const parsed = Number.parseInt(fromEnv, 10);
    if (Number.isFinite(parsed) && parsed > 0 && parsed <= 65535) {
      return parsed;
    }
  }

  return resolveAgentWitchDefaultWakePort();
};
