import { reconcilePromptSdlcAvoidReasons } from "@/lib/promptOptimizer/reconcilePromptSdlcAvoidReasons";

export const formatPromptSdlcWizardAvoidBlock = (
  items: readonly string[],
): string => {
  const lines = reconcilePromptSdlcAvoidReasons(items);
  if (lines.length === 0) {
    return "";
  }
  return ["Avoid:", ...lines.map((line) => `- ${line}`)].join("\n");
};
