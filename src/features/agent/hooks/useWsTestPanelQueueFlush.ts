import { useEffect, useRef } from "react";

import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WsTestConnectionStatus } from "@/features/agent/types/public-api/types";

type QueueFlushSendPrompt = (
  prompt: string,
  options: {
    readonly writerAgent: HarnessWriterAgent;
    readonly targetUserId?: string;
    readonly groupId?: string;
    readonly capabilityId?: string;
    readonly projectId: string;
  },
) => void;

interface UseWsTestPanelQueueFlushInput {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly flushQueue: (
    sendPrompt: QueueFlushSendPrompt,
    writerAgent: HarnessWriterAgent,
    projectId: string,
  ) => Promise<void>;
  readonly sendClaudePrompt: QueueFlushSendPrompt;
  readonly writerAgent: HarnessWriterAgent;
  readonly projectId: string;
}

export function useWsTestPanelQueueFlush({
  connectionStatus,
  flushQueue,
  sendClaudePrompt,
  writerAgent,
  projectId,
}: UseWsTestPanelQueueFlushInput): void {
  const flushedOnConnectRef = useRef(false);

  useEffect(() => {
    if (connectionStatus === "connected") {
      if (!flushedOnConnectRef.current && projectId.trim().length > 0) {
        flushedOnConnectRef.current = true;
        void flushQueue(sendClaudePrompt, writerAgent, projectId);
      }
      return;
    }

    flushedOnConnectRef.current = false;
  }, [connectionStatus, flushQueue, projectId, sendClaudePrompt, writerAgent]);
}
