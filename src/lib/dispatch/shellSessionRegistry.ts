import { randomUUID } from "node:crypto";

import type ShellSessionRecord from "@/lib/dispatch/types/ShellSessionRecord.type";

const sessions = new Map<string, ShellSessionRecord>();
const byDeviceKey = new Map<string, string>();

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
  const existingId = byDeviceKey.get(key);
  if (existingId !== undefined) {
    sessions.delete(existingId);
  }

  const record: ShellSessionRecord = {
    shellSessionId,
    ownerUserId: input.ownerUserId,
    deviceId: input.deviceId,
    activeRunId: input.activeRunId ?? null,
    mode: input.mode,
    createdAt: Date.now(),
  };
  sessions.set(shellSessionId, record);
  byDeviceKey.set(key, shellSessionId);
  return record;
};

export const getShellSession = (
  shellSessionId: string,
): ShellSessionRecord | undefined => sessions.get(shellSessionId);

export const getShellSessionByDevice = (
  ownerUserId: string,
  deviceId: string | null,
  mode: "interactive" | "agent" = "interactive",
): ShellSessionRecord | undefined => {
  const id = byDeviceKey.get(deviceKey(ownerUserId, deviceId, mode));
  return id === undefined ? undefined : sessions.get(id);
};

export const linkShellSessionRun = (
  shellSessionId: string,
  activeRunId: string | null,
): ShellSessionRecord | undefined => {
  const current = sessions.get(shellSessionId);
  if (current === undefined) {
    return undefined;
  }
  const next: ShellSessionRecord = { ...current, activeRunId };
  sessions.set(shellSessionId, next);
  return next;
};

export const removeShellSession = (shellSessionId: string): void => {
  const current = sessions.get(shellSessionId);
  if (current === undefined) {
    return;
  }
  sessions.delete(shellSessionId);
  const key = deviceKey(current.ownerUserId, current.deviceId, current.mode);
  if (byDeviceKey.get(key) === shellSessionId) {
    byDeviceKey.delete(key);
  }
};

export const clearShellSessionsForTests = (): void => {
  sessions.clear();
  byDeviceKey.clear();
};
