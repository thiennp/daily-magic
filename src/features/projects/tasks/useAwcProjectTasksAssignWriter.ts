"use client";

import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import type { useAwcProjectTasksAssignPeers } from "@/features/projects/tasks/useAwcProjectTasksAssignPeers";

/** Coding tool for the Assign dialog; only sent when the assignee is a computer. */
export const useAwcProjectTasksAssignWriter = (
  peers: ReturnType<typeof useAwcProjectTasksAssignPeers>,
) => {
  const { writerAgent, setWriterAgent } = useDelegatedWriterAgent();
  const isComputer =
    peers.peers.find((p) => p.membershipId === peers.assistantId)
      ?.memberKind === "computer";
  return {
    writerAgent,
    setWriterAgent,
    isComputer,
    draftFields: isComputer ? { writerAgent } : {},
  };
};
