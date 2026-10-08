import {
  AGENT_RUN_INPUT_GUARDRAILS,
  AGENT_RUN_INPUT_MARKER,
} from "./dispatch/agentRunInputGuardrails.constant";

export const parseAwaitingInputFromOutput = (
  output: string,
): { readonly question: string; readonly partialOutput: string } | null => {
  const markerIndex = output.indexOf(AGENT_RUN_INPUT_MARKER);

  if (markerIndex < 0) {
    return null;
  }

  const afterMarker = output
    .slice(markerIndex + AGENT_RUN_INPUT_MARKER.length)
    .trim();
  const paragraph = afterMarker.split(/\r?\n\s*\r?\n|\[\[[A-Z_]+\]\]/)[0] ?? "";
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
