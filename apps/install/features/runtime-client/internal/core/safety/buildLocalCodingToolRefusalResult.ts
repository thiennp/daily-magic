import {
  formatLocalCodingToolRefusal,
  type LocalCodingToolRefusalCodeValue,
} from "@agent-witch/shared/dispatch";

export type LocalCodingToolRefusalResultFrame = {
  readonly type: "command.claude.result";
  readonly payload: {
    readonly exitCode: -1;
    readonly output: string;
    readonly errorCode: LocalCodingToolRefusalCodeValue;
    readonly agentRunId?: string;
  };
  readonly requestId?: string;
};

/**
 * The normal `command.claude.result` frame for a run AWL refused, with the
 * S0 `errorCode` and the locked Product line as `output`.
 */
export const buildLocalCodingToolRefusalResult = (input: {
  readonly code: LocalCodingToolRefusalCodeValue;
  readonly agentRunId?: string;
  readonly requestId?: string;
  readonly computer?: string;
}): LocalCodingToolRefusalResultFrame => ({
  type: "command.claude.result",
  payload: {
    exitCode: -1,
    output: formatLocalCodingToolRefusal(input.code, input.computer),
    errorCode: input.code,
    ...(input.agentRunId !== undefined ? { agentRunId: input.agentRunId } : {}),
  },
  ...(input.requestId !== undefined ? { requestId: input.requestId } : {}),
});
