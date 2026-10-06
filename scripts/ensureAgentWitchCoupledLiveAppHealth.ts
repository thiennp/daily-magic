import fs from "node:fs";

import { AGENT_WITCH_LIVE_APP_PORT } from "@agent-witch/shared/network";

import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import {
  resolveAgentWitchAppBundlePath,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";

export interface AgentWitchCoupledLiveAppHealthResult {
  readonly ok: boolean;
  readonly liveReachable: boolean;
  readonly hollowInstall: boolean;
  readonly kickstartedLabels: readonly string[];
}

export const isAgentWitchLiveAppHttpReachable = async (
  timeoutMs: number = 1500,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:${AGENT_WITCH_LIVE_APP_PORT}/health`,
      {
        signal: AbortSignal.timeout(timeoutMs),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * When AWL (`:43347`) is down but the install bundle exists, kickstart AgentWitch
 * LaunchAgents so the in-process or coupled runtime brings Live back.
 */
export const ensureAgentWitchCoupledLiveAppHealth = async (
  installDir: string = resolveAgentWitchInstallDir(),
): Promise<AgentWitchCoupledLiveAppHealthResult> => {
  const hollowInstall = !fs.existsSync(
    resolveAgentWitchAppBundlePath(installDir),
  );

  if (hollowInstall) {
    return {
      ok: false,
      liveReachable: false,
      hollowInstall: true,
      kickstartedLabels: [],
    };
  }

  const initiallyReachable = await isAgentWitchLiveAppHttpReachable();
  if (initiallyReachable) {
    return {
      ok: true,
      liveReachable: true,
      hollowInstall: false,
      kickstartedLabels: [],
    };
  }

  const kickstartedLabels: string[] = [];
  for (const target of listAgentWitchLaunchTargets(installDir)) {
    const kicked = await kickstartAgentWitchLaunchAgent(
      target.launchAgentLabel,
    );
    if (kicked.ok) {
      kickstartedLabels.push(target.launchAgentLabel);
    }
  }

  const liveReachable = await isAgentWitchLiveAppHttpReachable();

  return {
    ok: liveReachable || kickstartedLabels.length > 0,
    liveReachable,
    hollowInstall: false,
    kickstartedLabels,
  };
};
