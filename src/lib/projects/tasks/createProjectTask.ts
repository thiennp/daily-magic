import { computeHourlyDispatchRetryAfter } from "@/lib/projects/acl/messaging/computeHourlyDispatchRetryAfter";
import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import {
  parseCreateProjectTaskArgs,
  type ProjectTaskArgsError,
} from "@/lib/projects/tasks/parseProjectTaskToolArgs";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import {
  countProjectTaskRecords,
  loadProjectTaskHourlyCreates,
} from "@/lib/projects/tasks/projectTaskRecordReadQueries";
import { insertProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import {
  PROJECT_TASK_HOURLY_CREATE_CAP,
  PROJECT_TASK_PROJECT_ROW_CAP,
} from "@/lib/projects/tasks/projectTaskTools.constant";
import {
  validateProjectTaskRefs,
  type ProjectTaskRefError,
} from "@/lib/projects/tasks/validateProjectTaskRefs";

export type CreateProjectTaskResult =
  | { readonly ok: true; readonly task: ProjectTaskRecord }
  | {
      readonly ok: false;
      readonly code:
        | ProjectTaskWriterDenyCode
        | ProjectTaskArgsError
        | ProjectTaskRefError
        | "rate_limited"
        | "task_cap_reached";
      readonly retryAfterSeconds?: number;
      readonly retryAfterAt?: string;
    };

/**
 * Orchestrator (DF-024 create_project_task): args → writer gate (owner or
 * active non-viewer member / assistant) → ownerBot / dependsOn / planItemId
 * refs → 300/h caller cap → 500 rows/project cap → one project_task_records
 * row (meta only). ownerBot defaults to the
 * caller's own seat.
 */
export const createProjectTask = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
  readonly now?: Date;
}): Promise<CreateProjectTaskResult> => {
  const parsed = parseCreateProjectTaskArgs(input.args);
  if (!parsed.ok) return parsed;
  const { projectId, status, fields } = parsed.value;

  const writer = await authorizeProjectTaskWriter({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!writer.ok) return writer;

  const ownerMembershipId =
    fields.ownerMembershipId === undefined
      ? (writer.membership?.id ?? null)
      : fields.ownerMembershipId;
  const refs = await validateProjectTaskRefs({
    projectId,
    taskId: null,
    ownerMembershipId: fields.ownerMembershipId,
    dependsOn: fields.dependsOn,
    planItemId: fields.planItemId,
  });
  if (!refs.ok) return refs;

  if (
    (await countProjectTaskRecords(projectId)) >= PROJECT_TASK_PROJECT_ROW_CAP
  ) {
    return { ok: false, code: "task_cap_reached" };
  }

  const creates = await loadProjectTaskHourlyCreates({
    creatorUserId: input.actorUserId,
  });
  if (creates.count >= PROJECT_TASK_HOURLY_CREATE_CAP) {
    const retry =
      creates.oldestAt === null
        ? {}
        : computeHourlyDispatchRetryAfter({
            oldestCreatedAt: creates.oldestAt,
            now: input.now ?? new Date(),
          });
    return { ok: false, code: "rate_limited", ...retry };
  }

  const task = await insertProjectTaskRecord({
    projectId,
    createdByUserId: input.actorUserId,
    createdByMembershipId: writer.membership?.id ?? null,
    values: {
      title: fields.title,
      description: fields.description ?? null,
      status,
      priority: fields.priority ?? null,
      stage: fields.stage ?? null,
      tipSha: fields.tipSha ?? null,
      ownerMembershipId,
      dependsOn: fields.dependsOn ?? [],
      planItemId: fields.planItemId ?? null,
    },
  });
  return { ok: true, task };
};
