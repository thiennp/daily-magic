"use client";

import {
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

import { buildDemoClaudePromptAck } from "@/features/agent/utils/buildDemoClaudePromptAck";
import { dispatchWriterSessionStart } from "@/features/agent/utils/dispatchWriterSessionStart";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import { formatWriterSessionStartDisplayCommand } from "@/lib/agentWitch/formatWriterCliDisplayCommand";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useAgentWitchWriterSessionStart = (input: {
  readonly socketRef: RefObject<WebSocket | null>;
  readonly connectionLab: unknown;
  readonly beginSession: (
    commandLine: string,
    writerAgent: HarnessWriterAgent,
    deviceId?: string,
  ) => void;
  readonly applySocketMessage: (raw: string) => void;
  readonly setLastResponse: Dispatch<SetStateAction<AgentWitchSocketDisplay>>;
}): ((writerAgent: HarnessWriterAgent, targetDeviceId?: string) => void) =>
  useCallback(
    (writerAgent, targetDeviceId) => {
      input.beginSession(
        formatWriterSessionStartDisplayCommand(writerAgent),
        writerAgent,
        targetDeviceId && targetDeviceId.length > 0
          ? targetDeviceId
          : undefined,
      );

      if (input.connectionLab !== null) {
        input.setLastResponse(
          parseAgentWitchSocketDisplay(buildDemoClaudePromptAck()),
        );
        return;
      }

      void dispatchWriterSessionStart({
        socket: input.socketRef.current,
        writerAgent,
        targetDeviceId,
        onResponse: (raw) => {
          input.applySocketMessage(raw);
          input.setLastResponse(parseAgentWitchSocketDisplay(raw));
        },
      });
    },
    [input],
  );
