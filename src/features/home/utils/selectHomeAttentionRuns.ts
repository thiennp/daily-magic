import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { isAgentRunSweptStale } from "@/lib/dispatch/isAgentRunStalled";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const HOME_ATTENTION_FAILED_WINDOW_MS = 24 * 60 * 60 * 1000;
export const HOME_ATTENTION_MAX_ROWS = 5;

/**
 * Design "Needs your attention": runs waiting for approval plus runs that
 * failed in the last 24h, newest first. Source is the browser run cache.
 */
const selectRecentAttentionRuns = (
  runs: readonly AgentRunRecord[],
  nowMs: number,
): readonly AgentRunRecord[] =>
  runs
    .filter((run) => {
      if (run.status === AgentRunStatus.PENDING_APPROVAL) {
        return true;
      }

      // 4139ca18: a run the user stopped is Stopped, not a failure to look at.
      return (
        run.status === AgentRunStatus.FAILED &&
        !isAgentRunUserStopped(run.resultOutput, run.resultExitCode) &&
        run.reportStatus !== "stopped" &&
        nowMs - Date.parse(run.updatedAt) <= HOME_ATTENTION_FAILED_WINDOW_MS
      );
    })
    .toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt));

/** f5881faa: Stalled runs always make the cut; newer failures fill the rest. */
const selectHomeAttentionRuns = (
  runs: readonly AgentRunRecord[],
  nowMs: number,
): readonly AgentRunRecord[] => {
  const recent = selectRecentAttentionRuns(runs, nowMs);
  const kept = new Set(
    [
      ...recent.filter((run) => isAgentRunSweptStale(run)),
      ...recent.filter((run) => !isAgentRunSweptStale(run)),
    ].slice(0, HOME_ATTENTION_MAX_ROWS),
  );
  return recent.filter((run) => kept.has(run));
};

export default selectHomeAttentionRuns;
