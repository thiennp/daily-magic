import os from "node:os";

import {
  listAgentWitchLaunchTargets,
  listAgentWitchLocalTokenHashes,
  resolveAgentWitchWakeIdentityPrimaryTokenHash,
  resolveAgentWitchWakePort,
} from "../../../../../adapters/runtimeProbe";
import type {
  AgentWitchWakeHealthResponse,
  AgentWitchWakeIdentityResponse,
} from "../public-api/types";

export const buildAgentWitchWakeHealthResponse =
  (): AgentWitchWakeHealthResponse => {
    const targets = listAgentWitchLaunchTargets();
    return {
      ok: true,
      port: resolveAgentWitchWakePort(),
      hostname: os.hostname(),
      profileCount: targets.length,
    };
  };

export const buildAgentWitchWakeIdentityResponse =
  (): AgentWitchWakeIdentityResponse => {
    const targets = listAgentWitchLaunchTargets();
    const tokenHash = resolveAgentWitchWakeIdentityPrimaryTokenHash();
    const tokenHashes = listAgentWitchLocalTokenHashes();
    return {
      hostname: os.hostname(),
      port: resolveAgentWitchWakePort(),
      tokenHash,
      tokenHashes:
        tokenHashes.length > 0
          ? tokenHashes
          : tokenHash !== null
            ? [tokenHash]
            : [],
      profiles: targets.map((target) => ({
        email: target.profileEmail,
        launchAgentLabel: target.launchAgentLabel,
      })),
    };
  };
