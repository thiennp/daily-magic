import fs from "node:fs";
import path from "node:path";

import { isProcessAlive } from "../legacyScriptDeps";

export const AGENT_WITCH_HOST_SERVICES_MIGRATION_LOCK_FILE_NAME =
  "host-services-migration.lock";
export const AGENT_WITCH_HOST_SERVICES_MIGRATION_LOCK_STALE_MS = 10 * 60_000;

export interface AgentWitchHostServicesMigrationLockDeps {
  readonly isProcessAlive: (pid: number) => boolean;
  readonly now: () => number;
  readonly pid: number;
}

export interface AgentWitchHostServicesMigrationLock {
  readonly release: () => void;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readHolder = (
  lockPath: string,
): { readonly pid: number; readonly at: number } | null => {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(lockPath, "utf8"));
    return isRecord(parsed) &&
      typeof parsed.pid === "number" &&
      typeof parsed.at === "number"
      ? { pid: parsed.pid, at: parsed.at }
      : null;
  } catch {
    return null;
  }
};

const tryCreate = (lockPath: string, payload: string): boolean => {
  try {
    fs.writeFileSync(lockPath, payload, { flag: "wx" });
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      return false;
    }
    throw error;
  }
};

/** Exclusive lock; a dead or >10 min old holder is taken over. null = busy. */
export const acquireAgentWitchHostServicesMigrationLock = (
  installDir: string,
  deps: Partial<AgentWitchHostServicesMigrationLockDeps> = {},
): AgentWitchHostServicesMigrationLock | null => {
  const isAlive = deps.isProcessAlive ?? isProcessAlive;
  const nowMs = (deps.now ?? Date.now)();
  const pid = deps.pid ?? process.pid;
  const lockPath = path.join(
    installDir,
    AGENT_WITCH_HOST_SERVICES_MIGRATION_LOCK_FILE_NAME,
  );
  const payload = JSON.stringify({ pid, at: nowMs });
  const release = (): void => {
    if (readHolder(lockPath)?.pid === pid) {
      fs.rmSync(lockPath, { force: true });
    }
  };
  fs.mkdirSync(installDir, { recursive: true });
  if (tryCreate(lockPath, payload)) {
    return { release };
  }
  const holder = readHolder(lockPath);
  const stale =
    holder === null ||
    !isAlive(holder.pid) ||
    nowMs - holder.at > AGENT_WITCH_HOST_SERVICES_MIGRATION_LOCK_STALE_MS;
  if (!stale) {
    return null;
  }
  fs.rmSync(lockPath, { force: true });
  return tryCreate(lockPath, payload) ? { release } : null;
};
