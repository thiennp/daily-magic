import {
  AGENT_RUN_INPUT_GUARDRAILS,
  AGENT_RUN_INPUT_MARKER,
} from "./dispatch/agentRunInputGuardrails.constant";

const PARAGRAPH_END = /\r?\n\s*\r?\n|\[\[[A-Z_]+\]\]/;

/**
 * While the CLI is still streaming, a question counts only once its line has
 * ended. Parsing the first chunk that held the marker cut asks mid-word
 * ("Can you confirm the vibe (add a small dark-mode", Testi run 2 a76d46ac)
 * and then killed the writer. At process exit pass `requireCompleteQuestion:
 * false` to accept a final unterminated line.
 */
const hasCompleteQuestion = (afterMarkerRaw: string): boolean => {
  const body = afterMarkerRaw.replace(/^\s+/, "");
  return body.length > 0 && (PARAGRAPH_END.test(body) || /\n/.test(body));
};

export const parseAwaitingInputFromOutput = (
  output: string,
  options?: { readonly requireCompleteQuestion?: boolean },
): { readonly question: string; readonly partialOutput: string } | null => {
  const markerIndex = output.indexOf(AGENT_RUN_INPUT_MARKER);

  if (markerIndex < 0) {
    return null;
  }

  const afterMarkerRaw = output.slice(
    markerIndex + AGENT_RUN_INPUT_MARKER.length,
  );
  if (
    options?.requireCompleteQuestion === true &&
    !hasCompleteQuestion(afterMarkerRaw)
  ) {
    return null;
  }
  const afterMarker = afterMarkerRaw.trim();
  const paragraph = afterMarker.split(PARAGRAPH_END)[0] ?? "";
  const question = paragraph
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" ");

  if (question.length === 0) {
    return null;
  }

  return {
    question,
    partialOutput: output.slice(0, markerIndex).trim(),
  };
};

export const buildContinuationPrompt = (input: {
  readonly originalPrompt: string;
  readonly partialOutput: string;
  readonly question: string;
  readonly response: string;
}): string =>
  [
    "Continue the task using the user's answer.",
    "",
    "Original task:",
    input.originalPrompt,
    "",
    "Output so far:",
    input.partialOutput,
    "",
    "You asked:",
    input.question,
    "",
    "User answer:",
    input.response,
    "",
    AGENT_RUN_INPUT_GUARDRAILS,
  ].join("\n");
