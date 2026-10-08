export const AGENT_WAKE_SUMMARY_MAX_LENGTH = 200;

export type AgentWakePayload = {
  readonly projectId: string;
  readonly membershipId: string;
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly task?: {
    readonly taskId: string;
    readonly status?: string;
    readonly priority?: string;
  };
};

const pick = (
  refs: Readonly<Record<string, unknown>>,
  key: string,
): string | undefined => {
  const value = refs[key];
  return typeof value === "string" && value !== "" ? value : undefined;
};

/** Thin wake meta: capped summary, task meta only for task.updated. */
export const buildAgentWakePayload = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly messageId: string;
  readonly kind: string;
  readonly summary: string;
  readonly refs: Readonly<Record<string, unknown>>;
}): AgentWakePayload => {
  const base = {
    projectId: input.projectId,
    membershipId: input.membershipId,
    messageId: input.messageId,
    kind: input.kind,
    summary: input.summary.slice(0, AGENT_WAKE_SUMMARY_MAX_LENGTH),
  };
  const taskId =
    input.kind === "task.updated" ? pick(input.refs, "taskId") : undefined;
  return taskId === undefined
    ? base
    : {
        ...base,
        task: {
          taskId,
          status: pick(input.refs, "status"),
          priority: pick(input.refs, "priority"),
        },
      };
};
