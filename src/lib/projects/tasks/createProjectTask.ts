import {
  checkProjectTaskCreateCaps,
  type ProjectTaskCreateCapFailure,
} from "@/lib/projects/tasks/checkProjectTaskCreateCaps";
import {
  authorizeProjectTaskWriter,
  type ProjectTaskWriterDenyCode,
} from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import {
  parseCreateProjectTaskArgs,
  type ProjectTaskArgsError,
} from "@/lib/projects/tasks/parseProjectTaskToolArgs";
import { afterProjectTaskWrite } from "@/lib/projects/tasks/afterProjectTaskWrite";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import { insertProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecordWriteQueries";
import {
  validateProjectTaskRefs,
  type ProjectTaskRefError,
} from "@/lib/projects/tasks/validateProjectTaskRefs";

export type CreateProjectTaskResult =
  | { readonly ok: true; readonly task: ProjectTaskRecord }
  | {
      readonly ok: false;
      readonly code:
        ProjectTaskWriterDenyCode | ProjectTaskArgsError | ProjectTaskRefError;
    }
  | ProjectTaskCreateCapFailure;

/**
 * Orchestrator (DF-024 create_project_task): args → writer gate (owner or
 * active non-viewer member / assistant) → ownerBot / dependsOn / planItemId
 * refs → 500 rows/project cap + 300/h caller cap (checkProjectTaskCreateCaps)
 * → one project_task_records
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
    actorUserId: input.actorUserId,
    actorMembershipId: writer.membership?.id ?? null,
    dependsOn: fields.dependsOn,
    planItemId: fields.planItemId,
  });
  if (!refs.ok) return refs;

  const caps = await checkProjectTaskCreateCaps({
    projectId,
    creatorUserId: input.actorUserId,
    ...(input.now !== undefined ? { now: input.now } : {}),
  });
  if (!caps.ok) return caps;

  const task = await insertProjectTaskRecord({
    projectId,
    createdByUserId: input.actorUserId,
    createdByMembershipId: writer.membership?.id ?? null,
    values: {
      title: fields.title,
      description: fields.description ?? null,
      resultSummary: fields.resultSummary ?? null,
      status,
      priority: fields.priority ?? null,
      stage: fields.stage ?? null,
      tipSha: fields.tipSha ?? null,
      ownerMembershipId,
      dependsOn: fields.dependsOn ?? [],
      planItemId: fields.planItemId ?? null,
    },
  });
  await afterProjectTaskWrite({ task, origin: "local" });
  return { ok: true, task };
};
