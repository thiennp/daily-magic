"use client";

import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import type { useAwcProjectTasksAssignPeers } from "@/features/projects/tasks/useAwcProjectTasksAssignPeers";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * Coding tool for the Assign dialog. A tool-specific agent carries its own
 * tool; the select only matters for a computer that never reported its tools.
 */
export const useAwcProjectTasksAssignWriter = (
  peers: ReturnType<typeof useAwcProjectTasksAssignPeers>,
) => {
  const { writerAgent, setWriterAgent } = useDelegatedWriterAgent();
  const option = peers.selectedOption;
  const isComputer = option?.memberKind === "computer";
  const pickedWriter = option?.writerAgent as HarnessWriterAgent | undefined;
  const effectiveWriter = pickedWriter ?? writerAgent;
  return {
    writerAgent: effectiveWriter,
    setWriterAgent,
    isComputer,
    /** Show the tool select only when the agent does not fix the tool. */
    needsToolSelect: isComputer && pickedWriter === undefined,
    draftFields: isComputer ? { writerAgent: effectiveWriter } : {},
  };
};
