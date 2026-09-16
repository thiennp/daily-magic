import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import {
  readAgentWitchWakePortFromFile,
  resolveAgentWitchWakePortFilePath,
} from "./agentWitchWakePortFile";
import {
  resolveAgentWitchAppBundlePath,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "./resolveAgentWitchLocalLayout";

export interface AgentWitchCoupledWakeClientHealthResult {
  readonly ok: boolean;
  readonly wakePortFileExists: boolean;
  readonly wakeReachable: boolean;
  readonly hollowInstall: boolean;
  readonly kickstartedLabels: readonly string[];
}

export const isAgentWitchWakeHttpReachable = async (
  port: number,
  timeoutMs: number = 1500,
): Promise<boolean> => {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    return response.ok;
  } catch {
    return false;
  }
};

const resolveWakeLaunchAgentPlistPath = (launchAgentLabel: string): string =>
  path.join(
    os.homedir(),
    "Library",
    "LaunchAgents",
    `${launchAgentLabel}.plist`,
  );

const kickstartIfPlistExists = async (
  launchAgentLabel: string,
): Promise<boolean> => {
  if (!fs.existsSync(resolveWakeLaunchAgentPlistPath(launchAgentLabel))) {
    return false;
  }

  const result = await kickstartAgentWitchLaunchAgent(launchAgentLabel);
  return result.ok;
};

/**
 * When wake-port.json exists but the local wake HTTP server is down, kickstart
 * the client (and legacy wake LaunchAgent when present) so browser revive paths work.
 */
export const ensureAgentWitchCoupledWakeClientHealth = async (
  installDir: string = resolveAgentWitchInstallDir(),
): Promise<AgentWitchCoupledWakeClientHealthResult> => {
  const wakePortFileExists = fs.existsSync(
    resolveAgentWitchWakePortFilePath(installDir),
  );
  const hollowInstall = !fs.existsSync(
    resolveAgentWitchAppBundlePath(installDir),
  );

  if (!wakePortFileExists) {
    return {
      ok: true,
      wakePortFileExists: false,
      wakeReachable: false,
      hollowInstall,
      kickstartedLabels: [],
    };
  }

  if (hollowInstall) {
    return {
      ok: false,
      wakePortFileExists: true,
      wakeReachable: false,
      hollowInstall: true,
      kickstartedLabels: [],
    };
  }

  const wakePort = readAgentWitchWakePortFromFile(installDir);
  if (wakePort === null) {
    return {
      ok: false,
      wakePortFileExists: true,
      wakeReachable: false,
      hollowInstall: false,
      kickstartedLabels: [],
    };
  }

  const initiallyReachable = await isAgentWitchWakeHttpReachable(wakePort);
  if (initiallyReachable) {
    return {
      ok: true,
      wakePortFileExists: true,
      wakeReachable: true,
      hollowInstall: false,
      kickstartedLabels: [],
    };
  }

  const kickstartedLabels: string[] = [];
  const wakeLaunchAgentLabel = `${resolveAgentWitchLaunchAgentPrefix(installDir)}-wake`;

  if (await kickstartIfPlistExists(wakeLaunchAgentLabel)) {
    kickstartedLabels.push(wakeLaunchAgentLabel);
  }

  for (const target of listAgentWitchLaunchTargets(installDir)) {
    const kicked = await kickstartAgentWitchLaunchAgent(
      target.launchAgentLabel,
    );
    if (kicked.ok) {
      kickstartedLabels.push(target.launchAgentLabel);
    }
  }

  const wakeReachable = await isAgentWitchWakeHttpReachable(wakePort);

  return {
    ok: wakeReachable || kickstartedLabels.length > 0,
    wakePortFileExists: true,
    wakeReachable,
    hollowInstall: false,
    kickstartedLabels,
  };
};
