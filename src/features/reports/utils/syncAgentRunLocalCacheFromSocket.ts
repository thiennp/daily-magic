import { setAgentRunTerminalOutput } from "@/features/agent/utils/agentRunTerminalOutputStore";
import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
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

export const syncAgentRunLocalCacheFromSocket = (raw: string): boolean => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !isRecord(parsed) ||
      parsed.type !== AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD ||
      !isRecord(parsed.payload)
    ) {
      return false;
    }

    const run = parseAgentRunRecord(parsed.payload.run);
    if (run === null) {
      return false;
    }

    upsertAgentRunLocalCache(run);

    if (
      run.resultOutput !== null &&
      run.resultOutput.length > 0 &&
      (run.status === AgentRunStatus.COMPLETED ||
        run.status === AgentRunStatus.FAILED)
    ) {
      setAgentRunTerminalOutput(run.id, run.resultOutput);
    }

    return true;
  } catch {
    return false;
  }
};
