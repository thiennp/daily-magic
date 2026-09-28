import { isAgentWitchDevicePlatform } from "@/lib/agentWitch/isAgentWitchDevicePlatform";
import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

export const resolveAgentRegisterPlatform = (
  payload: Readonly<Record<string, unknown>> | undefined,
): AgentWitchDevicePlatform | null => {
  const raw = payload?.platform;
  if (typeof raw !== "string") {
    return null;
  }

  const normalized = raw.trim().toLowerCase();
  return isAgentWitchDevicePlatform(normalized) ? normalized : null;
};
