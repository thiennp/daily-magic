export const buildPromptSdlcImproverPrompt = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string;
  readonly history?: string | null;
}): string => {
  const history = input.history?.trim() ?? "";
  const historyLines =
    history.length === 0 ? [] : ["", "History:", history, ""];

  return [
    "You improve prompts.",
    "Do not edit files. Do not run tools. Do not score the prompt.",
    "Reply with only the improved prompt text, no commentary.",
    "",
    "Goal:",
    input.goal.trim(),
    "",
    "Current prompt:",
    input.promptText.trim(),
    "",
    `Judge score: ${input.score}`,
    "Judge reasons:",
    input.reasons.trim(),
    ...historyLines,
    "",
    "Write the next prompt.",
  ].join("\n");
};
