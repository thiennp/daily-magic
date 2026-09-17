import {
  kickstartAgentWitchLaunchAgent,
  listAgentWitchLaunchTargets,
  spawnAgentWitchClient,
} from "@agent-witch/install-macos-launch";

import {
  ensureAgentWitchCoupledWakeClientHealth,
  reviveAgentWitchWebSocket,
} from "../../../../../adapters/macAgentLifecycleBindings";
import type {
  AgentWitchWakeKickResult,
  AgentWitchWakeResponse,
} from "../public-api/types";

export const wakeAgentWitchLaunchAgents =
  async (): Promise<AgentWitchWakeResponse> => {
    await ensureAgentWitchCoupledWakeClientHealth();
    const targets = listAgentWitchLaunchTargets();
    const kicked: AgentWitchWakeKickResult[] = [];

    for (const target of targets) {
      const result = await kickstartAgentWitchLaunchAgent(
        target.launchAgentLabel,
      );
      kicked.push({
        launchAgentLabel: target.launchAgentLabel,
        profileEmail: target.profileEmail,
        ok: result.ok,
        ...(result.errorMessage !== undefined
          ? { errorMessage: result.errorMessage }
          : {}),
      });
    }

    if (!kicked.some((entry) => entry.ok)) {
      const spawned = spawnAgentWitchClient();
      kicked.push({
        launchAgentLabel: "direct-spawn",
        profileEmail: null,
        ok: spawned.ok,
        ...(spawned.errorMessage !== undefined
          ? { errorMessage: spawned.errorMessage }
          : {}),
      });
    }

    return {
      ok: kicked.some((entry) => entry.ok),
      kicked,
    };
  };

export const reviveAgentWitchWebSocketFromWakeServer =
  reviveAgentWitchWebSocket;

/** Kickstart Agent Witch, verify WS health, and reinstall from install script when revive fails. */
export const restartAgentWitchFromWakeServer = reviveAgentWitchWebSocket;
