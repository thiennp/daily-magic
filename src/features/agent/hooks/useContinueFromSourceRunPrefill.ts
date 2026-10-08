"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
  SEND_TASK_WRITER_AGENT_QUERY_PARAM,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { resolveSendTaskLinkWriterChoice } from "@/features/agent/utils/resolveSendTaskLinkWriterAgent";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * 37874fdc: `?writerAgent=` was only read together with `sourceRunId`, so a
 * plain deep link was ignored. The link's writer now applies on its own and
 * wins over the source run's; each link value applies once, so a later pick
 * in the dialog is not overwritten on the next render.
 */
export const useContinueFromSourceRunPrefill = (input: {
  readonly setWriterAgent: (writerAgent: HarnessWriterAgent) => void;
  /** 9bad2e07: an explicit link writer, honored even when not Ready. */
  readonly honorLinkWriterAgent: (writerAgent: HarnessWriterAgent) => void;
}): void => {
  const searchParams = useSearchParams();
  const sourceRunId =
    searchParams.get(SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM) ?? "";
  const writerAgentFromUrl = searchParams.get(
    SEND_TASK_WRITER_AGENT_QUERY_PARAM,
  );
  const appliedKeyRef = useRef<string | null>(null);
  const { setWriterAgent, honorLinkWriterAgent } = input;

  useEffect(() => {
    const key = `${sourceRunId}|${writerAgentFromUrl ?? ""}`;
    if (appliedKeyRef.current === key) {
      return;
    }
    appliedKeyRef.current = key;
    const cachedRun =
      sourceRunId.length > 0 ? getAgentRunLocalCache(sourceRunId) : null;
    const choice = resolveSendTaskLinkWriterChoice({
      writerAgentFromUrl,
      writerAgentFromRun: cachedRun?.writerAgent ?? null,
    });

    if (choice === null) {
      return;
    }
    if (choice.isExplicit) {
      honorLinkWriterAgent(choice.writerAgent);
      return;
    }
    setWriterAgent(choice.writerAgent);
  }, [honorLinkWriterAgent, setWriterAgent, sourceRunId, writerAgentFromUrl]);
};
