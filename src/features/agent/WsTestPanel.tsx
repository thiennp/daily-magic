"use client";

import { useEffect, useRef } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import AgentLiveTerminalSection from "@/features/agent/AgentLiveTerminalSection";
import { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestPromptSection from "@/features/agent/WsTestPromptSection";
import { buildWsTestSendOptions } from "@/features/agent/utils/buildWsTestSendOptions";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

export default function WsTestPanel() {
  const {
    connectionStatus,
    lastResponse,
    liveTerminalOutput,
    liveTerminalStatus,
    liveTerminalRunId,
    liveTerminalPendingInput,
    submitLiveTerminalInput,
    dismissLiveTerminalInput,
    sendClaudePrompt,
  } = useAgentWitchSocket();
  const composer = useWsTestTaskComposer();
  const { writerAgent, setWriterAgent } = useDelegatedWriterAgent();
  const { queueCount, queueMessage, enqueueRun, flushQueue, refreshCount } =
    useAgentRunQueue();
  const flushedOnConnectRef = useRef(false);
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  useEffect(() => {
    void refreshCount();
  }, [refreshCount]);

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

  return (
    <div className="flex w-full flex-col gap-6">
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <AppPanel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Send a task to your Mac or to a teammate on your team. Every job is
            saved in Job history.
          </p>
          <ConnectionStatusBadge status={connectionStatus} />
        </div>
        {queueCount > 0 ? (
          <p className="mt-3 text-sm text-brand-700 dark:text-brand-300">
            {queueCount} task{queueCount === 1 ? "" : "s"} queued for when your
            Mac connects.
          </p>
        ) : null}
        {queueMessage ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {queueMessage}
          </p>
        ) : null}
      </AppPanel>

      <WsTestPromptSection
        composer={composer}
        writerAgent={writerAgent}
        onWriterAgentChange={setWriterAgent}
        connectionStatus={connectionStatus}
        isSendDisabled={composer.isSendDisabled(connectionStatus)}
        onSend={() => {
          sendClaudePrompt(
            composer.resolvedPrompt,
            buildWsTestSendOptions(composer, writerAgent),
          );
          composer.resetComposer();
        }}
        onQueue={() => {
          void enqueueRun({
            prompt: composer.resolvedPrompt,
            ...(composer.isTeamDispatch
              ? {
                  executorUserId: composer.selectedTargetUserId,
                  groupId: composer.selectedGroupId,
                  capabilityId: composer.selectedCapabilityId,
                }
              : composer.libraryCapabilityId.length > 0
                ? { capabilityId: composer.libraryCapabilityId }
                : {}),
          });
        }}
        onClear={composer.resetComposer}
      />

      <AgentLiveTerminalSection
        output={liveTerminalOutput}
        status={liveTerminalStatus}
        activeRunId={liveTerminalRunId}
        pendingInput={liveTerminalPendingInput}
        errorMessage={lastResponse.isError ? lastResponse.text : null}
        onSubmitInput={submitLiveTerminalInput}
        onDismissInput={dismissLiveTerminalInput}
      />
    </div>
  );
}
