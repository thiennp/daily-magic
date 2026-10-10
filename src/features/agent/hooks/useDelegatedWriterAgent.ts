"use client";

import { useCallback, useState } from "react";

import { DELEGATED_WRITER_AGENT_STORAGE_KEY } from "@/features/agent/constants/public-api/types";
import { hasStoredDelegatedWriterAgent } from "@/features/agent/utils/hasStoredDelegatedWriterAgent";
import { readDelegatedWriterAgentFromStorage } from "@/features/agent/utils/readDelegatedWriterAgentFromStorage";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export function useDelegatedWriterAgent(): {
  readonly writerAgent: HarnessWriterAgent;
  readonly setWriterAgent: (value: HarnessWriterAgent) => void;
  readonly hasRememberedWriterAgentSelection: boolean;
  /** True once the user picked a writer in this view (not just remembered). */
  readonly hasPickedWriterAgentInView: boolean;
  /** 72ae6076: a link / source-run writer; only used while it is Ready. */
  readonly presetWriterAgent: (value: HarnessWriterAgent) => void;
  /** 9bad2e07: an explicit `?writerAgent=`; counts as a pick, not saved. */
  readonly honorLinkWriterAgent: (value: HarnessWriterAgent) => void;
  /** "Pick another coding tool": the old pick no longer counts as a click. */
  readonly forgetWriterAgentPickInView: () => void;
} {
  const [writerAgent, setWriterAgentState] = useState<HarnessWriterAgent>(
    readDelegatedWriterAgentFromStorage,
  );
  const [
    hasRememberedWriterAgentSelection,
    setHasRememberedWriterAgentSelection,
  ] = useState(hasStoredDelegatedWriterAgent);
  const [hasPickedWriterAgentInView, setHasPickedWriterAgentInView] =
    useState(false);

  const setWriterAgent = useCallback((value: HarnessWriterAgent) => {
    setWriterAgentState(value);
    window.localStorage.setItem(DELEGATED_WRITER_AGENT_STORAGE_KEY, value);
    setHasRememberedWriterAgentSelection(true);
    setHasPickedWriterAgentInView(true);
  }, []);

  const presetWriterAgent = useCallback((value: HarnessWriterAgent) => {
    setWriterAgentState(value);
  }, []);

  const honorLinkWriterAgent = useCallback((value: HarnessWriterAgent) => {
    setWriterAgentState(value);
    setHasPickedWriterAgentInView(true);
  }, []);

  const forgetWriterAgentPickInView = useCallback(() => {
    setHasPickedWriterAgentInView(false);
  }, []);

  return {
    writerAgent,
    setWriterAgent,
    presetWriterAgent,
    honorLinkWriterAgent,
    forgetWriterAgentPickInView,
    hasRememberedWriterAgentSelection,
    hasPickedWriterAgentInView,
  };
}
