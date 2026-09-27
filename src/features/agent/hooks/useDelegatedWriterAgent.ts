"use client";

import { useCallback, useState } from "react";

import { DELEGATED_WRITER_AGENT_STORAGE_KEY } from "@/features/agent/constants/delegatedWriterAgentStorage.constant";
import { hasStoredDelegatedWriterAgent } from "@/features/agent/utils/hasStoredDelegatedWriterAgent";
import { readDelegatedWriterAgentFromStorage } from "@/features/agent/utils/readDelegatedWriterAgentFromStorage";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export function useDelegatedWriterAgent(): {
  readonly writerAgent: HarnessWriterAgent;
  readonly setWriterAgent: (value: HarnessWriterAgent) => void;
  readonly hasRememberedWriterAgentSelection: boolean;
} {
  const [writerAgent, setWriterAgentState] = useState<HarnessWriterAgent>(
    readDelegatedWriterAgentFromStorage,
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
