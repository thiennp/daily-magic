"use client";

import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import type { useAwcProjectTasksAssignPeers } from "@/features/projects/tasks/useAwcProjectTasksAssignPeers";

/** Coding tool for the Assign dialog; only sent when the assignee is a computer. */
export const useAwcProjectTasksAssignWriter = (
  peers: ReturnType<typeof useAwcProjectTasksAssignPeers>,
) => {
  const { writerAgent, setWriterAgent } = useDelegatedWriterAgent();
  const peer = peers.peers.find((p) => p.membershipId === peers.assistantId);
  const isComputer = peer?.memberKind === "computer";
  const readyWriters = isComputer ? peer.readyWriters : undefined;
  // The saved choice may not run on this computer: fall back to one that does.
  const effectiveWriter =
    readyWriters !== undefined && !readyWriters.includes(writerAgent)
      ? ((readyWriters[0] ?? writerAgent) as typeof writerAgent)
      : writerAgent;
  return {
    writerAgent: effectiveWriter,
    setWriterAgent,
    isComputer,
    readyWriters,
    draftFields: isComputer ? { writerAgent: effectiveWriter } : {},
  };
};
