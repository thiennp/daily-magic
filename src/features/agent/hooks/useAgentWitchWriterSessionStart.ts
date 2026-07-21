"use client";

import {
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

import { dispatchWriterSessionStart } from "@/features/agent/utils/dispatchWriterSessionStart";
import { formatWriterSessionStartDisplayCommand } from "@/lib/agentWitch/formatWriterCliDisplayCommand";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const DEMO_WRITER_SESSION_READY_LABELS: Record<HarnessWriterAgent, string> = {
  "claude-cli": "Claude",
  codex: "Codex",
  cursor: "Cursor",
  "cursor-cloud": "Cursor Cloud",
  antigravity: "Antigravity",
};

const buildDemoWriterSessionReady = (writerAgent: HarnessWriterAgent): string =>
  JSON.stringify({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY,
    payload: {
      writerAgent,
      output: `${DEMO_WRITER_SESSION_READY_LABELS[writerAgent]} is ready on your Mac.\nSend a task from the box below when you are ready.\n`,
      exitCode: 0,
    },
  });

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
        const demoReady = buildDemoWriterSessionReady(writerAgent);
        input.applySocketMessage(demoReady);
        input.setLastResponse(parseAgentWitchSocketDisplay(demoReady));
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
