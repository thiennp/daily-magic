import { linkDispatchedRunToTaskRecord } from "@/lib/projects/tasks/projectTaskRunLink";

const readString = (body: Record<string, unknown>, key: string): string =>
  typeof body[key] === "string" ? (body[key] as string).trim() : "";

/**
 * After an Assign-task dispatch that started an agent run, attach that run to
 * a task record (taskRecordId from the body, else a new In progress record) so
 * the planned-work board follows the run. Other kinds / non-run sends: no-op.
 */
export const linkTaskAssignRun = async (
  projectId: string,
  actorUserId: string,
  args: unknown,
  result: object,
): Promise<void> => {
  const agentRunId =
    "agentRunId" in result && typeof result.agentRunId === "string"
      ? result.agentRunId
      : "";
  if (agentRunId.length === 0 || args === null || typeof args !== "object") {
    return;
  }
  const body = args as Record<string, unknown>;
  const kind = readString(body, "kind");
  if (kind.length > 0 && kind !== "task.assign") return;
  await linkDispatchedRunToTaskRecord({
    projectId,
    actorUserId,
    agentRunId,
    summary: readString(body, "summary"),
    assigneeMembershipId: readString(body, "toMembershipId") || null,
    taskRecordId: readString(body, "taskRecordId") || null,
  });
};
