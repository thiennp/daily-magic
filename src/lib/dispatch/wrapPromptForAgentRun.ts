import { AGENT_RUN_NEXT_ACTIONS_INSTRUCTION } from "@/lib/dispatch/agentRunNextActions.constant";
import { wrapPromptWithAgentRunInputGuardrails } from "@/lib/dispatch/agentRunInputGuardrails.constant";

export const wrapPromptForAgentRun = (
  prompt: string,
  options?: { readonly includeNextActions?: boolean },
): string => {
  const withNextActions =
    options?.includeNextActions === true
      ? `${prompt.trim()}\n\n---\n${AGENT_RUN_NEXT_ACTIONS_INSTRUCTION}`
      : prompt.trim();

  return wrapPromptWithAgentRunInputGuardrails(withNextActions);
};
