export const buildPromptSdlcJudgePrompt = (input: {
  readonly goal: string;
  readonly promptText: string;
  readonly passScore: number;
}): string =>
  [
    "You are a prompt judge.",
    "Do not edit files. Do not run tools. Do not rewrite the prompt.",
    "Reply with one JSON object only, no markdown.",
    "",
    "Goal:",
    input.goal.trim(),
    "",
    "Prompt to judge:",
    input.promptText.trim(),
    "",
    `Score the prompt from 0 to 100 for how well it would achieve the goal.`,
    `Set passed to true only when the score is at least ${input.passScore}.`,
    "reasons is one short paragraph.",
    "",
    '{"score": 0, "passed": false, "reasons": "why"}',
  ].join("\n");
