import { PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS } from "@/features/projects/sync/projectSync.types";
import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { mapRunStatusToProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import { formatAgentRunTerminalReasonLine } from "@/lib/dispatch/agentRunLostConnectionReasons.constant";
import { formatAgentRunStalledReason } from "@/features/projects/tasks/utils/formatAgentRunStalledReason";
import { isAgentRunStalled } from "@/lib/dispatch/isAgentRunStalled";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";
import { resolveAgentRunTitleSummary } from "@/lib/dispatch/resolveAgentRunTitleSummary";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const thinTitle = (raw: string): string =>
  raw.trim().replace(/\s+/g, " ").slice(0, PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS);

const firstLine = (value: string | null | undefined): string =>
  (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0) ?? "";

/**
 * Map Neon agent_runs (Reports feed) → Tasks list meta (DF-027 display status:
 * denied / expired keep their own label instead of folding into "queued").
 * Branch/worktree not on agent_runs yet → null (hide tags until f61 wires them).
 */
export const mapAgentRunToProjectTaskMeta = (
  run: EnrichedAgentRunRecord,
  projectId: string,
): ProjectTaskMeta => {
  const assistantName =
    run.writerAgent?.trim() ||
    run.executorName?.trim() ||
    (run.executorEmail.includes("@") ? run.executorEmail : null);
  const runStatus = mapRunStatusToProjectTaskDisplayStatus(run.status);
  // S9: same "Stopped" predicate as the live floater.
  const status = isAgentRunStalled(run, Date.now())
    ? "stalled"
    : runStatus === "failed" &&
        isAgentRunUserStopped(run.resultOutput, run.resultExitCode)
      ? "stopped"
      : runStatus;
  // f4bf6a0c: the title is always the user's ask; a Done summary rides below.
  const doneSummary = firstLine(resolveAgentRunTitleSummary(run));
  const title =
    thinTitle(firstLine(run.prompt)) || thinTitle(doneSummary) || "Task";
  const summaryLine =
    doneSummary.length > 0 && thinTitle(doneSummary) !== title
      ? doneSummary
      : null;
  // S4/S10: the failure reason rides next to the title, never replacing it.
  const denialReason = run.denialReason?.trim() ?? "";
  const statusReason =
    status === "stalled"
      ? formatAgentRunStalledReason(run)
      : (status === "failed" || status === "denied") && denialReason.length > 0
        ? formatAgentRunTerminalReasonLine(denialReason)
        : null;

  return {
    id: run.id,
    projectId,
    assistantMembershipId: null,
    title,
    status,
    statusReason,
    summaryLine,
    createdAt: run.createdAt,
    updatedAt: run.updatedAt,
    startedAt: run.startedAt,
    endedAt: run.completedAt,
    version: 1,
    sessionId: run.id,
    agentRunId: run.id,
    branch: null,
    worktree: null,
    localClaimedAt: null,
    assistantName,
    resultOutput: run.resultOutput,
    reportSummary: run.reportSummary ?? null,
    writerAgent: run.writerAgent ?? null,
    denialReason: denialReason.length > 0 ? denialReason : null,
  };
};
