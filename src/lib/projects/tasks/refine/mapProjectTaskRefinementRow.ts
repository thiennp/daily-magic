import type {
  BlockedOn,
  EffortTier,
  VerifySignal,
} from "@agent-witch/shared/taskRefinement";

import type { ProjectTaskRefinement } from "@/lib/projects/tasks/refine/projectTaskRefinement.type";

const str = (v: unknown): string | null =>
  typeof v === "string" && v.length > 0 ? v : null;

const toParams = (v: unknown): Record<string, unknown> => {
  const raw: unknown = typeof v === "string" ? JSON.parse(v) : v;
  return raw !== null && typeof raw === "object" && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : {};
};

export const mapProjectTaskRefinementRow = (
  row: Record<string, unknown>,
): ProjectTaskRefinement => ({
  taskId: String(row.task_id),
  projectId: String(row.project_id),
  parentTaskId: str(row.parent_task_id),
  skillId: str(row.skill_id),
  skillParams: toParams(row.skill_params),
  effortTier: String(row.effort_tier ?? "low") as EffortTier,
  attempts: Number(row.attempts ?? 0),
  claimedByUserId: str(row.claimed_by_user_id),
  claimFence: Number(row.claim_fence ?? 0),
  leaseExpiresAt:
    row.lease_expires_at instanceof Date
      ? row.lease_expires_at.toISOString()
      : str(row.lease_expires_at),
  blockedOn: str(row.blocked_on) as BlockedOn | null,
  blockCount: Number(row.block_count ?? 0),
  verifySignal: str(row.verify_signal) as VerifySignal | null,
});
