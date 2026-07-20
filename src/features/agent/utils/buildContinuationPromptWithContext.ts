import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";
import { stripNextActionsFromTerminalOutput } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

const DEFAULT_MAX_CONTEXT_CHARS = 12_000;

const truncateContext = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) {
    return text;
  }

  return `…${text.slice(-maxChars)}`;
};

const cleanPriorAssistantOutput = (output: string): string =>
  stripAgentRunProgressFromOutput(stripNextActionsFromTerminalOutput(output))
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/** Seed a follow-up prompt with the prior Mac run transcript (Cursor-style). */
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
