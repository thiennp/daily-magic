import { randomUUID } from "node:crypto";

import type ShellSessionRecord from "@/lib/dispatch/types/ShellSessionRecord.type";

/**
 * Process-wide maps so Next.js API route bundles and `server.ts` WebSocket
 * handlers share sessions. Module-scoped Maps alone create a second empty
 * registry (same dual-bundle issue as {@link getAgentWitchHub}).
 */
const shellSessionGlobal = globalThis as typeof globalThis & {
  __dailyMagicShellSessions?: Map<string, ShellSessionRecord>;
  __dailyMagicShellSessionsByDevice?: Map<string, string>;
};

const sessions = (): Map<string, ShellSessionRecord> => {
  if (shellSessionGlobal.__dailyMagicShellSessions === undefined) {
    shellSessionGlobal.__dailyMagicShellSessions = new Map();
  }
  return shellSessionGlobal.__dailyMagicShellSessions;
};

const byDeviceKey = (): Map<string, string> => {
  if (shellSessionGlobal.__dailyMagicShellSessionsByDevice === undefined) {
    shellSessionGlobal.__dailyMagicShellSessionsByDevice = new Map();
  }
  return shellSessionGlobal.__dailyMagicShellSessionsByDevice;
};

const deviceKey = (
  ownerUserId: string,
  deviceId: string | null,
  mode: "interactive" | "agent",
): string => `${ownerUserId}:${deviceId ?? "default"}:${mode}`;

export const buildShellSubscriptionKey = (shellSessionId: string): string =>
  `shell:${shellSessionId}`;

export const createShellSession = (input: {
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly mode: "interactive" | "agent";
  readonly activeRunId?: string | null;
  readonly shellSessionId?: string;
}): ShellSessionRecord => {
  const shellSessionId = input.shellSessionId ?? randomUUID();
  const key = deviceKey(input.ownerUserId, input.deviceId, input.mode);
  const existingId = byDeviceKey().get(key);
  if (existingId !== undefined) {
    sessions().delete(existingId);
  }

  const record: ShellSessionRecord = {
    shellSessionId,
    ownerUserId: input.ownerUserId,
    deviceId: input.deviceId,
    activeRunId: input.activeRunId ?? null,
    mode: input.mode,
    createdAt: Date.now(),
  };
  sessions().set(shellSessionId, record);
  byDeviceKey().set(key, shellSessionId);
  return record;
};

export const getShellSession = (
  shellSessionId: string,
): ShellSessionRecord | undefined => sessions().get(shellSessionId);

export const getShellSessionByDevice = (
  ownerUserId: string,
  deviceId: string | null,
  mode: "interactive" | "agent" = "interactive",
): ShellSessionRecord | undefined => {
  const id = byDeviceKey().get(deviceKey(ownerUserId, deviceId, mode));
  return id === undefined ? undefined : sessions().get(id);
};

export const linkShellSessionRun = (
  shellSessionId: string,
  activeRunId: string | null,
): ShellSessionRecord | undefined => {
  const current = sessions().get(shellSessionId);
  if (current === undefined) {
    return undefined;
  }
  const next: ShellSessionRecord = { ...current, activeRunId };
  sessions().set(shellSessionId, next);
  return next;
};

export const removeShellSession = (shellSessionId: string): void => {
  const current = sessions().get(shellSessionId);
  if (current === undefined) {
    return;
  }
  sessions().delete(shellSessionId);
  const key = deviceKey(current.ownerUserId, current.deviceId, current.mode);
  if (byDeviceKey().get(key) === shellSessionId) {
    byDeviceKey().delete(key);
  }
};

export const clearShellSessionsForTests = (): void => {
  sessions().clear();
  byDeviceKey().clear();
};
