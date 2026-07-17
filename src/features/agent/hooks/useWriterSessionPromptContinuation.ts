"use client";

import { useRef } from "react";

import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

type SendClaudePrompt = (
  prompt: string,
  options?: {
    readonly writerAgent: HarnessWriterAgent;
    readonly targetUserId?: string;
    readonly groupId?: string;
    readonly capabilityId?: string;
    readonly targetDeviceId?: string;
  },
) => void;

type StartWriterSession = (
  writerAgent: HarnessWriterAgent,
  targetDeviceId?: string,
) => void;

export const useWriterSessionPromptContinuation = (input: {
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly finishSessionBase: () => void;
}): {
  readonly isSessionContinuation: () => boolean;
  readonly bindSendClaudePrompt: (
    dispatch: SendClaudePrompt,
  ) => SendClaudePrompt;
  readonly bindStartWriterSession: (
    startBase: StartWriterSession,
  ) => StartWriterSession;
  readonly finishLiveTerminalSession: () => void;
} => {
  const hasSentUserPromptInWriterSessionRef = useRef(false);

  return {
    isSessionContinuation: () =>
      input.sessionWriterAgent !== null &&
      hasSentUserPromptInWriterSessionRef.current,
    bindSendClaudePrompt: (dispatch) => (prompt, options) => {
      dispatch(prompt, options);
      if (input.sessionWriterAgent !== null || options !== undefined) {
        hasSentUserPromptInWriterSessionRef.current = true;
      }
    },
    bindStartWriterSession: (startBase) => (writerAgent, targetDeviceId) => {
      hasSentUserPromptInWriterSessionRef.current = false;
      startBase(writerAgent, targetDeviceId);
    },
    finishLiveTerminalSession: () => {
      hasSentUserPromptInWriterSessionRef.current = false;
      input.finishSessionBase();
    },
  };
};
