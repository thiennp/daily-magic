import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

export const buildClaudeDispatchPayloadFromBody = (
  body: AgentRunDispatchBody,
): Readonly<Record<string, unknown>> & { readonly prompt: string } => ({
  prompt: body.prompt,
  ...(body.writerAgent !== undefined ? { writerAgent: body.writerAgent } : {}),
  ...(body.targetUserId !== undefined
    ? { targetUserId: body.targetUserId }
    : {}),
  ...(body.groupId !== undefined && body.groupId !== null
    ? { groupId: body.groupId }
    : {}),
  ...(body.capabilityId !== undefined && body.capabilityId !== null
    ? { capabilityId: body.capabilityId }
    : {}),
  ...(body.targetDeviceId !== undefined
    ? { targetDeviceId: body.targetDeviceId }
    : {}),
  ...(body.sessionContinuation === true ? { sessionContinuation: true } : {}),
  ...(typeof body.sourceRunId === "string" && body.sourceRunId.length > 0
    ? { sourceRunId: body.sourceRunId }
    : {}),
});
