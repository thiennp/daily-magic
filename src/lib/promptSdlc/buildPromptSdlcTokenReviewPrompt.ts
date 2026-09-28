import { formatPromptSdlcRunDelay } from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";

const tokenLine = (tokens: number | null): string =>
  tokens === null ? "Tokens used: not reported" : `Tokens used: ${tokens}`;

/** Separate pass that suggests whether the run spent too many tokens. */
export const buildPromptSdlcTokenReviewPrompt = (input: {
  readonly tokens: number | null;
  readonly delayMs: number;
  readonly promptText: string;
  readonly evidence: string;
}): string =>
  [
    "You review the token spend of a prompt run.",
    "Do not edit files. Do not rewrite the prompt. Do not score the result.",
    "Reply with one short suggestion for the person who will rewrite the prompt.",
    "If the spend is reasonable, say the spend is reasonable and why.",
    "If the spend is high, say what to cut.",
    "",
    tokenLine(input.tokens),
    `Delay: ${formatPromptSdlcRunDelay(input.delayMs)}`,
    `Prompt length: ${input.promptText.trim().length} characters`,
    `Evidence length: ${input.evidence.length} characters`,
    "",
    "Evidence:",
    input.evidence.slice(0, 2000),
  ].join("\n");
