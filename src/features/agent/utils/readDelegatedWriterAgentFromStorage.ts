import {
  DEFAULT_DELEGATED_WRITER_AGENT,
  DELEGATED_WRITER_AGENT_STORAGE_KEY,
} from "@/features/agent/constants/public-api/types";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const readDelegatedWriterAgentFromStorage = (): HarnessWriterAgent => {
  if (typeof window === "undefined") {
    return DEFAULT_DELEGATED_WRITER_AGENT;
  }

  const stored = window.localStorage.getItem(
    DELEGATED_WRITER_AGENT_STORAGE_KEY,
  );

  return isHarnessWriterAgent(stored) ? stored : DEFAULT_DELEGATED_WRITER_AGENT;
};

export default readDelegatedWriterAgentFromStorage;
