/**
 * Issue webhook payloads shaped after Linear's official schema
 * (IssueWebhookPayload in linear/linear schema.graphql, and the envelope in
 * linear.app/developers/webhooks). The docs page itself only prints a Comment
 * example, so the Issue `data` follows the schema field-for-field.
 */
const envelope = {
  organizationId: "dc844923-f9a4-40a3-825c-dea7747e57d6",
  webhookTimestamp: 1676056940508,
  webhookId: "000042e3-d123-4980-b49f-8e140eef9329",
  createdAt: "2023-02-10T18:42:20.508Z",
  actor: {
    id: "b5ea5f1f-8adc-4f52-b4bd-ab4e84cf51ba",
    type: "user",
    name: "Linear Orbit",
    email: "orbit@linear.app",
    url: "https://linear.app/company/profiles/orbit",
  },
  type: "Issue",
  url: "https://linear.app/company/issue/LIN-1778/fix-the-bug",
};

const issueData = {
  id: "539068e2-ae88-4d09-bd75-22eb4a59612f",
  identifier: "LIN-1778",
  number: 1778,
  title: "Fix the bug",
  description: "Steps to reproduce",
  priority: 2,
  priorityLabel: "High",
  createdAt: "2023-02-10T18:40:00.000Z",
  updatedAt: "2023-02-10T18:42:20.508Z",
  archivedAt: null,
  url: "https://linear.app/company/issue/LIN-1778/fix-the-bug",
  stateId: "a1b2c3d4-0000-4000-8000-000000000001",
  state: {
    id: "a1b2c3d4-0000-4000-8000-000000000001",
    name: "In Progress",
    color: "#f2c94c",
    type: "started",
  },
  teamId: "7f3a1c9e-0000-4000-8000-0000000000aa",
  team: {
    id: "7f3a1c9e-0000-4000-8000-0000000000aa",
    key: "LIN",
    name: "Linear",
  },
  labelIds: ["c0ffee00-0000-4000-8000-000000000002"],
  labels: [
    {
      id: "c0ffee00-0000-4000-8000-000000000002",
      name: "Blocked",
      color: "#e5484d",
    },
  ],
  subscriberIds: [],
};

export const linearIssueCreateFixture = {
  ...envelope,
  action: "create",
  data: { ...issueData, labelIds: [], labels: [] },
};

export const linearIssueUpdateFixture = {
  ...envelope,
  action: "update",
  data: issueData,
  updatedFrom: { stateId: "a1b2c3d4-0000-4000-8000-000000000000" },
};

export const linearIssueRemoveFixture = {
  ...envelope,
  action: "remove",
  data: { ...issueData, archivedAt: "2023-02-10T18:45:00.000Z" },
};
