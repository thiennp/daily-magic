import {
  getAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunReportHistoryEntry } from "@/lib/dispatch/agentRunReportHistory.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isReportHistoryEntry = (
  value: unknown,
): value is AgentRunReportHistoryEntry =>
  isRecord(value) &&
  typeof value.at === "string" &&
  typeof value.status === "string" &&
  typeof value.summary === "string";

const parseReportHistory = (
  value: unknown,
): readonly AgentRunReportHistoryEntry[] | null => {
  if (!Array.isArray(value)) {
    return null;
  }

  const entries = value.filter(isReportHistoryEntry);
  return entries.length > 0 ? entries : null;
};

const reportHistoryEqual = (
  left: readonly AgentRunReportHistoryEntry[] | null | undefined,
  right: readonly AgentRunReportHistoryEntry[] | null | undefined,
): boolean => JSON.stringify(left ?? null) === JSON.stringify(right ?? null);

/** Patch cached RUNNING runs from lightweight run.heartbeat messages. */
export const syncAgentRunHeartbeatLocalCacheFromSocket = (
  raw: string,
): boolean => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !isRecord(parsed) ||
      parsed.type !== AGENT_WITCH_MESSAGE_TYPES.RUN_HEARTBEAT ||
      !isRecord(parsed.payload)
    ) {
      return false;
    }

    const agentRunId =
      typeof parsed.payload.agentRunId === "string"
        ? parsed.payload.agentRunId
        : "";
    if (agentRunId.length === 0) {
      return false;
    }

    const existing = getAgentRunLocalCache(agentRunId);
    if (existing === null || existing.status !== AgentRunStatus.RUNNING) {
      return false;
    }

    const at =
      typeof parsed.payload.at === "string" && parsed.payload.at.length > 0
        ? parsed.payload.at
        : new Date().toISOString();

    const reportStatus =
      typeof parsed.payload.reportStatus === "string"
        ? parsed.payload.reportStatus
        : (existing.reportStatus ?? null);
    const reportSummary =
      typeof parsed.payload.reportSummary === "string"
        ? parsed.payload.reportSummary
        : (existing.reportSummary ?? null);
    const reportHistory =
      parseReportHistory(parsed.payload.reportHistory) ??
      existing.reportHistory ??
      null;

    if (
      existing.lastRunHeartbeatAt === at &&
      existing.reportStatus === reportStatus &&
      existing.reportSummary === reportSummary &&
      reportHistoryEqual(existing.reportHistory, reportHistory)
    ) {
      return false;
    }

    upsertAgentRunLocalCache({
      ...existing,
      lastRunHeartbeatAt: at,
      updatedAt: at,
      reportStatus,
      reportSummary,
      reportHistory,
    });
    return true;
  } catch {
    return false;
  }
};
