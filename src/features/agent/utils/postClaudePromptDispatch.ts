import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseAgentRunRecord = (value: unknown): AgentRunRecord | null => {
  if (!isRecord(value) || typeof value.id !== "string") {
    return null;
  }

  return value as unknown as AgentRunRecord;
};

const buildDispatchErrorRaw = (errorMessage: string): string =>
  JSON.stringify({
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: { errorMessage },
  });

export async function postClaudePromptDispatch(input: {
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly targetDeviceId?: string;
}): Promise<string> {
  const response = await fetch("/api/agent-runs/dispatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: input.prompt,
      writerAgent: input.writerAgent,
      ...(input.targetUserId !== undefined
        ? { targetUserId: input.targetUserId }
        : {}),
      ...(input.groupId !== undefined ? { groupId: input.groupId } : {}),
      ...(input.capabilityId !== undefined
        ? { capabilityId: input.capabilityId }
        : {}),
      ...(input.targetDeviceId !== undefined
        ? { targetDeviceId: input.targetDeviceId }
        : {}),
    }),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!isRecord(data)) {
    return buildDispatchErrorRaw("Dispatch response was invalid.");
  }

  const run = parseAgentRunRecord(data.run);
  if (run !== null) {
    upsertAgentRunLocalCache(run);
  }

  if (isRecord(data.message)) {
    return JSON.stringify(data.message);
  }

  const errorMessage =
    typeof data.errorMessage === "string" && data.errorMessage.length > 0
      ? data.errorMessage
      : "Dispatch failed.";

  return buildDispatchErrorRaw(errorMessage);
}
