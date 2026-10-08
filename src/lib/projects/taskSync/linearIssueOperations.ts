import { linearGraphql } from "@/lib/projects/taskSync/linearGraphql";
import {
  findLinearBlockedLabelId,
  findLinearStateId,
} from "@/lib/projects/taskSync/linearTeamOperations";
import {
  linearPriorityForTask,
  linearStateTypeForStatus,
} from "@/lib/projects/taskSync/linearTaskMapping";
import type {
  ExternalTaskRef,
  TaskSyncFields,
} from "@/lib/projects/taskSync/taskSync.types";

type IssuePayload = {
  readonly success: boolean;
  readonly issue: {
    readonly id: string;
    readonly identifier: string;
    readonly url: string;
  } | null;
};

const ISSUE_FIELDS = "success issue { id identifier url }";

const toRef = (payload: IssuePayload): ExternalTaskRef => {
  if (!payload.success || payload.issue === null) {
    throw new Error("linear_issue_write_failed");
  }
  const { id, identifier, url } = payload.issue;
  return { externalId: id, identifier, url };
};

/** Create (existing = null) or update the Linear issue for a task. */
export const pushLinearIssue = async (input: {
  readonly token: string;
  readonly teamId: string;
  readonly fields: TaskSyncFields;
  readonly existing: ExternalTaskRef | null;
}): Promise<ExternalTaskRef> => {
  const { token, teamId, fields, existing } = input;
  const stateId = await findLinearStateId(
    token,
    teamId,
    linearStateTypeForStatus(fields.status),
  );
  const blocked = fields.status === "blocked";
  // Only create the label when needed; on update also drop it when unblocked.
  const labelId = await findLinearBlockedLabelId(token, teamId, blocked);
  const base = {
    title: fields.title,
    description: fields.description ?? "",
    priority: linearPriorityForTask(fields.priority),
    ...(stateId !== null ? { stateId } : {}),
  };
  if (existing === null) {
    const data = await linearGraphql<{ issueCreate: IssuePayload }>(
      input.token,
      `mutation($input: IssueCreateInput!) {
         issueCreate(input: $input) { ${ISSUE_FIELDS} } }`,
      {
        input: {
          ...base,
          teamId,
          ...(blocked && labelId !== null ? { labelIds: [labelId] } : {}),
        },
      },
    );
    return toRef(data.issueCreate);
  }
  const labelDelta =
    labelId === null
      ? {}
      : blocked
        ? { addedLabelIds: [labelId] }
        : { removedLabelIds: [labelId] };
  const data = await linearGraphql<{ issueUpdate: IssuePayload }>(
    token,
    `mutation($id: String!, $input: IssueUpdateInput!) {
       issueUpdate(id: $id, input: $input) { ${ISSUE_FIELDS} } }`,
    { id: existing.externalId, input: { ...base, ...labelDelta } },
  );
  return toRef(data.issueUpdate);
};
