import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { AGENT_WITCH_MACHINE_LEASE_TTL_MS } from "./agentWitchInProcessServices.constants";
import { isProcessAlive } from "./isProcessAlive";

export interface AgentWitchMachineLease {
  readonly hostname: string;
  readonly macOsUsername: string;
  readonly pid: number;
  readonly claimedAt: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchMachineLeasePath = (
  hostname: string = os.hostname(),
): string =>
  path.join(
    os.tmpdir(),
    `com.agent-witch.${hostname.trim().toLowerCase()}.lease.json`,
  );

const readMachineLease = (leasePath: string): AgentWitchMachineLease | null => {
  if (!fs.existsSync(leasePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(leasePath, "utf8"));
    if (
      !isRecord(parsed) ||
      typeof parsed.hostname !== "string" ||
      typeof parsed.macOsUsername !== "string" ||
      typeof parsed.pid !== "number" ||
      typeof parsed.claimedAt !== "string"
    ) {
      return null;
    }

    return {
      hostname: parsed.hostname,
      macOsUsername: parsed.macOsUsername,
      pid: parsed.pid,
      claimedAt: parsed.claimedAt,
    };
  } catch {
    return null;
  }
};

const isLeaseFresh = (lease: AgentWitchMachineLease): boolean => {
  const claimedAtMs = Date.parse(lease.claimedAt);
  if (Number.isNaN(claimedAtMs)) {
    return false;
  }

  return Date.now() - claimedAtMs <= AGENT_WITCH_MACHINE_LEASE_TTL_MS;
};

const writeLease = (leasePath: string, lease: AgentWitchMachineLease): void => {
  fs.writeFileSync(leasePath, `${JSON.stringify(lease)}\n`, "utf8");
};

/**
 * One Agent Witch bridge process per macOS user on this host.
 * Rejects another live PID whether that owner is the same user or another.
 */
export const claimAgentWitchMachineLease = (input?: {
  readonly leasePath?: string;
  readonly platform?: NodeJS.Platform;
}): { readonly ok: boolean; readonly reason?: "held_by_other_process" } => {
  const platform = input?.platform ?? process.platform;
  if (platform !== "darwin") {
    return { ok: true };
  }

  const leasePath = input?.leasePath ?? resolveAgentWitchMachineLeasePath();
  const existing = readMachineLease(leasePath);

  if (
    existing !== null &&
    existing.pid !== process.pid &&
    isProcessAlive(existing.pid) &&
    isLeaseFresh(existing)
  ) {
    return { ok: false, reason: "held_by_other_process" };
  }

  const lease: AgentWitchMachineLease = {
    hostname: os.hostname(),
    macOsUsername: os.userInfo().username,
    pid: process.pid,
    claimedAt: new Date().toISOString(),
  };

  writeLease(leasePath, lease);
  return { ok: true };
};

/** Refresh claimedAt while we own the lease; exit callers if ownership is lost. */
export const renewAgentWitchMachineLease = (input?: {
  readonly leasePath?: string;
  readonly platform?: NodeJS.Platform;
}): { readonly ok: boolean } => {
  const platform = input?.platform ?? process.platform;
  if (platform !== "darwin") {
    return { ok: true };
  }

  const leasePath = input?.leasePath ?? resolveAgentWitchMachineLeasePath();
  const existing = readMachineLease(leasePath);

  if (
    existing !== null &&
    existing.pid !== process.pid &&
    isProcessAlive(existing.pid) &&
    isLeaseFresh(existing)
  ) {
    return { ok: false };
  }

  writeLease(leasePath, {
    hostname: os.hostname(),
    macOsUsername: os.userInfo().username,
    pid: process.pid,
    claimedAt: new Date().toISOString(),
  });
  return { ok: true };
};

export const releaseAgentWitchMachineLease = (input?: {
  readonly leasePath?: string;
  readonly platform?: NodeJS.Platform;
}): void => {
  const platform = input?.platform ?? process.platform;
  if (platform !== "darwin") {
    return;
  }

  const leasePath = input?.leasePath ?? resolveAgentWitchMachineLeasePath();
  const existing = readMachineLease(leasePath);
  if (existing?.pid === process.pid && fs.existsSync(leasePath)) {
    fs.unlinkSync(leasePath);
  }
};
