"use client";

import {
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

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
) => void) =>
  useCallback(
    (prompt, options) => {
      const trimmedPrompt = prompt.trim();
      if (trimmedPrompt.length === 0 || options === undefined) {
        return;
      }

      if (isMacTerminalDispatch(options)) {
        input.beginSession(
          formatAgentLiveTerminalCommandLine(
            trimmedPrompt,
            options.writerAgent,
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
        onResponse: (raw) => {
          input.applySocketMessage(raw);
          input.setLastResponse(parseAgentWitchSocketDisplay(raw));
        },
      });
    },
    [input],
  );
