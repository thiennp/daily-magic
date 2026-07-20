"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
  SEND_TASK_WRITER_AGENT_QUERY_PARAM,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useContinueFromSourceRunPrefill = (input: {
  readonly setWriterAgent: (writerAgent: HarnessWriterAgent) => void;
}): void => {
  const searchParams = useSearchParams();
  const sourceRunId =
    searchParams.get(SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM) ?? "";
  const writerAgentFromUrl = searchParams.get(
    SEND_TASK_WRITER_AGENT_QUERY_PARAM,
  );

  useEffect(() => {
    if (sourceRunId.length === 0) {
      return;
    }

    const cachedRun = getAgentRunLocalCache(sourceRunId);
    const writerFromRun =
      cachedRun !== null && isHarnessWriterAgent(cachedRun.writerAgent)
        ? cachedRun.writerAgent
        : null;
    const writerFromUrl = isHarnessWriterAgent(writerAgentFromUrl)
      ? writerAgentFromUrl
      : null;
    const writerAgent = writerFromRun ?? writerFromUrl;

    if (writerAgent !== null) {
      input.setWriterAgent(writerAgent);
    }
  }, [input, sourceRunId, writerAgentFromUrl]);
};
