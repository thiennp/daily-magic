import { AGENT_RUN_NEXT_ACTIONS_INSTRUCTION } from "@/lib/dispatch/agentRunNextActions.constant";
import { wrapPromptWithAgentRunInputGuardrails } from "@/lib/dispatch/agentRunInputGuardrails.constant";
import { wrapPromptWithAgentRunProgressInstruction } from "@/lib/dispatch/agentRunProgress.constant";
import { wrapPromptForMarketplaceRunWriteStage } from "@/lib/marketplace/runRecipe/wrapPromptForMarketplaceRunWriteStage";

export const wrapPromptForAgentRun = (
  prompt: string,
  options?: {
    readonly includeNextActions?: boolean;
    readonly marketplaceTemplateId?: string | null;
  },
): string => {
  const withMarketplaceWrite = wrapPromptForMarketplaceRunWriteStage(
    prompt,
    options?.marketplaceTemplateId,
  );

  const withNextActions =
    options?.includeNextActions === true
      ? `${withMarketplaceWrite}\n\n---\n${AGENT_RUN_NEXT_ACTIONS_INSTRUCTION}`
      : withMarketplaceWrite;

  const withProgress =
    wrapPromptWithAgentRunProgressInstruction(withNextActions);

  return wrapPromptWithAgentRunInputGuardrails(withProgress);
};
