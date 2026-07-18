import { postClaudePromptDispatch } from "@/features/agent/utils/postClaudePromptDispatch";
import { sendClaudePromptOverSocket } from "@/features/agent/utils/sendClaudePromptOverSocket";
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
  readonly onResponse: (response: string) => void;
}): Promise<void> {
  try {
    const raw = await postClaudePromptDispatch({
      prompt: input.prompt,
      writerAgent: input.writerAgent,
      targetUserId: input.targetUserId,
      groupId: input.groupId,
      capabilityId: input.capabilityId,
      targetDeviceId: input.targetDeviceId,
      sessionContinuation: input.sessionContinuation,
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
      onResponse: input.onResponse,
    });
  }
}
