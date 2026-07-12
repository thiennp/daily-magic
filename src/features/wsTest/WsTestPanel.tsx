"use client";

import { useEffect, useRef } from "react";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import { useAgentRunQueue } from "@/features/wsTest/hooks/useAgentRunQueue";
import { useWsTestTaskComposer } from "@/features/wsTest/hooks/useWsTestTaskComposer";
import WsTestPromptSection from "@/features/wsTest/WsTestPromptSection";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

export default function WsTestPanel() {
  const { connectionStatus, lastResponse, sendClaudePrompt } =
    useAgentWitchSocket();
  const composer = useWsTestTaskComposer();
  const { queueCount, queueMessage, enqueueRun, flushQueue, refreshCount } =
    useAgentRunQueue();
  const flushedOnConnectRef = useRef(false);
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);
  const canCopyPrompt =
    composer.resolvedPrompt.trim().length > 0 &&
    composer.workflowValidationErrors.length === 0;

  useEffect(() => {
    void refreshCount();
  }, [refreshCount]);

  useEffect(() => {
    if (connectionStatus === "connected") {
      if (!flushedOnConnectRef.current) {
        flushedOnConnectRef.current = true;
        void flushQueue(sendClaudePrompt);
      }
      return;
    }

    flushedOnConnectRef.current = false;
  }, [connectionStatus, flushQueue, sendClaudePrompt]);

  return (
    <div className="flex w-full flex-col gap-6">
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
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
      </section>

      <WsTestPromptSection
        composer={composer}
        connectionStatus={connectionStatus}
        isSendDisabled={composer.isSendDisabled(connectionStatus)}
        canQueue={canCopyPrompt}
        onSend={() => {
          sendClaudePrompt(composer.resolvedPrompt, {
            ...(composer.isTeamDispatch
              ? {
                  targetUserId: composer.selectedTargetUserId,
                  groupId: composer.selectedGroupId,
                  capabilityId: composer.selectedCapabilityId,
                }
              : composer.isLibraryPlaybook &&
                  composer.libraryCapabilityId.length > 0
                ? { capabilityId: composer.libraryCapabilityId }
                : {}),
          });
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

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Last response
        </h2>
        <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
          {lastResponse.length > 0 ? lastResponse : "No messages yet."}
        </pre>
      </section>
    </div>
  );
}
