import type { AgentWitchHostServiceAccount } from "@agent-witch/install-layout/types";
import { readAgentWitchHostLocalAppAccountsDiscovery } from "@agent-witch/live-local-server";

import { isProcessAlive } from "../legacyScriptDeps";

export interface AgentWitchAccountHealth {
  readonly ok: boolean;
  readonly profileEmail?: string;
}

export interface VerifyAgentWitchAccountHostsUpDeps {
  readonly readDiscovery: typeof readAgentWitchHostLocalAppAccountsDiscovery;
  readonly isProcessAlive: (pid: number) => boolean;
  readonly fetchHealth: (port: number) => Promise<AgentWitchAccountHealth>;
  readonly sleep: (ms: number) => Promise<void>;
  readonly now: () => number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const fetchAgentWitchAccountHealth = async (
  port: number,
): Promise<AgentWitchAccountHealth> => {
  try {
    const response = await fetch(`http://127.0.0.1:${String(port)}/health`, {
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) {
      return { ok: false };
    }
    const body: unknown = await response.json().catch(() => null);
    return isRecord(body) && typeof body.profileEmail === "string"
      ? { ok: true, profileEmail: body.profileEmail }
      : { ok: true };
  } catch {
    return { ok: false };
  }
};

const defaultDeps: VerifyAgentWitchAccountHostsUpDeps = {
  readDiscovery: readAgentWitchHostLocalAppAccountsDiscovery,
  isProcessAlive,
  fetchHealth: fetchAgentWitchAccountHealth,
  sleep: (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    }),
  now: () => Date.now(),
};

/** null when this account's own host process serves its /health, else why not. */
const checkAccountHostUp = async (input: {
  readonly installDir: string;
  readonly account: AgentWitchHostServiceAccount;
  readonly selfPid: number;
  readonly deps: VerifyAgentWitchAccountHostsUpDeps;
}): Promise<string | null> => {
  const email = input.account.email.toLowerCase();
  const row = input.deps
    .readDiscovery(input.installDir)
    .find(
      (entry) =>
        entry.email.toLowerCase() === email &&
        entry.pid !== input.selfPid &&
        input.deps.isProcessAlive(entry.pid),
    );
  if (row === undefined) {
    return `${email}: no live account host in local-app-accounts.json`;
  }
  const health = await input.deps.fetchHealth(row.port);
  if (!health.ok) {
    return `${email}: /health on ${String(row.port)} not ok`;
  }
  if (
    health.profileEmail !== undefined &&
    health.profileEmail.toLowerCase() !== email
  ) {
    return `${email}: port ${String(row.port)} serves ${health.profileEmail}`;
  }
  return null;
};

/** Polls until every account has its own live host answering /health (default 45 s). */
export const verifyAgentWitchAccountHostsUp = async (input: {
  readonly installDir: string;
  readonly accounts: readonly AgentWitchHostServiceAccount[];
  readonly selfPid: number;
  readonly timeoutMs?: number;
  readonly intervalMs?: number;
  readonly deps?: Partial<VerifyAgentWitchAccountHostsUpDeps>;
}): Promise<
  { readonly ok: true } | { readonly ok: false; readonly reason: string }
> => {
  const deps = { ...defaultDeps, ...input.deps };
  const deadline = deps.now() + (input.timeoutMs ?? 45_000);
  const intervalMs = input.intervalMs ?? 1_000;
  for (;;) {
    const reasons = (
      await Promise.all(
        input.accounts.map((account) =>
          checkAccountHostUp({
            installDir: input.installDir,
            account,
            selfPid: input.selfPid,
            deps,
          }),
        ),
      )
    ).filter((reason): reason is string => reason !== null);
    if (reasons.length === 0) {
      return { ok: true };
    }
    if (deps.now() + intervalMs > deadline) {
      return { ok: false, reason: reasons.join("; ") };
    }
    await deps.sleep(intervalMs);
  }
};
