import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import {
  PROJECT_TASK_STAGES,
  type ProjectTaskPriority,
  type ProjectTaskStage,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

const str = (v: unknown): string | null =>
  typeof v === "string" && v.length > 0 ? v : null;

const iso = (v: unknown): string =>
  v instanceof Date ? v.toISOString() : typeof v === "string" ? v : "";

const isoOrNull = (v: unknown): string | null => {
  const out = iso(v);
  return out.length > 0 ? out : null;
};

const toStageTimes = (v: unknown): ProjectTaskRecord["stageTimes"] => {
  const raw: unknown = typeof v === "string" ? JSON.parse(v) : v;
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Partial<Record<ProjectTaskStage, string>> = {};
  for (const stage of PROJECT_TASK_STAGES) {
    const at = (raw as Record<string, unknown>)[stage];
    if (typeof at === "string") out[stage] = at;
  }
  return out;
};

/** project_task_records row (+ optional owner_display_name join) → record. */
export const mapProjectTaskRecordRow = (
  row: Record<string, unknown>,
): ProjectTaskRecord => ({
  id: String(row.id),
  projectId: String(row.project_id),
  title: String(row.title ?? ""),
  description: str(row.description),
  status: String(row.status) as ProjectTaskStatus,
  priority: str(row.priority) as ProjectTaskPriority | null,
  stage: str(row.stage) as ProjectTaskStage | null,
  tipSha: str(row.tip_sha),
  dependsOn: Array.isArray(row.depends_on)
    ? row.depends_on.filter((id): id is string => typeof id === "string")
    : [],
  ownerMembershipId: str(row.owner_membership_id),
  ownerDisplayName: str(row.owner_display_name),
  createdByUserId: str(row.created_by_user_id),
  createdByMembershipId: str(row.created_by_membership_id),
  planItemId: str(row.plan_item_id),
  startedAt: isoOrNull(row.started_at),
  blockedAt: isoOrNull(row.blocked_at),
  doneAt: isoOrNull(row.done_at),
  stageTimes: toStageTimes(row.stage_times),
  createdAt: iso(row.created_at),
  updatedAt: iso(row.updated_at),
});
