import type {
  AgentWitchHostMode,
  AgentWitchProcessHostResolution,
  ResolveAgentWitchProcessHostInput,
} from "../../public-api/types";
import {
  AGENT_WITCH_EXTERNAL_BRIDGE_ENV,
  AGENT_WITCH_EXTERNAL_LIVE_ENV,
} from "../../public-api/types";

import { isAgentWitchTruthyEnv } from "./isAgentWitchTruthyEnv";

const resolveHostModeLabel = (
  skipInProcessBridge: boolean,
  skipInProcessLive: boolean,
): AgentWitchHostMode => {
  if (skipInProcessBridge && !skipInProcessLive) {
    return "bridge-external";
  }
  if (skipInProcessLive && !skipInProcessBridge) {
    return "live-external";
  }
  if (skipInProcessBridge && skipInProcessLive) {
    return "bridge-external";
  }
  return "monolith";
};

export const resolveAgentWitchProcessHost = (
  input: ResolveAgentWitchProcessHostInput = {},
): AgentWitchProcessHostResolution => {
  const env: Readonly<Record<string, string | undefined>> =
    input.env ?? process.env;
  const skipInProcessBridge = isAgentWitchTruthyEnv(
    env[AGENT_WITCH_EXTERNAL_BRIDGE_ENV],
  );
  const skipInProcessLive = isAgentWitchTruthyEnv(
    env[AGENT_WITCH_EXTERNAL_LIVE_ENV],
  );

  return {
    mode: resolveHostModeLabel(skipInProcessBridge, skipInProcessLive),
    skipInProcessBridge,
    skipInProcessLive,
  };
};
