import {
  formatLocalCodingToolSafetyCopy,
  toOutboundRunText,
} from "@agent-witch/shared/dispatch";

/**
 * WS frames that carry run output, prompts or report text off the computer.
 * Auth / register frames are deliberately absent (they must keep their
 * fields verbatim and carry no run output).
 */
export const OUTBOUND_RUN_OUTPUT_MESSAGE_TYPES: ReadonlySet<string> = new Set([
  "terminal.stream.chunk",
  "command.claude.result",
  "command.claude.input_required",
  "command.writer.session.chunk",
  "command.writer.session.ready",
  "harness.request.result",
  "shell.data",
  "run.heartbeat",
  "dashboard.agentRun.get.result",
  "dashboard.agentRun.list.result",
]);

const scrubValue = (value: unknown, hiddenNotice: string): unknown => {
  if (typeof value === "string") {
    return toOutboundRunText(value, hiddenNotice);
  }
  if (Array.isArray(value)) {
    return value.map((item) => scrubValue(item, hiddenNotice));
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [
        key,
        scrubValue(nested, hiddenNotice),
      ]),
    );
  }
  return value;
};

/**
 * S0-8 outbound boundary: scrub every string in the payload of a run-output
 * frame. Other frames pass through unchanged. Pure.
 */
export const scrubOutboundRunFrame = (
  message: Readonly<Record<string, unknown>>,
): Record<string, unknown> => {
  if (
    typeof message.type !== "string" ||
    !OUTBOUND_RUN_OUTPUT_MESSAGE_TYPES.has(message.type) ||
    message.payload === undefined
  ) {
    return { ...message };
  }
  return {
    ...message,
    payload: scrubValue(
      message.payload,
      formatLocalCodingToolSafetyCopy("secretHidden"),
    ),
  };
};
