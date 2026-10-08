const INTERRUPTED_LINE = /^\s*error:\s*interrupted\.?\s*$/i;
const ANSWER_ECHO_PREFIX = /^\s*\[checkpoint answer\]\s*/i;

/**
 * 4139ca18 (B2): the host pauses the CLI for a question, which prints
 * "error: interrupted", and echoes the reply as "[checkpoint answer] …".
 * Neither is something the person asked or answered.
 */
export const cleanAgentLiveCheckpointText = (text: string): string =>
  text
    .split("\n")
    .filter((line) => !INTERRUPTED_LINE.test(line))
    .map((line) => line.replace(ANSWER_ECHO_PREFIX, ""))
    .join("\n")
    .trim();
