export const buildPromptSdlcImproverPrompt = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string;
  readonly avoid?: string | null;
  readonly instructions?: string | null;
}): string => {
  const avoid = input.avoid?.trim() ?? "";
  const avoidLines =
    avoid.length === 0
      ? []
      : ["", "Avoid:", avoid, "", "Do not repeat anything in Avoid."];
  const instructions = input.instructions?.trim() ?? "";
  const instructionLines =
    instructions.length === 0 ? [] : ["", "Instructions:", instructions];

  return [
    "You improve prompts.",
    "Do not edit files. Do not run tools. Do not score the prompt.",
    "Reply with only the improved prompt text, no commentary.",
    "",
    "Goal:",
    input.goal.trim(),
    ...instructionLines,
    "",
    "Current prompt:",
    "This is the highest scoring version so far. Start from it.",
    input.promptText.trim(),
    "",
    `Judge score: ${input.score}`,
    "Judge reasons:",
    input.reasons.trim(),
    ...avoidLines,
    "",
    "The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",
    instructions.length === 0
      ? "Write the next prompt."
      : "Write the next prompt. Follow the goal and the instructions.",
  ].join("\n");
};
