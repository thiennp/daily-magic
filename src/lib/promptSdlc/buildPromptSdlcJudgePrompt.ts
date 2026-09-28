export const buildPromptSdlcJudgePrompt = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly passScore: number;
  readonly instructions?: string | null;
}): string => {
  const instructions = input.instructions?.trim() ?? "";
  const instructionLines =
    instructions.length === 0 ? [] : ["", "Instructions:", instructions];
  const scoreLine =
    instructions.length === 0
      ? "Score the prompt from 0 to 100 for how well it would achieve the goal."
      : "Score the prompt from 0 to 100 for how well it would achieve the goal and follow the instructions.";

  return [
    "You are a prompt judge.",
    "Do not edit files. Do not run tools. Do not rewrite the prompt.",
    "Reply with one JSON object only, no markdown.",
    "",
    "Goal:",
    input.goal.trim(),
    ...instructionLines,
    "",
    "Prompt to judge:",
    input.promptText.trim(),
    "",
    scoreLine,
    `Set passed to true only when the score is at least ${input.passScore}.`,
    "reasons is required and explains the score.",
    "A score without a reason is not a verdict.",
    "",
    '{"score": 0, "passed": false, "reasons": "why"}',
  ].join("\n");
};
