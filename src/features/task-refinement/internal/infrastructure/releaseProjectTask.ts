import type { ReleaseProjectTaskResult } from "@/features/task-refinement/internal/infrastructure/releaseProjectTask.type";
import { decideReleaseOutcome } from "@/features/task-refinement/internal/core/decideReleaseOutcome";
import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { announceRefinedTaskBlocked } from "@/lib/projects/tasks/refine/announceRefinedTaskBlocked";
import { parseReleaseArgs } from "@/lib/projects/tasks/refine/parseTaskActionArgs";
import { finishProjectTaskClaim } from "@/lib/projects/tasks/refine/projectTaskClaimQueries";
import { loadProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinementQueries";
import { syncParentTaskStatus } from "@/lib/projects/tasks/refine/syncParentTaskStatus";
import { updateProjectTask } from "@/lib/projects/tasks/updateProjectTask";

/**
 * release_project_task: give a claim back with the outcome. The fence must
 * match the claim (a late result from an expired holder → stale_claim).
 * done needs resultSummary and should carry a verifySignal (else flagged
 * unverified); failed climbs one tier then hands to a person; blocked is
 * counted and hands to a person past the cap.
 */
export const releaseProjectTask = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ReleaseProjectTaskResult> => {
  const a = parseReleaseArgs(input.args);
  if (!a.ok) return a;
  const writer = await authorizeProjectTaskWriter({
    projectId: a.projectId,
    actorUserId: input.actorUserId,
  });
  if (!writer.ok) return writer;
  const task = await loadProjectTaskRecord(a);
  const claim = await loadProjectTaskRefinement(a.taskId);
  if (task === null) return { ok: false, code: "task_not_found" };
  if (
    claim === null ||
    claim.claimedByUserId !== input.actorUserId ||
    claim.claimFence !== a.fence
  ) {
    return { ok: false, code: "stale_claim" };
  }
  if (a.outcome === "done" && a.resultSummary === null) {
    return { ok: false, code: "result_summary_required" };
  }
  if (a.outcome === "blocked" && a.blockedReason === null) {
    return { ok: false, code: "blocked_reason_required" };
  }
  const decision = decideReleaseOutcome({
    outcome: a.outcome,
    tier: claim.effortTier,
    attempts: claim.attempts,
    blockCount: claim.blockCount,
    blockedOn: a.blockedOn,
    blockedReason: a.blockedReason,
    verifySignal: a.verifySignal,
  });
  const finished = await finishProjectTaskClaim({
    taskId: a.taskId,
    userId: input.actorUserId,
    fence: a.fence,
    outcome: decision.claim,
  });
  if (finished === null) return { ok: false, code: "stale_claim" };
  const moved = await updateProjectTask({
    actorUserId: input.actorUserId,
    requireResultSummaryOnDone: true,
    args: {
      projectId: a.projectId,
      taskId: a.taskId,
      status: decision.status,
      ...(a.resultSummary !== null ? { resultSummary: a.resultSummary } : {}),
      ...(decision.blockedReason !== null
        ? { blockedReason: decision.blockedReason }
        : {}),
    },
  });
  if (!moved.ok) return { ok: false, code: "release_failed" };
  if (decision.status === "blocked") {
    await announceRefinedTaskBlocked({
      actorUserId: input.actorUserId,
      projectId: a.projectId,
      title: task.title,
      reason: decision.blockedReason ?? "Blocked",
      blockCount: finished.blockCount,
    });
  }
  await syncParentTaskStatus({ projectId: a.projectId, taskId: a.taskId });
  return {
    ok: true,
    task: moved.task,
    nextEffortTier: finished.effortTier,
    unverified: decision.unverified,
    handedToUser: decision.handedToUser,
  };
};
