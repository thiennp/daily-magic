"use client";

import { useCallback, useState } from "react";

import {
  DEFAULT_DELEGATED_WRITER_AGENT,
  DELEGATED_WRITER_AGENT_STORAGE_KEY,
} from "@/features/agent/constants/delegatedWriterAgentStorage.constant";
import { hasStoredDelegatedWriterAgent } from "@/features/agent/utils/hasStoredDelegatedWriterAgent";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const readStoredWriterAgent = (): HarnessWriterAgent => {
  if (typeof window === "undefined") {
    return DEFAULT_DELEGATED_WRITER_AGENT;
  }

  const stored = window.localStorage.getItem(
    DELEGATED_WRITER_AGENT_STORAGE_KEY,
  );

  return isHarnessWriterAgent(stored) ? stored : DEFAULT_DELEGATED_WRITER_AGENT;
};

export function useDelegatedWriterAgent(): {
  readonly writerAgent: HarnessWriterAgent;
  readonly setWriterAgent: (value: HarnessWriterAgent) => void;
  readonly hasRememberedWriterAgentSelection: boolean;
} {
  const [writerAgent, setWriterAgentState] = useState<HarnessWriterAgent>(
    readStoredWriterAgent,
  );
  const [
    hasRememberedWriterAgentSelection,
    setHasRememberedWriterAgentSelection,
  ] = useState(hasStoredDelegatedWriterAgent);

  const setWriterAgent = useCallback((value: HarnessWriterAgent) => {
    setWriterAgentState(value);
    window.localStorage.setItem(DELEGATED_WRITER_AGENT_STORAGE_KEY, value);
    setHasRememberedWriterAgentSelection(true);
  }, []);

  return {
    writerAgent,
    setWriterAgent,
    hasRememberedWriterAgentSelection,
  };
}
