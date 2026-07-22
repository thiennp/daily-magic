import isNonEmptyString from "./isNonEmptyString";

export interface ClaudeDispatchPayload {
  readonly prompt: string;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly agentRunId?: string;
  readonly writerAgent?: string;
}

const isClaudeDispatchPayload = (
  payload: unknown,
): payload is Readonly<Record<string, unknown>> & ClaudeDispatchPayload =>
  typeof payload === "object" &&
  payload !== null &&
  isNonEmptyString((payload as ClaudeDispatchPayload).prompt);

export default isClaudeDispatchPayload;
