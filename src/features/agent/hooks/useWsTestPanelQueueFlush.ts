import { useEffect, useRef } from "react";

import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

type QueueFlushSendPrompt = (
  prompt: string,
  options: {
    readonly writerAgent: HarnessWriterAgent;
    readonly targetUserId?: string;
    readonly groupId?: string;
    readonly capabilityId?: string;
  },
) => void;

interface UseWsTestPanelQueueFlushInput {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly flushQueue: (
    sendPrompt: QueueFlushSendPrompt,
    writerAgent: HarnessWriterAgent,
  ) => Promise<void>;
  readonly sendClaudePrompt: QueueFlushSendPrompt;
  readonly writerAgent: HarnessWriterAgent;
}

export function useWsTestPanelQueueFlush({
  connectionStatus,
  flushQueue,
  sendClaudePrompt,
  writerAgent,
}: UseWsTestPanelQueueFlushInput): void {
  const flushedOnConnectRef = useRef(false);

  useEffect(() => {
    if (connectionStatus === "connected") {
      if (!flushedOnConnectRef.current) {
        flushedOnConnectRef.current = true;
        void flushQueue(sendClaudePrompt, writerAgent);
      }
      return;
    }

    flushedOnConnectRef.current = false;
  }, [connectionStatus, flushQueue, sendClaudePrompt, writerAgent]);
}
