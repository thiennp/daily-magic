/**
 * Install-safe continuation prompt builder (no repo `../src` imports).
 * Keep behavior aligned with src/features/agent/utils/buildContinuationPromptWithContext.ts.
 */
const DEFAULT_MAX_CONTEXT_CHARS = 12_000;

const truncateContext = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) {
    return text;
  }

  return `…${text.slice(-maxChars)}`;
};

const cleanPriorAssistantOutput = (output: string): string =>
  output
    .replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g, "")
    .replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const buildContinuationPromptWithContext = (input: {
  readonly priorPrompt: string;
  readonly priorOutput: string;
  readonly userMessage: string;
  readonly maxContextChars?: number;
}): string => {
  const userMessage = input.userMessage.trim();
  const priorPrompt = input.priorPrompt.trim();
  const priorOutput = cleanPriorAssistantOutput(input.priorOutput);
  const maxContextChars = input.maxContextChars ?? DEFAULT_MAX_CONTEXT_CHARS;

  if (priorPrompt.length === 0 && priorOutput.length === 0) {
    return userMessage;
  }

  const transcript = [
    priorPrompt.length > 0 ? `User: ${priorPrompt}` : null,
    priorOutput.length > 0
      ? `Assistant: ${truncateContext(priorOutput, maxContextChars)}`
      : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n\n");

  return [
    "Continue the same task on this Mac using the prior conversation as context.",
    "",
    "<prior_context>",
    transcript,
    "</prior_context>",
    "",
    "New message:",
    userMessage,
  ].join("\n");
};
