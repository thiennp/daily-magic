import type { AgentRunReportHistoryEntry } from "@/lib/dispatch/agentRunReportHistory.type";

export const isAgentRunReportHistoryEntry = (
  entry: unknown,
): entry is AgentRunReportHistoryEntry =>
  typeof entry === "object" &&
  entry !== null &&
  typeof (entry as AgentRunReportHistoryEntry).at === "string" &&
  typeof (entry as AgentRunReportHistoryEntry).status === "string" &&
  typeof (entry as AgentRunReportHistoryEntry).summary === "string";
