import { TASK_CLAIM_LEASE_MS } from "@agent-witch/shared/taskRefinement";

import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { recordClaimTelemetry } from "@/features/task-refinement/internal/infrastructure/recordClaimTelemetry";
import { loadProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import {
  claimProjectTaskRefinement,
  finishProjectTaskClaim,
} from "@/lib/projects/tasks/refine/projectTaskClaimQueries";
import { parseClaimArgs } from "@/lib/projects/tasks/refine/parseTaskActionArgs";
import { syncParentTaskStatus } from "@/lib/projects/tasks/refine/syncParentTaskStatus";
import { updateProjectTask } from "@/lib/projects/tasks/updateProjectTask";

export type ClaimProjectTaskResult =
  | {
      readonly ok: true;
      readonly fence: number;
      readonly leaseExpiresAt: string | null;
      readonly effortTier: string;
      readonly skillId: string | null;
      readonly skillParams: Readonly<Record<string, unknown>>;
      readonly attempts: number;
    }
  | {
      readonly ok: false;
      readonly code:
        | ProjectTaskWriterDenyCode
        | "invalid_arguments"
        | "task_not_found"
        | "task_closed"
        | "task_blocked"
        | "already_claimed"
        | "claim_failed";
    };

/**
 * claim_project_task: take a task with a lease. First claimer wins; an expired
 * lease can be taken over (fence goes up, so the old holder's late result is
 * rejected). Moves the task to in_progress.
 */
export const claimProjectTask = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ClaimProjectTaskResult> => {
  const parsed = parseClaimArgs(input.args);
  if (!parsed.ok) return parsed;
  const { projectId, taskId } = parsed;
  const writer = await authorizeProjectTaskWriter({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!writer.ok) return writer;
  const task = await loadProjectTaskRecord({ projectId, taskId });
  if (task === null) return { ok: false, code: "task_not_found" };
  if (task.status === "done" || task.status === "cancelled") {
    return { ok: false, code: "task_closed" };
  }
  if (task.status === "blocked") return { ok: false, code: "task_blocked" };
  const claim = await claimProjectTaskRefinement({
    projectId,
    taskId,
    userId: input.actorUserId,
    leaseMs: TASK_CLAIM_LEASE_MS,
  });
  if (claim === null) return { ok: false, code: "already_claimed" };
  if (task.status !== "in_progress") {
    const moved = await updateProjectTask({
      actorUserId: input.actorUserId,
      args: {
        projectId,
        taskId,
        status: "in_progress",
        ...(task.ownerMembershipId === null && writer.membership !== null
          ? { ownerMembershipId: writer.membership.id }
          : {}),
      },
    });
    if (!moved.ok && moved.code !== "update_conflict") {
      await finishProjectTaskClaim({
        taskId,
        userId: input.actorUserId,
        fence: claim.claimFence,
        outcome: {
          attemptsDelta: 0,
          blockCountDelta: 0,
          effortTier: null,
          blockedOn: claim.blockedOn,
          verifySignal: null,
        },
      });
      return { ok: false, code: "claim_failed" };
    }
  }
  await recordClaimTelemetry({
    writer,
    projectId,
    taskId,
    claim,
    actorUserId: input.actorUserId,
  });
  await syncParentTaskStatus({ projectId, taskId });
  return {
    ok: true,
    fence: claim.claimFence,
    leaseExpiresAt: claim.leaseExpiresAt,
    effortTier: claim.effortTier,
    skillId: claim.skillId,
    skillParams: claim.skillParams,
    attempts: claim.attempts,
  };
};
