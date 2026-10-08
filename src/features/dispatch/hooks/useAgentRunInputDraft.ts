"use client";

import { useState } from "react";

import {
  clearAgentRunInputDraft,
  getAgentRunInputDraft,
  setAgentRunInputDraft,
} from "@/features/dispatch/utils/agentRunInputDraftStore";

/** a6053d1c: the answer draft survives closing and reopening the question. */
export const useAgentRunInputDraft = (request: {
  readonly agentRunId: string;
  readonly question: string;
}): {
  readonly response: string;
  readonly setResponse: (next: string) => void;
  readonly clearDraft: () => void;
} => {
  const [response, setResponseState] = useState(() =>
    getAgentRunInputDraft(request.agentRunId, request.question),
  );
  return {
    response,
    setResponse: (next) => {
      setResponseState(next);
      setAgentRunInputDraft(request.agentRunId, request.question, next);
    },
    clearDraft: () =>
      clearAgentRunInputDraft(request.agentRunId, request.question),
  };
};
