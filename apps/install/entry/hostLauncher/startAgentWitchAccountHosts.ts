import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";
import {
  resolveAgentWitchSystemdUserUnitDir,
  startAgentWitchAccountSystemdUnits,
} from "@agent-witch/install-linux-launch";
import { startAgentWitchAccountLaunchAgents } from "@agent-witch/install-macos-launch";

import { isAgentWitchProcessRunningUnderSystemdUserService } from "../legacyScriptDeps";

import { superviseAgentWitchAccountHostsOnce } from "./superviseAgentWitchAccountHosts";

export type AgentWitchAccountHostsMode = "launchd" | "systemd" | "spawn";

export interface AgentWitchAccountHostStartResult {
  readonly email: string;
  readonly service: string;
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface StartAgentWitchAccountHostsDeps {
  readonly startLaunchAgents: typeof startAgentWitchAccountLaunchAgents;
  readonly startSystemdUnits: typeof startAgentWitchAccountSystemdUnits;
  readonly superviseOnce: typeof superviseAgentWitchAccountHostsOnce;
  readonly isSystemdUserAvailable: (input: {
    readonly homeDir: string;
    readonly services: AgentWitchHostServicesFile;
  }) => boolean;
}

/** systemd runs us, or every account unit is already installed. */
export const isAgentWitchSystemdUserAvailableForAccounts = (input: {
  readonly homeDir: string;
  readonly services: AgentWitchHostServicesFile;
}): boolean =>
  isAgentWitchProcessRunningUnderSystemdUserService() ||
  input.services.accounts.every((account) =>
    fs.existsSync(
      path.join(
        resolveAgentWitchSystemdUserUnitDir(input.homeDir),
        account.systemdUnitName,
      ),
    ),
  );

export const resolveAgentWitchAccountHostsMode = (input: {
  readonly platform: NodeJS.Platform;
  readonly systemdAvailable: boolean;
}): AgentWitchAccountHostsMode => {
  if (input.platform === "darwin") {
    return "launchd";
  }
  return input.platform === "linux" && input.systemdAvailable
    ? "systemd"
    : "spawn";
};

const defaultDeps: StartAgentWitchAccountHostsDeps = {
  startLaunchAgents: startAgentWitchAccountLaunchAgents,
  startSystemdUnits: startAgentWitchAccountSystemdUnits,
  superviseOnce: superviseAgentWitchAccountHostsOnce,
  isSystemdUserAvailable: isAgentWitchSystemdUserAvailableForAccounts,
};

/** Starts (never restarts) every account host with the platform's service manager. */
export const startAgentWitchAccountHosts = async (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly homeDir?: string;
  readonly platform?: NodeJS.Platform;
  readonly lastSpawnAtByEmail?: Map<string, number>;
  readonly deps?: Partial<StartAgentWitchAccountHostsDeps>;
}): Promise<{
  readonly mode: AgentWitchAccountHostsMode;
  readonly results: readonly AgentWitchAccountHostStartResult[];
}> => {
  const deps = { ...defaultDeps, ...input.deps };
  const homeDir = input.homeDir ?? os.homedir();
  const mode = resolveAgentWitchAccountHostsMode({
    platform: input.platform ?? process.platform,
    systemdAvailable: deps.isSystemdUserAvailable({
      homeDir,
      services: input.services,
    }),
  });
  if (mode === "launchd") {
    const results = await deps.startLaunchAgents({
      installDir: input.installDir,
      services: input.services,
      homeDir,
    });
    return { mode, results };
  }
  if (mode === "systemd") {
    const results = await deps.startSystemdUnits({
      installDir: input.installDir,
      services: input.services,
      homeDir,
    });
    return { mode, results };
  }
  const spawned = deps.superviseOnce({
    installDir: input.installDir,
    services: input.services,
    lastSpawnAtByEmail: input.lastSpawnAtByEmail ?? new Map<string, number>(),
  });
  const results = input.services.accounts.map((account) => ({
    email: account.email,
    service: spawned.includes(account.email) ? "spawned" : "already running",
    ok: true,
  }));
  return { mode, results };
};
