import type { WriterSessionTranscriptTurn } from "./writerSessionTranscript.types";

const DEFAULT_MAX_OUTPUT_CHARS_PER_TURN = 4_000;
const DEFAULT_MAX_TOTAL_CHARS = 12_000;

const cleanAssistantOutput = (output: string): string =>
  output
    .replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g, "")
    .replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const truncateTail = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) {
    return text;
  }

  return `…${text.slice(-maxChars)}`;
};

/** Builds the `<prior_context>` body from stored turns (newest output truncated first). */
export const buildWriterSessionContinuationInjectionBody = (input: {
  readonly turns: readonly WriterSessionTranscriptTurn[];
  readonly maxOutputCharsPerTurn?: number;
  readonly maxTotalChars?: number;
}): string => {
  const maxOutputCharsPerTurn =
    input.maxOutputCharsPerTurn ?? DEFAULT_MAX_OUTPUT_CHARS_PER_TURN;
  const maxTotalChars = input.maxTotalChars ?? DEFAULT_MAX_TOTAL_CHARS;

  if (input.turns.length === 0) {
    return "";
  }

  const lines: string[] = [];
  let totalChars = 0;

  for (let index = input.turns.length - 1; index >= 0; index -= 1) {
    const turn = input.turns[index];
    const userLine =
      turn.userPrompt.trim().length > 0
        ? `User: ${turn.userPrompt.trim()}`
        : null;
    const cleanedOutput = cleanAssistantOutput(turn.assistantOutput);
    const assistantLine =
      cleanedOutput.length > 0
        ? `Assistant: ${truncateTail(cleanedOutput, maxOutputCharsPerTurn)}`
        : null;

    const block = [userLine, assistantLine]
      .filter((line): line is string => line !== null)
      .join("\n\n");

    if (block.length === 0) {
      continue;
    }

    if (totalChars + block.length > maxTotalChars && lines.length > 0) {
      break;
    }

    lines.unshift(block);
    totalChars += block.length;
  }

  return lines.join("\n\n");
};

export const buildWriterSessionColdContinuePrompt = (input: {
  readonly priorTurns: readonly WriterSessionTranscriptTurn[];
  readonly userMessage: string;
  readonly maxOutputCharsPerTurn?: number;
  readonly maxTotalChars?: number;
}): string => {
  const userMessage = input.userMessage.trim();
  const injectionBody = buildWriterSessionContinuationInjectionBody({
    turns: input.priorTurns,
    maxOutputCharsPerTurn: input.maxOutputCharsPerTurn,
    maxTotalChars: input.maxTotalChars,
  });

  if (injectionBody.length === 0) {
    return userMessage;
  }

  return [
    "Continue the same task on this Mac using the prior conversation as context.",
    "",
    "<prior_context>",
    injectionBody,
    "</prior_context>",
    "",
    "New message:",
    userMessage,
  ].join("\n");
};
