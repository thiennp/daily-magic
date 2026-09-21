import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { generateAgentRunReportKey } from "@/lib/dispatch/generateAgentRunReportKey";
import { wrapPromptForAgentRun } from "@/lib/dispatch/wrapPromptForAgentRun";

export const buildCommandClaudeRunDispatchMessage = (input: {
  readonly prompt: string;
  readonly agentRunId: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly requestId?: string;
  readonly includeNextActions?: boolean;
  readonly marketplaceTemplateId?: string | null;
  readonly sessionContinuation?: boolean;
  readonly sourceRunId?: string;
  readonly shellSessionId?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
  readonly compositionSnapshot?: ProjectCompositionSnapshotWire;
}): AgentWitchMessage => {
  const trimmedProjectFolderPath = input.projectFolderPath?.trim();
  const reportKey =
    trimmedProjectFolderPath !== undefined &&
    trimmedProjectFolderPath.length > 0
      ? generateAgentRunReportKey()
      : undefined;

  const marketplaceTemplateId = input.marketplaceTemplateId?.trim();

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    payload: {
      prompt: wrapPromptForAgentRun(input.prompt, {
        includeNextActions: input.includeNextActions === true,
        ...(marketplaceTemplateId !== undefined &&
        marketplaceTemplateId.length > 0
          ? { marketplaceTemplateId }
          : {}),
      }),
      agentRunId: input.agentRunId,
      writerAgent: input.writerAgent,
      ...(input.sessionContinuation === true
        ? { sessionContinuation: true }
        : {}),
      ...(input.sourceRunId !== undefined
        ? { sourceRunId: input.sourceRunId }
        : {}),
      ...(input.shellSessionId !== undefined
        ? { shellSessionId: input.shellSessionId }
        : {}),
      ...(trimmedProjectFolderPath !== undefined &&
      trimmedProjectFolderPath.length > 0
        ? { projectFolderPath: trimmedProjectFolderPath }
        : {}),
      ...(typeof input.projectId === "string" && input.projectId.length > 0
        ? { projectId: input.projectId }
        : {}),
      ...(input.compositionSnapshot !== undefined
        ? { compositionSnapshot: input.compositionSnapshot }
        : {}),
      ...(reportKey !== undefined ? { reportKey } : {}),
      ...(marketplaceTemplateId !== undefined &&
      marketplaceTemplateId.length > 0
        ? { marketplaceTemplateId }
        : {}),
    },
    requestId: input.requestId,
  };
};
