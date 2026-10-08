import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_HOST_ACCOUNT_ENV,
  resolveAgentWitchAppBundlePath,
} from "@agent-witch/install-layout";
import {
  AWI_BUNDLED_COMMAND_DIR,
  type AgentWitchHostServiceAccount,
  type AgentWitchHostServicesFile,
} from "@agent-witch/install-layout/types";
import { readAgentWitchHostLocalAppAccountsDiscovery } from "@agent-witch/live-local-server";

import { isProcessAlive } from "../legacyScriptDeps";

/** Do not respawn one account more often than this (setsid / no service manager). */
export const AGENT_WITCH_ACCOUNT_HOST_RESPAWN_MS = 60_000;

export interface SuperviseAgentWitchAccountHostsDeps {
  readonly readDiscovery: typeof readAgentWitchHostLocalAppAccountsDiscovery;
  readonly isProcessAlive: (pid: number) => boolean;
  readonly spawnHost: (input: {
    readonly installDir: string;
    readonly account: AgentWitchHostServiceAccount;
  }) => void;
  readonly now: () => number;
}

export const buildAgentWitchAccountHostEnv = (
  account: AgentWitchHostServiceAccount,
  baseEnv: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv => ({
  ...baseEnv,
  [AGENT_WITCH_HOST_ACCOUNT_ENV]: account.email,
  AGENT_WITCH_PROFILE: account.email,
  AGENT_WITCH_WAKE_PORT: String(account.wakePort),
});

/** Detached `setsid run.sh` (Linux) / `run.sh`, else node + bundle, pinned to one account. */
export const spawnAgentWitchAccountHost = (input: {
  readonly installDir: string;
  readonly account: AgentWitchHostServiceAccount;
}): void => {
  const env = buildAgentWitchAccountHostEnv(input.account);
  const runPath = path.join(
    input.installDir,
    AWI_BUNDLED_COMMAND_DIR,
    "run.sh",
  );
  const useRunScript = fs.existsSync(runPath);
  const command = useRunScript
    ? process.platform === "linux"
      ? "setsid"
      : runPath
    : process.execPath;
  const args = useRunScript
    ? process.platform === "linux"
      ? [runPath]
      : []
    : [resolveAgentWitchAppBundlePath(input.installDir)];
  const child = spawn(command, args, {
    cwd: input.installDir,
    detached: true,
    stdio: "ignore",
    env,
  });
  child.on("error", (error) => {
    console.error(
      `[agent-witch] Host launcher: could not start host for ${input.account.email}: ${error.message}`,
    );
  });
  child.unref();
};

const defaultDeps: SuperviseAgentWitchAccountHostsDeps = {
  readDiscovery: readAgentWitchHostLocalAppAccountsDiscovery,
  isProcessAlive,
  spawnHost: spawnAgentWitchAccountHost,
  now: () => Date.now(),
};

/**
 * One supervise tick when no service manager runs the account hosts: spawn every
 * account without a live discovery row (rate-limited per account). Returns spawned emails.
 */
export const superviseAgentWitchAccountHostsOnce = (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly lastSpawnAtByEmail: Map<string, number>;
  readonly selfPid?: number;
  readonly deps?: Partial<SuperviseAgentWitchAccountHostsDeps>;
}): readonly string[] => {
  const deps = { ...defaultDeps, ...input.deps };
  const selfPid = input.selfPid ?? process.pid;
  const rows = deps.readDiscovery(input.installDir);
  const nowMs = deps.now();
  const spawned: string[] = [];
  for (const account of input.services.accounts) {
    const live = rows.some(
      (row) =>
        row.email.toLowerCase() === account.email &&
        row.pid !== selfPid &&
        deps.isProcessAlive(row.pid),
    );
    const lastSpawnAt = input.lastSpawnAtByEmail.get(account.email);
    if (
      live ||
      (lastSpawnAt !== undefined &&
        nowMs - lastSpawnAt < AGENT_WITCH_ACCOUNT_HOST_RESPAWN_MS)
    ) {
      continue;
    }
    input.lastSpawnAtByEmail.set(account.email, nowMs);
    deps.spawnHost({ installDir: input.installDir, account });
    spawned.push(account.email);
  }
  return spawned;
};
