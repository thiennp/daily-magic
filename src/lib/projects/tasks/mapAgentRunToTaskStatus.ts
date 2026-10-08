import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { isAgentRunUserStoppedExitCode } from "@/lib/dispatch/agentRunUserStoppedExitCode.constant";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

export type TaskStatusFromRun = {
  readonly status: ProjectTaskStatus;
  /** Why the task is blocked (failure reason); null otherwise. */
  readonly note: string | null;
};

const NOTE_MAX_CHARS = 200;

const toNote = (reason: string | null | undefined, fallback: string): string =>
  (reason?.trim() || fallback).slice(0, NOTE_MAX_CHARS);

/** Denial text, else the last meaningful output line (marker lines skipped). */
export const pickRunFailureReason = (
  denialReason: string | null | undefined,
  output: string | null | undefined,
): string | null => {
  if (denialReason?.trim()) return denialReason.trim();
  const lines = (output ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 &&
        !line.startsWith("[[") &&
        !line.startsWith("agentRunWriterExecution"),
    );
  return lines.at(-1) ?? null;
};

/**
 * Run status -> task status: running = In progress, completed = Done,
 * failed / denied / expired = Blocked (+ reason), user-stopped = To do.
 * Other run states leave the task alone (null).
 */
export const mapAgentRunToTaskStatus = (input: {
  readonly status: AgentRunStatusValue;
  readonly exitCode?: number | null;
  readonly reason?: string | null;
}): TaskStatusFromRun | null => {
  switch (input.status) {
    case AgentRunStatus.RUNNING:
      return { status: "in_progress", note: null };
    case AgentRunStatus.COMPLETED:
      return { status: "done", note: null };
    case AgentRunStatus.DENIED:
      return { status: "blocked", note: toNote(input.reason, "Run denied.") };
    case AgentRunStatus.EXPIRED:
      return {
        status: "blocked",
        note: toNote(input.reason, "Run timed out."),
      };
    case AgentRunStatus.FAILED:
      return isAgentRunUserStoppedExitCode(input.exitCode ?? null)
        ? { status: "queued", note: null }
        : { status: "blocked", note: toNote(input.reason, "Run failed.") };
    default:
      return null;
  }
};
