"use client";

import { useState } from "react";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { useTeamDispatchSelection } from "@/features/dispatch/TeamDispatchFields";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import WsTestPromptSection from "@/features/wsTest/WsTestPromptSection";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

export default function WsTestPanel() {
  const { connectionStatus, lastResponse, sendClaudePrompt } =
    useAgentWitchSocket();
  const [prompt, setPrompt] = useState("");
  const {
    selectedGroupId,
    selectedTargetUserId,
    setSelectedGroupId,
    setSelectedTargetUserId,
  } = useTeamDispatchSelection();
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);
  const isTeamDispatch =
    selectedGroupId.length > 0 && selectedTargetUserId.length > 0;
  const isSendDisabled =
    connectionStatus !== "connected" ||
    prompt.trim().length === 0 ||
    (selectedGroupId.length > 0 && selectedTargetUserId.length === 0);

  return (
    <div className="flex w-full flex-col gap-6">
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Send a task to your paired local agent or dispatch to a teammate in
            your group. Runs are recorded on the Reports page.
          </p>
          <ConnectionStatusBadge status={connectionStatus} />
        </div>
      </section>

      <WsTestPromptSection
        prompt={prompt}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        isTeamDispatch={isTeamDispatch}
        selectedGroupId={selectedGroupId}
        selectedTargetUserId={selectedTargetUserId}
        onGroupChange={setSelectedGroupId}
        onTargetChange={setSelectedTargetUserId}
        onPromptChange={setPrompt}
        onSend={() => {
          sendClaudePrompt(prompt, {
            ...(isTeamDispatch
              ? {
                  targetUserId: selectedTargetUserId,
                  groupId: selectedGroupId,
                }
              : {}),
          });
        }}
        onClear={() => {
          setPrompt("");
        }}
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
