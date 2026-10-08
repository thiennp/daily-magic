import fs from "node:fs";
import path from "node:path";

import { readAgentWitchHostLocalAppAccountsDiscovery } from "../apps/live/features/local-server/internal/core/agentWitchHostLocalAppAccountsDiscovery";
import { listAgentWitchLocalAppHealthCandidatePorts } from "../apps/live/features/local-server/internal/core/listAgentWitchLocalAppHealthCandidatePorts";
import { readAgentWitchLocalAppPortFile } from "../apps/live/features/local-server/internal/core/resolveAgentWitchLocalAppListenPort";
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
  /** Port that answered `/health` (null when none did). */
  readonly reachablePort: number | null;
}

export interface AgentWitchCoupledLiveAppHealthOptions {
  /** AWL-ISO-1 account host: probe and kickstart only this account. */
  readonly accountEmail?: string | null;
}

/** DF-030: ports for this install (saved listen port → range → legacy 43347). */
export const resolveAgentWitchLiveAppHealthPorts = (
  installDir: string,
  options: AgentWitchCoupledLiveAppHealthOptions = {},
): readonly number[] => {
  const accountEmail = options.accountEmail?.trim().toLowerCase() ?? "";
  if (accountEmail.length === 0) {
    return listAgentWitchLocalAppHealthCandidatePorts(
      path.join(installDir, "profiles"),
    );
  }
  const row = readAgentWitchHostLocalAppAccountsDiscovery(installDir).find(
    (entry) => entry.email.toLowerCase() === accountEmail,
  );
  if (row !== undefined) {
    return [row.port];
  }
  const legacyPort = readAgentWitchLocalAppPortFile(
    path.join(installDir, "profiles", accountEmail),
  );
  return legacyPort === null ? [] : [legacyPort];
};

const isOwnHealthBody = async (response: Response): Promise<boolean> => {
  try {
    const body: unknown = await response.json();
    if (typeof body !== "object" || body === null) {
      return true;
    }
    const osUid = (body as { osUid?: unknown }).osUid;
    // Another macOS user's AWL may sit on the same range — never count it as ours.
    return (
      typeof osUid !== "number" ||
      typeof process.getuid !== "function" ||
      osUid === process.getuid()
    );
  } catch {
    return true;
  }
};

/** First port in `ports` whose `/health` answers OK for this OS user, else null. */
export const findAgentWitchLiveAppReachablePort = async (
  ports: readonly number[],
  timeoutMs: number = 1500,
): Promise<number | null> => {
  for (const port of ports) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`, {
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (response.ok && (await isOwnHealthBody(response))) {
        return port;
      }
    } catch {
      // Not listening on this port — try the next candidate.
    }
  }
  return null;
};

export const isAgentWitchLiveAppHttpReachable = async (
  timeoutMs: number = 1500,
  installDir: string = resolveAgentWitchInstallDir(),
): Promise<boolean> =>
  (await findAgentWitchLiveAppReachablePort(
    resolveAgentWitchLiveAppHealthPorts(installDir),
    timeoutMs,
  )) !== null;

/**
 * When AWL is down but the install bundle exists, kickstart AgentWitch
 * LaunchAgents so the in-process or coupled runtime brings Live back.
 * DF-030: probes the discovered H6 port (local-app-port.json / range), not only
 * legacy 43347 — otherwise the 60 s in-process watchdog kickstart -k'd a
 * healthy server every minute.
 */
export const ensureAgentWitchCoupledLiveAppHealth = async (
  installDir: string = resolveAgentWitchInstallDir(),
  options: AgentWitchCoupledLiveAppHealthOptions = {},
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
      reachablePort: null,
    };
  }

  const initialPort = await findAgentWitchLiveAppReachablePort(
    resolveAgentWitchLiveAppHealthPorts(installDir, options),
  );
  if (initialPort !== null) {
    return {
      ok: true,
      liveReachable: true,
      hollowInstall: false,
      kickstartedLabels: [],
      reachablePort: initialPort,
    };
  }

  const kickstartedLabels: string[] = [];
  for (const target of listAgentWitchLaunchTargets(installDir, {
    onlyAccountEmail: options.accountEmail ?? null,
  })) {
    const kicked = await kickstartAgentWitchLaunchAgent(
      target.launchAgentLabel,
    );
    if (kicked.ok) {
      kickstartedLabels.push(target.launchAgentLabel);
    }
  }

  // Re-read port files: a restarted server may have picked another range port.
  const reachablePort = await findAgentWitchLiveAppReachablePort(
    resolveAgentWitchLiveAppHealthPorts(installDir, options),
  );

  return {
    ok: reachablePort !== null || kickstartedLabels.length > 0,
    liveReachable: reachablePort !== null,
    hollowInstall: false,
    kickstartedLabels,
    reachablePort,
  };
};
