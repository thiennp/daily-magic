import { AGENT_RUN_NEXT_ACTIONS_INSTRUCTION } from "@/lib/dispatch/agentRunNextActions.constant";
import { wrapPromptWithAgentRunReportInstruction } from "@/lib/dispatch/agentRunReport.constant";
import { wrapPromptWithAgentRunInputGuardrails } from "@/lib/dispatch/agentRunInputGuardrails.constant";
import { wrapPromptWithAgentRunProgressInstruction } from "@/lib/dispatch/agentRunProgress.constant";

export const wrapPromptForAgentRun = (
  prompt: string,
  options?: {
    readonly includeNextActions?: boolean;
    readonly agentRunId?: string;
    readonly projectFolderPath?: string;
  },
): string => {
  const withNextActions =
    options?.includeNextActions === true
      ? `${prompt.trim()}\n\n---\n${AGENT_RUN_NEXT_ACTIONS_INSTRUCTION}`
      : prompt.trim();

  const withProgress =
    wrapPromptWithAgentRunProgressInstruction(withNextActions);

  const withReport =
    options?.agentRunId !== undefined &&
    options.agentRunId.trim().length > 0 &&
    options.projectFolderPath !== undefined &&
    options.projectFolderPath.trim().length > 0
      ? wrapPromptWithAgentRunReportInstruction(withProgress, {
          agentRunId: options.agentRunId.trim(),
          projectFolderPath: options.projectFolderPath.trim(),
        })
      : withProgress;

  return wrapPromptWithAgentRunInputGuardrails(withReport);
};
