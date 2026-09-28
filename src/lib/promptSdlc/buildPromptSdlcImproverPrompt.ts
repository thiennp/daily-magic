export const buildPromptSdlcImproverPrompt = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string;
  readonly avoid?: string | null;
}): string => {
  const avoid = input.avoid?.trim() ?? "";
  const avoidLines =
    avoid.length === 0
      ? []
      : ["", "Avoid:", avoid, "", "Do not repeat anything in Avoid."];

  return [
    "You improve prompts.",
    "Do not edit files. Do not run tools. Do not score the prompt.",
    "Reply with only the improved prompt text, no commentary.",
    "",
    "Goal:",
    input.goal.trim(),
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
    "Write the next prompt.",
  ].join("\n");
};
