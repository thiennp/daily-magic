import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import isClaudeDispatchPayload from "@/lib/agentWitch/isClaudeDispatchPayload";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export interface AgentRunDispatchBody {
  readonly prompt: string;
  readonly writerAgent?: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string | null;
  readonly capabilityId?: string | null;
  readonly targetDeviceId?: string;
  readonly sessionContinuation?: boolean;
  readonly sourceRunId?: string;
  readonly projectFolderPath?: string;
}

export const parseAgentRunDispatchBody = (
  body: unknown,
): AgentRunDispatchBody | null => {
  if (!isClaudeDispatchPayload(body)) {
    return null;
  }

  const writerAgent = isHarnessWriterAgent(body.writerAgent)
    ? body.writerAgent
    : undefined;

  return {
    prompt: body.prompt.trim(),
    ...(writerAgent !== undefined ? { writerAgent } : {}),
    ...(typeof body.targetUserId === "string" && body.targetUserId.length > 0
      ? { targetUserId: body.targetUserId }
      : {}),
    ...(typeof body.groupId === "string" && body.groupId.length > 0
      ? { groupId: body.groupId }
      : { groupId: null }),
    ...(typeof body.capabilityId === "string" && body.capabilityId.length > 0
      ? { capabilityId: body.capabilityId }
      : { capabilityId: null }),
    ...(typeof body.targetDeviceId === "string" &&
    body.targetDeviceId.length > 0
      ? { targetDeviceId: body.targetDeviceId }
      : {}),
    ...(body.sessionContinuation === true ? { sessionContinuation: true } : {}),
    ...(typeof body.sourceRunId === "string" && body.sourceRunId.length > 0
      ? { sourceRunId: body.sourceRunId }
      : {}),
    ...(typeof body.projectFolderPath === "string" &&
    body.projectFolderPath.length > 0
      ? { projectFolderPath: body.projectFolderPath }
      : {}),
  };
};
