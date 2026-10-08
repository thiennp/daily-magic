import { useEffect, useState } from "react";

import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

type Listener = () => void;

const requests = new Map<string, AgentRunInputRequest>();
const listeners = new Set<Listener>();

export function getPendingInputForRun(
  runId: string,
): AgentRunInputRequest | undefined {
  return requests.get(runId);
}

export function setPendingInputForRun(
  runId: string,
  request: AgentRunInputRequest,
): void {
  requests.set(runId, request);
  listeners.forEach((l) => l());
}

export function clearPendingInputForRun(runId: string): void {
  if (requests.has(runId)) {
    requests.delete(runId);
    listeners.forEach((l) => l());
  }
}

export function subscribeToPendingInput(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useAgentRunInputRequest(
  runId: string | null | undefined,
): AgentRunInputRequest | null {
  const [request, setRequest] = useState<AgentRunInputRequest | null>(() =>
    runId ? (getPendingInputForRun(runId) ?? null) : null,
  );

  useEffect(() => {
    if (!runId) {
      return;
    }
    const unsub = subscribeToPendingInput(() => {
      setRequest(getPendingInputForRun(runId) ?? null);
    });
    return unsub;
  }, [runId]);

  return request;
}
