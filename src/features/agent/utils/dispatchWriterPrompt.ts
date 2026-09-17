import { postOfficialWorkflowRunStart } from "@/features/agent/utils/postOfficialWorkflowRunStart";
import { postClaudePromptDispatch } from "@/features/agent/utils/postWriterPromptDispatch";
import { sendClaudePromptOverSocket } from "@/features/agent/utils/sendWriterPromptOverSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export async function dispatchClaudePrompt(input: {
  readonly socket: WebSocket | null;
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly targetDeviceId?: string;
  readonly sessionContinuation?: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
  readonly projectId?: string;
  readonly fieldValues?: Readonly<Record<string, string>>;
  readonly useOfficialWorkflowOrchestration?: boolean;
  readonly onResponse: (response: string) => void;
  readonly onDispatchedRunId?: (runId: string) => void;
}): Promise<void> {
  if (
    input.useOfficialWorkflowOrchestration === true &&
    input.capabilityId !== undefined &&
    input.capabilityId.length > 0
  ) {
    try {
      const raw = await postOfficialWorkflowRunStart({
        capabilityId: input.capabilityId,
        fieldValues: input.fieldValues ?? {},
        writerAgent: input.writerAgent,
        targetUserId: input.targetUserId,
        groupId: input.groupId,
        targetDeviceId: input.targetDeviceId,
      });
      input.onResponse(raw);
      return;
    } catch {
      input.onResponse(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
          payload: { errorMessage: "Workflow start failed." },
        }),
      );
      return;
    }
  }

  try {
    const raw = await postClaudePromptDispatch({
      prompt: input.prompt,
      writerAgent: input.writerAgent,
      targetUserId: input.targetUserId,
      groupId: input.groupId,
      capabilityId: input.capabilityId,
      targetDeviceId: input.targetDeviceId,
      sessionContinuation: input.sessionContinuation,
      sourceRunId: input.sourceRunId,
      projectFolderPath: input.projectFolderPath,
      projectId: input.projectId,
      onDispatchedRunId: input.onDispatchedRunId,
    });
    input.onResponse(raw);
    return;
  } catch {
    sendClaudePromptOverSocket({
      socket: input.socket,
      prompt: input.prompt,
      writerAgent: input.writerAgent,
      targetUserId: input.targetUserId,
      groupId: input.groupId,
      capabilityId: input.capabilityId,
      targetDeviceId: input.targetDeviceId,
      sessionContinuation: input.sessionContinuation,
      sourceRunId: input.sourceRunId,
      projectFolderPath: input.projectFolderPath,
      onResponse: input.onResponse,
    });
  }
}
