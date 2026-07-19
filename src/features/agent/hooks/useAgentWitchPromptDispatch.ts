"use client";

import {
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import { useSearchParams } from "next/navigation";

import { SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM } from "@/features/agent/constants/sendTaskModalQuery.constant";

import { buildDemoClaudePromptAck } from "@/features/agent/utils/buildDemoClaudePromptAck";
import { formatAgentLiveTerminalCommandLine } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { isMacTerminalDispatch } from "@/features/agent/utils/isMacTerminalDispatch";
import { dispatchClaudePrompt } from "@/features/agent/utils/dispatchClaudePrompt";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useAgentWitchPromptDispatch = (input: {
  readonly socketRef: RefObject<WebSocket | null>;
  readonly connectionLab: unknown;
  readonly isSessionContinuation: () => boolean;
  readonly beginSession: (
    commandLine: string,
    writerAgent: HarnessWriterAgent,
    deviceId?: string,
  ) => void;
  readonly applySocketMessage: (raw: string) => void;
  readonly setLastResponse: Dispatch<SetStateAction<AgentWitchSocketDisplay>>;
}): ((
  prompt: string,
  options?: {
    readonly writerAgent: HarnessWriterAgent;
    readonly targetUserId?: string;
    readonly groupId?: string;
    readonly capabilityId?: string;
    readonly targetDeviceId?: string;
  },
) => void) => {
  const searchParams = useSearchParams();
  const sourceRunId =
    searchParams.get(SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM) ?? "";

  return useCallback(
    (prompt, options) => {
      const trimmedPrompt = prompt.trim();
      if (trimmedPrompt.length === 0 || options === undefined) {
        return;
      }

      const sessionContinuation = input.isSessionContinuation();
      const sessionTurn = sessionContinuation ? "continue" : "first";

      if (isMacTerminalDispatch(options)) {
        input.beginSession(
          formatAgentLiveTerminalCommandLine(
            trimmedPrompt,
            options.writerAgent,
            sessionTurn,
          ),
          options.writerAgent,
          options.targetDeviceId,
        );
      }

      if (input.connectionLab !== null) {
        input.setLastResponse(
          parseAgentWitchSocketDisplay(buildDemoClaudePromptAck()),
        );
        return;
      }

      void dispatchClaudePrompt({
        socket: input.socketRef.current,
        prompt: trimmedPrompt,
        writerAgent: options.writerAgent,
        targetUserId: options.targetUserId,
        groupId: options.groupId,
        capabilityId: options.capabilityId,
        targetDeviceId: options.targetDeviceId,
        sessionContinuation,
        ...(sourceRunId.length > 0 ? { sourceRunId } : {}),
        onResponse: (raw) => {
          input.applySocketMessage(raw);
          input.setLastResponse(parseAgentWitchSocketDisplay(raw));
        },
      });
    },
    [input, sourceRunId],
  );
};
