"use client";

import {
  useCallback,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import { useSearchParams } from "next/navigation";

import {
  SEND_TASK_CONTINUE_SESSION_QUERY_PARAM,
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
} from "@/features/agent/constants/public-api/types";

import { buildDemoWriterPromptAck } from "@/features/agent/utils/buildDemoWriterPromptAck";
import { formatAgentLiveTerminalCommandLine } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { isMacTerminalDispatch } from "@/features/agent/utils/isMacTerminalDispatch";
import { dispatchClaudePrompt } from "@/features/agent/utils/dispatchWriterPrompt";
import { resolveWriterPromptDispatchContinuation } from "@/features/agent/utils/resolveWriterPromptDispatchContinuation";
import { resolveWriterPromptDispatchSessionTurn } from "@/features/agent/utils/resolveWriterPromptDispatchSessionTurn";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WriterPromptDispatchOptions } from "@/features/agent/types/public-api/types";

export const useAgentWitchPromptDispatch = (input: {
  readonly socketRef: RefObject<WebSocket | null>;
  readonly connectionLab: unknown;
  readonly isSessionContinuation: () => boolean;
  readonly liveRunId: string | null;
  readonly beginSession: (
    commandLine: string,
    writerAgent: HarnessWriterAgent,
    deviceId?: string,
    options?: { readonly fresh?: boolean },
  ) => void;
  readonly applySocketMessage: (raw: string) => void;
  readonly setLastResponse: Dispatch<SetStateAction<AgentWitchSocketDisplay>>;
  readonly bindDispatchedRunId: (runId: string) => void;
}): ((prompt: string, options?: WriterPromptDispatchOptions) => void) => {
  const searchParams = useSearchParams();
  const urlSourceRunId =
    searchParams.get(SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM) ?? "";
  const continueFromQuery =
    searchParams.get(SEND_TASK_CONTINUE_SESSION_QUERY_PARAM) === "1";

  return useCallback(
    (prompt, options) => {
      const trimmedPrompt = prompt.trim();
      if (trimmedPrompt.length === 0 || options === undefined) {
        return;
      }

      const { isFreshStart, sessionContinuation, sourceRunId } =
        resolveWriterPromptDispatchContinuation({
          freshStart: options.freshStart === true,
          continueFromQuery,
          isSessionContinuation: input.isSessionContinuation,
          urlSourceRunId,
          liveRunId: input.liveRunId,
        });
      const sessionTurn = resolveWriterPromptDispatchSessionTurn({
        sessionContinuation,
        sourceRunId,
      });

      if (isMacTerminalDispatch(options)) {
        input.beginSession(
          formatAgentLiveTerminalCommandLine(
            trimmedPrompt,
            options.writerAgent,
            sessionTurn,
          ),
          options.writerAgent,
          options.targetDeviceId,
          { fresh: isFreshStart },
        );
      }

      if (input.connectionLab !== null) {
        input.setLastResponse(
          parseAgentWitchSocketDisplay(buildDemoWriterPromptAck()),
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
        ...(sourceRunId !== undefined ? { sourceRunId } : {}),
        ...(options.projectFolderPath !== undefined
          ? { projectFolderPath: options.projectFolderPath }
          : {}),
        projectId: options.projectId,
        ...(options.runScopedComponentIds !== undefined &&
        options.runScopedComponentIds.length > 0
          ? { runScopedComponentIds: options.runScopedComponentIds }
          : {}),
        ...(options.fieldValues !== undefined
          ? { fieldValues: options.fieldValues }
          : {}),
        ...(options.useOfficialWorkflowOrchestration === true
          ? { useOfficialWorkflowOrchestration: true }
          : {}),
        onResponse: (raw) => {
          input.applySocketMessage(raw);
          input.setLastResponse(parseAgentWitchSocketDisplay(raw));
        },
        onDispatchedRunId: input.bindDispatchedRunId,
      });
    },
    [input, urlSourceRunId, continueFromQuery],
  );
};
