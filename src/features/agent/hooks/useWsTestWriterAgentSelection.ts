"use client";

import { useCallback } from "react";

import type { useAgentWitchSocket } from "@/features/agent/hooks/useAgentWitchSocket";
import { useContinueFromSourceRunPrefill } from "@/features/agent/hooks/useContinueFromSourceRunPrefill";
import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { applyWriterAgentPick } from "@/features/agent/utils/applyWriterAgentPick";
import { finishSendTaskSession } from "@/features/agent/utils/finishSendTaskSession";
import { resolvePreferredWriterAgent } from "@/features/agent/utils/resolvePreferredWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * 37874fdc: the open (waiting) Codex session locked the writer, so picking
 * Antigravity in "Choose an AI on your computer" flipped back to Codex and the
 * next Start continued the Codex session. Picks, including `?writerAgent=`,
 * now go through applyWriterAgentPick; the default prefers a runnable writer.
 */
export const useWsTestWriterAgentSelection = (input: {
  readonly socket: ReturnType<typeof useAgentWitchSocket>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
}): {
  readonly writerAgent: HarnessWriterAgent;
  readonly pickWriterAgent: (value: HarnessWriterAgent) => void;
  readonly setWriterAgent: (value: HarnessWriterAgent) => void;
  readonly hasRememberedWriterAgentSelection: boolean;
} => {
  const delegated = useDelegatedWriterAgent();
  const { socket } = input;
  const { setWriterAgent } = delegated;
  const pickWriterAgent = useCallback(
    (value: HarnessWriterAgent) => {
      applyWriterAgentPick({
        value,
        sessionWriterAgent: socket.sessionWriterAgent,
        finishSession: () => finishSendTaskSession(socket),
        setWriterAgent,
      });
    },
    [setWriterAgent, socket],
  );
  useContinueFromSourceRunPrefill({ setWriterAgent: pickWriterAgent });
  const writerAgent = resolvePreferredWriterAgent({
    writerAgent: delegated.writerAgent,
    isExplicitPick: delegated.hasPickedWriterAgentInView,
    writers: input.composer.macDevices.find(
      (device) => device.id === input.composer.selectedDeviceId,
    )?.writers,
  });

  return {
    writerAgent,
    pickWriterAgent,
    setWriterAgent,
    hasRememberedWriterAgentSelection:
      delegated.hasRememberedWriterAgentSelection,
  };
};
