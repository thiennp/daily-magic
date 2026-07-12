"use client";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import { useWsTestTaskComposer } from "@/features/wsTest/hooks/useWsTestTaskComposer";
import WsTestPromptSection from "@/features/wsTest/WsTestPromptSection";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

export default function WsTestPanel() {
  const { connectionStatus, lastResponse, sendClaudePrompt } =
    useAgentWitchSocket();
  const composer = useWsTestTaskComposer();
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

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
      </section>

      <WsTestPromptSection
        composer={composer}
        connectionStatus={connectionStatus}
        isSendDisabled={composer.isSendDisabled(connectionStatus)}
        onSend={() => {
          sendClaudePrompt(composer.resolvedPrompt, {
            ...(composer.isTeamDispatch
              ? {
                  targetUserId: composer.selectedTargetUserId,
                  groupId: composer.selectedGroupId,
                  capabilityId: composer.selectedCapabilityId,
                }
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
