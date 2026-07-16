"use client";

import { useEffect } from "react";

import type { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useWsTestPanelQueueFlush } from "@/features/agent/hooks/useWsTestPanelQueueFlush";
import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useWsTestPanelLifecycle = (input: {
  readonly connectionStatus: ReturnType<
    typeof useAgentWitchSocket
  >["connectionStatus"];
  readonly flushQueue: ReturnType<typeof useAgentRunQueue>["flushQueue"];
  readonly refreshCount: ReturnType<typeof useAgentRunQueue>["refreshCount"];
  readonly sendClaudePrompt: ReturnType<
    typeof useAgentWitchSocket
  >["sendClaudePrompt"];
  readonly writerAgent: HarnessWriterAgent;
}): void => {
  const { refreshCount } = input;

  useEffect(() => {
    void refreshCount();
  }, [refreshCount]);

  useWsTestPanelQueueFlush({
    connectionStatus: input.connectionStatus,
    flushQueue: input.flushQueue,
    sendClaudePrompt: input.sendClaudePrompt,
    writerAgent: input.writerAgent,
  });
};
