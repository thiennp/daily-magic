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

const text = (value: unknown): string | undefined =>
  typeof value === "string" && value !== "" ? value : undefined;

/** Safe single path segment (ids become file/dir names). */
export const isSafeAgentWakeId = (value: string): boolean =>
  /^[A-Za-z0-9_-]{1,100}$/.test(value);

/** Validate an `agent.wake` payload from the server; null when malformed. */
export const parseAgentWakePayload = (
  payload: unknown,
): AgentWakePayload | null => {
  if (payload === null || typeof payload !== "object") return null;
  const raw = payload as Record<string, unknown>;
  const projectId = text(raw.projectId);
  const membershipId = text(raw.membershipId);
  const messageId = text(raw.messageId);
  const kind = text(raw.kind);
  if (!projectId || !membershipId || !messageId || !kind) return null;
  if (!isSafeAgentWakeId(projectId) || !isSafeAgentWakeId(membershipId)) {
    return null;
  }
  const rawTask = raw.task as Record<string, unknown> | null | undefined;
  const taskId = text(rawTask?.taskId);
  return {
    projectId,
    membershipId,
    messageId,
    kind,
    summary: typeof raw.summary === "string" ? raw.summary : "",
    ...(taskId === undefined
      ? {}
      : {
          task: {
            taskId,
            status: text(rawTask?.status),
            priority: text(rawTask?.priority),
          },
        }),
  };
};
