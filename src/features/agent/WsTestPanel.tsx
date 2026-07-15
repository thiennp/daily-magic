"use client";

import { useEffect } from "react";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import AgentLiveTerminalSection from "@/features/agent/AgentLiveTerminalSection";
import { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import { useWsTestPanelQueueFlush } from "@/features/agent/hooks/useWsTestPanelQueueFlush";
import { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestPanelStatusSection from "@/features/agent/WsTestPanelStatusSection";
import WsTestPromptSection from "@/features/agent/WsTestPromptSection";
import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";
import { useAgentWitchSocket } from "./hooks/useAgentWitchSocket";

interface WsTestPanelProps {
  readonly variant?: "page" | "modal";
}

export default function WsTestPanel({ variant = "page" }: WsTestPanelProps) {
  const socket = useAgentWitchSocket();
  const composer = useWsTestTaskComposer();
  const { writerAgent, setWriterAgent } = useDelegatedWriterAgent();
  const sessionTargets = resolveAgentSessionTargets({
    sessionWriterAgent: socket.sessionWriterAgent,
    writerAgent,
    sessionDeviceId: socket.sessionDeviceId,
    selectedDeviceId: composer.selectedDeviceId,
  });
  const { queueCount, queueMessage, enqueueRun, flushQueue, refreshCount } =
    useAgentRunQueue();
  const promptHandlers = useWsTestPromptHandlers({
    composer,
    activeWriterAgent: sessionTargets.activeWriterAgent,
    activeDeviceId: sessionTargets.activeDeviceId,
    sendClaudePrompt: socket.sendClaudePrompt,
    enqueueRun,
  });
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);
  const sessionDeviceName =
    sessionTargets.activeDeviceId.length > 0
      ? (composer.macDisplayNameById.get(sessionTargets.activeDeviceId) ??
        "Your Mac")
      : null;
  const isModal = variant === "modal";

  useEffect(() => {
    void refreshCount();
  }, [refreshCount]);

  useWsTestPanelQueueFlush({
    connectionStatus: socket.connectionStatus,
    flushQueue,
    sendClaudePrompt: socket.sendClaudePrompt,
    writerAgent,
  });

  return (
    <div className={`flex w-full flex-col ${isModal ? "gap-4" : "gap-6"}`}>
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <WsTestPanelStatusSection
        isModal={isModal}
        connectionStatus={socket.connectionStatus}
        queueCount={queueCount}
        queueMessage={queueMessage}
      />
      <WsTestPromptSection
        composer={composer}
        writerAgent={sessionTargets.activeWriterAgent}
        onWriterAgentChange={setWriterAgent}
        isWriterAgentLocked={sessionTargets.isWriterAgentLocked}
        isMacDeviceLocked={sessionTargets.isMacDeviceLocked}
        macDispatchDeviceId={sessionTargets.activeDeviceId}
        connectionStatus={socket.connectionStatus}
        isSendDisabled={composer.isSendDisabled(
          socket.connectionStatus,
          sessionTargets.activeDeviceId,
        )}
        onSend={promptHandlers.onSend}
        onQueue={promptHandlers.onQueue}
        onClear={promptHandlers.onClear}
      />
      <AgentLiveTerminalSection
        output={socket.liveTerminalOutput}
        status={socket.liveTerminalStatus}
        activeRunId={socket.liveTerminalRunId}
        sessionWriterAgent={socket.sessionWriterAgent}
        sessionDeviceName={sessionDeviceName}
        pendingInput={socket.liveTerminalPendingInput}
        errorMessage={
          socket.lastResponse.isError ? socket.lastResponse.text : null
        }
        onSubmitInput={socket.submitLiveTerminalInput}
        onDismissInput={socket.dismissLiveTerminalInput}
        onFinishSession={socket.finishLiveTerminalSession}
      />
    </div>
  );
}
