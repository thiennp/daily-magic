import type {
  BlockedOn,
  EffortTier,
  VerifySignal,
} from "@agent-witch/shared/taskRefinement";

import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectTaskRefinementSchema } from "@/lib/projects/tasks/refine/ensureProjectTaskRefinementSchema";
import { mapProjectTaskRefinementRow } from "@/lib/projects/tasks/refine/mapProjectTaskRefinementRow";
import type { ProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinement.type";

/**
 * Atomic claim: succeeds when nobody holds the task, the lease expired, or the
 * caller already holds it (re-claim renews). Every win bumps the fence, so a
 * late result from an expired holder is rejected. Null = held by someone else.
 */
export const claimProjectTaskRefinement = async (input: {
  readonly projectId: string;
  readonly taskId: string;
  readonly userId: string;
  readonly leaseMs: number;
}): Promise<ProjectTaskRefinement | null> => {
  await ensureProjectTaskRefinementSchema();
  const rows = asRowArray(
    await getSql()`
      INSERT INTO project_task_refinement (
        task_id, project_id, claimed_by_user_id, claim_fence, lease_expires_at
      )
      SELECT t.id, t.project_id, ${input.userId}, 1,
        NOW() + make_interval(secs => ${input.leaseMs / 1000}::double precision)
      FROM project_task_records t
      WHERE t.id = ${input.taskId} AND t.project_id = ${input.projectId}
      ON CONFLICT (task_id) DO UPDATE SET
        claimed_by_user_id = EXCLUDED.claimed_by_user_id,
        claim_fence = project_task_refinement.claim_fence + 1,
        lease_expires_at = EXCLUDED.lease_expires_at,
        updated_at = NOW()
      WHERE project_task_refinement.claimed_by_user_id IS NULL
        OR project_task_refinement.lease_expires_at IS NULL
        OR project_task_refinement.lease_expires_at < NOW()
        OR project_task_refinement.claimed_by_user_id = EXCLUDED.claimed_by_user_id
      RETURNING *`,
  );
  return rows[0] === undefined ? null : mapProjectTaskRefinementRow(rows[0]);
};

export type ProjectTaskClaimOutcome = {
  readonly attemptsDelta: number;
  readonly blockCountDelta: number;
  readonly effortTier: EffortTier | null;
  readonly blockedOn: BlockedOn | null;
  readonly verifySignal: VerifySignal | null;
};

/** Give the claim back with the outcome. Null = stale fence or not the holder. */
export const finishProjectTaskClaim = async (input: {
  readonly taskId: string;
  readonly userId: string;
  readonly fence: number;
  readonly outcome: ProjectTaskClaimOutcome;
}): Promise<ProjectTaskRefinement | null> => {
  await ensureProjectTaskRefinementSchema();
  const o = input.outcome;
  const rows = asRowArray(
    await getSql()`
      UPDATE project_task_refinement SET
        claimed_by_user_id = NULL,
        lease_expires_at = NULL,
        attempts = attempts + ${o.attemptsDelta},
        block_count = block_count + ${o.blockCountDelta},
        effort_tier = COALESCE(${o.effortTier}, effort_tier),
        blocked_on = ${o.blockedOn},
        verify_signal = COALESCE(${o.verifySignal}, verify_signal),
        updated_at = NOW()
      WHERE task_id = ${input.taskId}
        AND claimed_by_user_id = ${input.userId}
        AND claim_fence = ${input.fence}
      RETURNING *`,
  );
  return rows[0] === undefined ? null : mapProjectTaskRefinementRow(rows[0]);
};
