import isNonEmptyString from "./isNonEmptyString";

export interface ClaudeDispatchPayload {
  readonly prompt: string;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly agentRunId?: string;
}

const isClaudeDispatchPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): payload is Readonly<Record<string, unknown>> & ClaudeDispatchPayload =>
  payload !== undefined && isNonEmptyString(payload.prompt);

export default isClaudeDispatchPayload;
