/** Asks a writer to do the prompt's task in the folder, without scoring it. */
export const buildPromptSdlcRunPrompt = (input: {
  readonly promptText: string;
  readonly instructions?: string | null;
}): string => {
  const instructions = input.instructions?.trim() ?? "";
  const inputLines =
    instructions.length === 0
      ? ["Input:", "No separate input. Follow the prompt as written."]
      : [
          "Input:",
          instructions,
          "",
          "If the prompt needs an input, use the input above.",
        ];

  return [
    "Do the task in the prompt below.",
    "Work in this folder. Change the files the prompt names.",
    "Do not score the work. Do not rewrite the prompt. Do not explain the prompt.",
    "",
    "Prompt:",
    input.promptText.trim(),
    "",
    ...inputLines,
  ].join("\n");
};
