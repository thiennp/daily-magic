import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import {
  PROJECT_TASK_PRIORITIES,
  PROJECT_TASK_STAGES,
  PROJECT_TASK_STATUSES,
} from "@/lib/projects/tasks/projectTaskTools.constant";

const str = (v: unknown): string | null =>
  typeof v === "string" && v.length > 0 ? v : null;
const inList = <T extends string>(list: readonly T[], v: unknown): T | null =>
  typeof v === "string" && (list as readonly string[]).includes(v)
    ? (v as T)
    : null;

const parseStageTimes = (v: unknown): ProjectTaskRecord["stageTimes"] => {
  if (v === null || typeof v !== "object") return {};
  const out: Partial<Record<(typeof PROJECT_TASK_STAGES)[number], string>> = {};
  for (const stage of PROJECT_TASK_STAGES) {
    const at = (v as Record<string, unknown>)[stage];
    if (typeof at === "string") out[stage] = at;
  }
  return out;
};

const parseRow = (value: unknown): ProjectTaskRecord | null => {
  if (value === null || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const id = str(row.id);
  const status = inList(PROJECT_TASK_STATUSES, row.status);
  if (id === null || status === null) return null;
  return {
    id,
    projectId: str(row.projectId) ?? "",
    title: str(row.title) ?? "",
    description: str(row.description),
    status,
    priority: inList(PROJECT_TASK_PRIORITIES, row.priority),
    stage: inList(PROJECT_TASK_STAGES, row.stage),
    tipSha: str(row.tipSha),
    dependsOn: Array.isArray(row.dependsOn)
      ? row.dependsOn.filter((d): d is string => typeof d === "string")
      : [],
    ownerMembershipId: str(row.ownerMembershipId),
    ownerDisplayName: str(row.ownerDisplayName),
    createdByUserId: str(row.createdByUserId),
    createdByMembershipId: str(row.createdByMembershipId),
    planItemId: str(row.planItemId),
    startedAt: str(row.startedAt),
    blockedAt: str(row.blockedAt),
    doneAt: str(row.doneAt),
    cancelledAt: str(row.cancelledAt),
    stageTimes: parseStageTimes(row.stageTimes),
    createdAt: str(row.createdAt) ?? "",
    updatedAt: str(row.updatedAt) ?? "",
  };
};

/** GET task-records JSON → records (bad rows dropped; non-ok → null). */
export const parseProjectTaskRecordsPayload = (
  payload: unknown,
): readonly ProjectTaskRecord[] | null => {
  if (payload === null || typeof payload !== "object") return null;
  const body = payload as Record<string, unknown>;
  if (body.ok !== true || !Array.isArray(body.tasks)) return null;
  return body.tasks
    .map(parseRow)
    .filter((r): r is ProjectTaskRecord => r !== null);
};
