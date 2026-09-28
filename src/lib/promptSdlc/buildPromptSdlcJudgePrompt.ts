export const formatPromptSdlcRunDelay = (delayMs: number): string => {
  const ms = Math.max(0, Math.round(delayMs));
  if (ms < 1000) {
    return `${ms} ms`;
  }
  const seconds = ms / 1000;
  return seconds >= 10 ? `${Math.round(seconds)}s` : `${seconds.toFixed(1)}s`;
};

const tokenLine = (tokens: number | null): string =>
  tokens === null ? "Tokens used: not reported" : `Tokens used: ${tokens}`;

/** Scores file and git evidence from a prompt run. The prompt wording is not the subject. */
export const buildPromptSdlcJudgePrompt = (input: {
  readonly goal: string;
  readonly lookedAt: string;
  readonly evidence: string;
  readonly tokens: number | null;
  readonly delayMs: number;
  readonly passScore: number;
  readonly instructions?: string | null;
}): string => {
  const instructions = input.instructions?.trim() ?? "";
  const instructionLines =
    instructions.length === 0 ? [] : ["", "Instructions:", instructions];
  const scoreLine =
    instructions.length === 0
      ? "Score the changes from 0 to 100 for how well they achieve the goal."
      : "Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";

  return [
    "You score the result of a prompt run.",
    "Do not edit files. Do not run tools. Do not rewrite the prompt.",
    "Do not score the wording of the prompt.",
    "Score only the evidence below. Do not guess a result that is not in the evidence.",
    "A printed reply is not the result when the evidence has file or git changes.",
    "Reply with one JSON object only, no markdown.",
    "",
    "Goal:",
    input.goal.trim(),
    ...instructionLines,
    "",
    "Looked at:",
    input.lookedAt.trim(),
    "",
    "Evidence:",
    input.evidence.trim(),
    "",
    tokenLine(input.tokens),
    `Delay: ${formatPromptSdlcRunDelay(input.delayMs)}`,
    "",
    scoreLine,
    "Weigh the evidence, the tokens used, and the delay.",
    "A slower or more expensive run scores lower when the changes are otherwise equal.",
    `Set passed to true only when the score is at least ${input.passScore}.`,
    "reasons is required and explains the score.",
    "Mention the changes, the tokens, and the delay.",
    "A score without a reason is not a verdict.",
    "",
    '{"score": 0, "passed": false, "reasons": "why"}',
  ].join("\n");
};

/**
 * One-shot judge call used when the cycle stores the next prompt before a
 * separate run exists. Live measures the run itself and uses
 * {@link buildPromptSdlcJudgePrompt} instead.
 */
export const buildPromptSdlcStoredJudgePrompt = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly passScore: number;
}): string =>
  [
    "You are a prompt judge.",
    "Run the prompt below, then score only the changes.",
    "If the folder is a git repo, score the git changes.",
    "If the prompt names a file, score that file.",
    "Do not guess a result that was only printed.",
    "Do not edit files after the run. Do not rewrite the prompt.",
    "Do not score the wording of the prompt.",
    "Reply with one JSON object only, no markdown.",
    "",
    "Goal:",
    input.goal.trim(),
    "",
    "Prompt:",
    input.promptText.trim(),
    "",
    "Score the changes from 0 to 100.",
    "Weigh the changes, the tokens used, and the delay.",
    `Set passed to true only when the score is at least ${input.passScore}.`,
    "reasons is required and explains the score.",
    "",
    '{"score": 0, "passed": false, "reasons": "why"}',
  ].join("\n");
