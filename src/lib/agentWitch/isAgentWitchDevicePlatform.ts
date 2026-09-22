import { isOneOf } from "guardz";

import {
  AGENT_WITCH_DEVICE_PLATFORMS,
  type AgentWitchDevicePlatform,
} from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

export const isAgentWitchDevicePlatform = isOneOf<AgentWitchDevicePlatform>(
  ...AGENT_WITCH_DEVICE_PLATFORMS,
);
