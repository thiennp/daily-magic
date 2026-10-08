import { execFile } from "node:child_process";
import os from "node:os";
import { promisify } from "node:util";

import type {
  AgentWitchHostServiceAccount,
  AgentWitchHostServicesFile,
} from "@agent-witch/install-layout/types";
import { readAgentWitchHostLocalAppAccountsDiscovery } from "@agent-witch/live-local-server";
import {
  buildHostSideEffectRefusalMessage,
  isHostSideEffectAllowed,
} from "@agent-witch/shared/host-side-effects";

import { isProcessAlive } from "../legacyScriptDeps";

import {
  isAgentWitchSystemdUserAvailableForAccounts,
  resolveAgentWitchAccountHostsMode,
  type AgentWitchAccountHostStartResult,
  type AgentWitchAccountHostsMode,
} from "./startAgentWitchAccountHosts";

const execFileAsync = promisify(execFile);

export interface StopAgentWitchAccountHostsDeps {
  readonly launchctl: (args: readonly string[]) => Promise<void>;
  readonly systemctl: (args: readonly string[]) => Promise<void>;
  readonly readDiscovery: typeof readAgentWitchHostLocalAppAccountsDiscovery;
  readonly isProcessAlive: (pid: number) => boolean;
  readonly kill: (pid: number, signal: NodeJS.Signals) => void;
  readonly isSystemdUserAvailable: typeof isAgentWitchSystemdUserAvailableForAccounts;
}

const defaultDeps: StopAgentWitchAccountHostsDeps = {
  launchctl: async (args) => {
    await execFileAsync("launchctl", [...args]);
  },
  systemctl: async (args) => {
    await execFileAsync("systemctl", ["--user", ...args]);
  },
  readDiscovery: readAgentWitchHostLocalAppAccountsDiscovery,
  isProcessAlive,
  kill: (pid, signal) => {
    process.kill(pid, signal);
  },
  isSystemdUserAvailable: isAgentWitchSystemdUserAvailableForAccounts,
};

const toMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const stopOne = async (input: {
  readonly mode: AgentWitchAccountHostsMode;
  readonly account: AgentWitchHostServiceAccount;
  readonly domain: string;
  readonly disable: boolean;
  readonly pids: readonly number[];
  readonly deps: StopAgentWitchAccountHostsDeps;
}): Promise<AgentWitchAccountHostStartResult> => {
  const { account, deps } = input;
  try {
    if (input.mode === "launchd") {
      await deps.launchctl([
        "bootout",
        `${input.domain}/${account.launchAgentLabel}`,
      ]);
      return {
        email: account.email,
        service: account.launchAgentLabel,
        ok: true,
      };
    }
    if (input.mode === "systemd") {
      await deps.systemctl(
        input.disable
          ? ["disable", "--now", account.systemdUnitName]
          : ["stop", account.systemdUnitName],
      );
      return {
        email: account.email,
        service: account.systemdUnitName,
        ok: true,
      };
    }
    for (const pid of input.pids) {
      deps.kill(pid, "SIGTERM");
    }
    return {
      email: account.email,
      service: `pid ${input.pids.join(",") || "none"}`,
      ok: true,
    };
  } catch (error) {
    return {
      email: account.email,
      service:
        input.mode === "launchd"
          ? account.launchAgentLabel
          : account.systemdUnitName,
      ok: false,
      errorMessage: toMessage(error),
    };
  }
};

/**
 * Stops account hosts with the service manager that runs them (launchd bootout,
 * systemd stop / disable --now, else SIGTERM to their discovery pids). Used when
 * the legacy launcher is stopped (old AWL "Stop" = whole computer) and on rollback.
 */
export const stopAgentWitchAccountHosts = async (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly onlyEmails?: readonly string[];
  readonly disable?: boolean;
  readonly homeDir?: string;
  readonly platform?: NodeJS.Platform;
  readonly uid?: number;
  readonly selfPid?: number;
  readonly deps?: Partial<StopAgentWitchAccountHostsDeps>;
}): Promise<readonly AgentWitchAccountHostStartResult[]> => {
  const deps = { ...defaultDeps, ...input.deps };
  const accounts = input.services.accounts.filter(
    (account) =>
      input.onlyEmails === undefined ||
      input.onlyEmails.includes(account.email),
  );
  if (input.deps === undefined && !isHostSideEffectAllowed()) {
    return accounts.map((account) => ({
      email: account.email,
      service: account.launchAgentLabel,
      ok: false,
      errorMessage: buildHostSideEffectRefusalMessage("stop account hosts"),
    }));
  }
  const homeDir = input.homeDir ?? os.homedir();
  const mode = resolveAgentWitchAccountHostsMode({
    platform: input.platform ?? process.platform,
    systemdAvailable: deps.isSystemdUserAvailable({
      homeDir,
      services: input.services,
    }),
  });
  const domain = `gui/${String(input.uid ?? process.getuid?.() ?? 0)}`;
  const selfPid = input.selfPid ?? process.pid;
  const rows = mode === "spawn" ? deps.readDiscovery(input.installDir) : [];
  const results: AgentWitchAccountHostStartResult[] = [];
  for (const account of accounts) {
    const pids = rows
      .filter(
        (row) =>
          row.email.toLowerCase() === account.email &&
          row.pid !== selfPid &&
          deps.isProcessAlive(row.pid),
      )
      .map((row) => row.pid);
    results.push(
      await stopOne({
        mode,
        account,
        domain,
        disable: input.disable ?? false,
        pids,
        deps,
      }),
    );
  }
  return results;
};
