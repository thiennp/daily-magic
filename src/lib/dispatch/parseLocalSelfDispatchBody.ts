import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export interface LocalSelfDispatchBody {
  readonly agentRunId: string;
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
}

export const parseLocalSelfDispatchBody = (
  body: unknown,
): LocalSelfDispatchBody | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const agentRunId =
    typeof record.agentRunId === "string" ? record.agentRunId.trim() : "";
  const prompt = typeof record.prompt === "string" ? record.prompt.trim() : "";
  const writerAgent =
    typeof record.writerAgent === "string" ? record.writerAgent : "";

  if (
    agentRunId.length === 0 ||
    prompt.length === 0 ||
    !isHarnessWriterAgent(writerAgent) ||
    writerAgent === "cursor-cloud"
  ) {
    return null;
  }

  return { agentRunId, prompt, writerAgent };
};
