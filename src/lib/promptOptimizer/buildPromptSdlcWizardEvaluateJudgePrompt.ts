/** Wizard step 2: score prompt text only — no folder run. */
export const buildPromptSdlcWizardEvaluateJudgePrompt = (input: {
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
      ? "Score the prompt text from 1 to 100 for how well it achieves the goal."
      : "Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";

  return [
    "You score a prompt for wizard step 2 (evaluate revisions).",
    "Do not edit files. Do not run tools. Do not execute the prompt in a folder.",
    "Score only the prompt text below. Do not score hypothetical run output.",
    "Reply with one JSON object only, no markdown.",
    "",
    "Goal:",
    input.goal.trim(),
    ...instructionLines,
    "",
    "Prompt:",
    input.promptText.trim(),
    "",
    scoreLine,
    "Weigh clarity, completeness, safety, and fit for the goal.",
    `Set passed to true only when the score is at least ${input.passScore}.`,
    "reasons is required and explains the score.",
    "A score without a reason is not a verdict.",
    "",
    '{"score": 0, "passed": false, "reasons": "why"}',
  ].join("\n");
};
