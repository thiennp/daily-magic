import { buildPromptSdlcRunPrompt } from "@/lib/promptOptimizer/buildPromptSdlcRunPrompt";

/** Step 4: one module prompt per runner call; optional chain handoff from the prior module. */
export const buildPromptSdlcWizardModuleRunPrompt = (input: {
  readonly promptText: string;
  readonly runnerInstructions?: string | null;
  readonly chainPriorOutput?: string | null;
  readonly moduleTitle?: string | null;
}): string => {
  const chainPrior = input.chainPriorOutput?.trim() ?? "";
  const title = input.moduleTitle?.trim() ?? "";
  const scopeLines = [
    "Run only this module step in order.",
    "Do not run later chain modules in this execution.",
    title.length > 0 ? `Current module: ${title}.` : "",
  ].filter((line) => line.length > 0);

  const chainLines =
    chainPrior.length === 0
      ? []
      : [
          "",
          "Prior module output (use as input where this prompt needs it):",
          chainPrior,
        ];

  const baseInstructions = input.runnerInstructions?.trim() ?? "";
  const instructions = [...scopeLines, baseInstructions]
    .filter((line) => line.length > 0)
    .join("\n");

  return buildPromptSdlcRunPrompt({
    promptText: input.promptText,
    instructions: `${instructions}${chainLines.join("\n")}`,
  });
};
