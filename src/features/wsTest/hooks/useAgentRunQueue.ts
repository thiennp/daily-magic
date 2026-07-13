"use client";

import { useCallback, useState } from "react";

import {
  deleteQueuedAgentRunRequest,
  enqueueAgentRunRequest,
  fetchQueuedAgentRuns,
} from "@/features/wsTest/utils/agentRunQueueClient";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export function useAgentRunQueue(): {
  readonly queueCount: number;
  readonly queueMessage: string | null;
  readonly enqueueRun: (payload: {
    readonly prompt: string;
    readonly executorUserId?: string;
    readonly groupId?: string | null;
    readonly capabilityId?: string | null;
  }) => Promise<boolean>;
  readonly flushQueue: (
    sendPrompt: (
      prompt: string,
      options: {
        readonly writerAgent: HarnessWriterAgent;
        readonly targetUserId?: string;
        readonly groupId?: string;
        readonly capabilityId?: string;
      },
    ) => void,
    writerAgent: HarnessWriterAgent,
  ) => Promise<void>;
  readonly refreshCount: () => Promise<void>;
} {
  const [queueCount, setQueueCount] = useState(0);
  const [queueMessage, setQueueMessage] = useState<string | null>(null);

  const refreshCount = useCallback(async () => {
    const queued = await fetchQueuedAgentRuns();
    setQueueCount(queued.length);
  }, []);

  const enqueueRun = useCallback(
    async (payload: {
      readonly prompt: string;
      readonly executorUserId?: string;
      readonly groupId?: string | null;
      readonly capabilityId?: string | null;
    }) => {
      const result = await enqueueAgentRunRequest(payload);
      if (!result.ok) {
        setQueueMessage(result.errorMessage);
        return false;
      }

      await refreshCount();
      setQueueMessage("Queued — will send when your Mac is connected.");
      return true;
    },
    [refreshCount],
  );

  const flushQueue = useCallback(
    async (
      sendPrompt: (
        prompt: string,
        options: {
          readonly writerAgent: HarnessWriterAgent;
          readonly targetUserId?: string;
          readonly groupId?: string;
          readonly capabilityId?: string;
        },
      ) => void,
      writerAgent: HarnessWriterAgent,
    ) => {
      const queued = await fetchQueuedAgentRuns();
      if (queued.length === 0) {
        return;
      }

      for (const item of queued) {
        sendPrompt(item.prompt, {
          writerAgent,
          ...(item.groupId
            ? {
                targetUserId: item.executorUserId,
                groupId: item.groupId,
                capabilityId: item.capabilityId ?? undefined,
              }
            : item.capabilityId
              ? { capabilityId: item.capabilityId }
              : {}),
        });
        await deleteQueuedAgentRunRequest(item.id);
      }

      await refreshCount();
      setQueueMessage(
        queued.length === 1
          ? "Sent 1 queued task."
          : `Sent ${queued.length} queued tasks.`,
      );
    },
    [refreshCount],
  );

  return { queueCount, queueMessage, enqueueRun, flushQueue, refreshCount };
}
