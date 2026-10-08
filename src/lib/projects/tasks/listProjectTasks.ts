import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { mapProjectTaskRecordRow } from "@/lib/projects/tasks/mapProjectTaskRecordRow";
import {
  parseListProjectTasksArgs,
  type ListProjectTasksArgsError,
} from "@/lib/projects/tasks/parseListProjectTasksArgs";
import {
  toProjectTaskListItem,
  type ProjectTaskListItem,
} from "@/lib/projects/tasks/projectTaskListItem";
import {
  EMPTY_PAGE,
  nextCursorOf,
  resolveOwnerFilter,
} from "@/lib/projects/tasks/listProjectTasksHelpers";
import { queryProjectTaskRecordPage } from "@/lib/projects/tasks/queryProjectTaskRecordPage";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type ListProjectTasksResult =
  | {
      readonly ok: true;
      readonly tasks: readonly ProjectTaskListItem[];
      readonly nextCursor: string | null;
    }
  | {
      readonly ok: false;
      readonly code: ListProjectTasksArgsError | "not_found" | "forbidden";
    };

/** Owner or any ACTIVE seat (viewers too — read-only). Pending/none → forbidden. */
const canReadProjectTasks = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<"ok" | "not_found" | "forbidden"> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) return "not_found";
  if (project.ownerUserId === input.actorUserId) return "ok";
  const seat = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  return seat === null ? "forbidden" : "ok";
};

/** Orchestrator (list_project_tasks): args → reader gate → keyset page → meta. */
export const listProjectTasks = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ListProjectTasksResult> => {
  const parsed = parseListProjectTasksArgs(input.args);
  if (!parsed.ok) return parsed;
  const access = await canReadProjectTasks({
    projectId: parsed.value.projectId,
    actorUserId: input.actorUserId,
  });
  if (access !== "ok") return { ok: false, code: access };

  const owner = await resolveOwnerFilter({
    projectId: parsed.value.projectId,
    actorUserId: input.actorUserId,
    mine: parsed.value.mine,
    ownerMembershipId: parsed.value.ownerMembershipId,
  });
  /** mine without a seat (project owner) owns nothing → empty page. */
  if (owner.none) return EMPTY_PAGE;

  const rows = await queryProjectTaskRecordPage({
    ...parsed.value,
    ownerMembershipId: owner.seatId,
  });
  const page = rows.slice(0, parsed.value.limit);
  const last = page.at(-1);
  const hasMore = rows.length > parsed.value.limit && last !== undefined;
  return {
    ok: true,
    tasks: page.map((row) =>
      toProjectTaskListItem(mapProjectTaskRecordRow(row)),
    ),
    nextCursor: hasMore ? nextCursorOf(parsed.value.sort, last) : null,
  };
};
