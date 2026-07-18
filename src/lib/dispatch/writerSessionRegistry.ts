import { randomUUID } from "node:crypto";

import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

export interface WriterSessionRecord {
  readonly writerSessionId: string;
  readonly ownerUserId: string;
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly dashboardClientId: string;
  readonly startedAt: number;
}

/**
 * Process-wide so Next.js API routes and WebSocket handlers share sessions.
 */
const writerSessionGlobal = globalThis as typeof globalThis & {
  __dailyMagicWriterSessions?: Map<string, WriterSessionRecord>;
};

const sessions = (): Map<string, WriterSessionRecord> => {
  if (writerSessionGlobal.__dailyMagicWriterSessions === undefined) {
    writerSessionGlobal.__dailyMagicWriterSessions = new Map();
  }
  return writerSessionGlobal.__dailyMagicWriterSessions;
};

export const createWriterSession = (input: {
  readonly ownerUserId: string;
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly dashboardClientId: string;
}): WriterSessionRecord => {
  const writerSessionId = randomUUID();
  const record: WriterSessionRecord = {
    writerSessionId,
    ownerUserId: input.ownerUserId,
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    writerAgent: input.writerAgent,
    dashboardClientId: input.dashboardClientId,
    startedAt: Date.now(),
  };
  sessions().set(writerSessionId, record);
  return record;
};

export const getWriterSession = (
  writerSessionId: string,
): WriterSessionRecord | undefined => sessions().get(writerSessionId);

export const removeWriterSession = (writerSessionId: string): void => {
  sessions().delete(writerSessionId);
};

export const readWriterSessionId = (
  payload: Record<string, unknown> | undefined,
): string =>
  typeof payload?.writerSessionId === "string" ? payload.writerSessionId : "";

export const authorizeWriterSessionPublisher = (
  sender: AgentWitchHubClient | undefined,
  writerSessionId: string,
): WriterSessionRecord | undefined => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return undefined;
  }

  const session = sessions().get(writerSessionId);
  if (session === undefined) {
    return undefined;
  }

  if (session.executorUserId !== sender.userId) {
    return undefined;
  }

  if (
    session.deviceId !== null &&
    sender.deviceId !== undefined &&
    sender.deviceId !== session.deviceId
  ) {
    return undefined;
  }

  return session;
};

export const clearWriterSessionsForTests = (): void => {
  sessions().clear();
};
