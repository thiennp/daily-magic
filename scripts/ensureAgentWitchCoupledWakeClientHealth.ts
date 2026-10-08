import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  readAgentWitchHostServices,
  resolveAgentWitchAccountProfileDir,
} from "@agent-witch/install-layout";
import type { AgentWitchHostServiceAccount } from "@agent-witch/install-layout/types";

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
 * AWL-ISO-1: with host-services.json each account host owns its own wake port;
 * kickstart only the account whose wake server is down (never every account).
 */
const ensureAgentWitchAccountWakeHealth = async (
  installDir: string,
  accounts: readonly AgentWitchHostServiceAccount[],
): Promise<AgentWitchCoupledWakeClientHealthResult> => {
  const kickstartedLabels: string[] = [];
  const downAfterKick: string[] = [];
  for (const account of accounts) {
    const wakePort =
      readAgentWitchWakePortFromFile(
        resolveAgentWitchAccountProfileDir(installDir, account.email),
      ) ?? account.wakePort;
    if (await isAgentWitchWakeHttpReachable(wakePort)) {
      continue;
    }
    const kicked = await kickstartAgentWitchLaunchAgent(
      account.launchAgentLabel,
    );
    if (kicked.ok) {
      kickstartedLabels.push(account.launchAgentLabel);
    } else {
      downAfterKick.push(account.email);
    }
  }
  return {
    ok: downAfterKick.length === 0,
    wakePortFileExists: true,
    wakeReachable: kickstartedLabels.length === 0 && downAfterKick.length === 0,
    hollowInstall: false,
    kickstartedLabels,
  };
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

  const hostServices = hollowInstall
    ? null
    : readAgentWitchHostServices(installDir);
  if (hostServices !== null) {
    return ensureAgentWitchAccountWakeHealth(installDir, hostServices.accounts);
  }

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
