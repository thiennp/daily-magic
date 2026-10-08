import {
  AGENT_RUN_INPUT_GUARDRAILS,
  AGENT_RUN_INPUT_MARKER,
} from "./dispatch/agentRunInputGuardrails.constant";

// eslint-disable-next-line no-control-regex
const ANSI_SEQUENCE = /\u001b\[[0-9;?]*[A-Za-z]/g;

export const normalizeOutputLine = (line: string): string =>
  line.replace(ANSI_SEQUENCE, "").replace(/\s+/g, " ").trim();

/**
 * Every non-empty line AgentWitch itself sent: our own instruction template
 * plus the prompt of this run. CLIs (codex exec) print the prompt back, so a
 * line found in this set is never an agent question.
 */
export const buildEchoedLineSet = (
  sentPrompt: string | undefined,
): ReadonlySet<string> =>
  new Set(
    `${AGENT_RUN_INPUT_GUARDRAILS}\n${sentPrompt ?? ""}`
      .split(/\r?\n/)
      .map(normalizeOutputLine)
      .filter((line) => line.length > 0),
  );

export const isInstructionTemplateText = (text: string): boolean =>
  buildEchoedLineSet(undefined).has(normalizeOutputLine(text)) ||
  /Put your single clear question|inside the estimate block|(?:Never|Do not) use \[\[AWAITING_INPUT\]\]/.test(
    text,
  );

/**
 * Index of the first marker the agent really wrote: alone on its own line
 * (case-sensitive) and followed by a question line that is not text we sent.
 * A bare trailing marker (question not streamed yet) still counts.
 */
export const findRealMarkerIndex = (
  text: string,
  echoedLines: ReadonlySet<string>,
): number => {
  const lines = [...text.matchAll(/^.*$/gm)];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (
      line === undefined ||
      normalizeOutputLine(line[0]) !== AGENT_RUN_INPUT_MARKER
    ) {
      continue;
    }
    const next = lines
      .slice(i + 1)
      .map((candidate) => normalizeOutputLine(candidate[0]))
      .find((candidate) => candidate.length > 0);
    if (next !== undefined && echoedLines.has(next)) {
      continue;
    }
    return (line.index ?? 0) + line[0].indexOf(AGENT_RUN_INPUT_MARKER);
  }
  return -1;
};
