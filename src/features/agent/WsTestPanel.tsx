"use client";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";
import { useDelegatedWriterAgent } from "@/features/agent/hooks/useDelegatedWriterAgent";
import { useWsTestMacSession } from "@/features/agent/hooks/useWsTestMacSession";
import { useWsTestPanelLifecycle } from "@/features/agent/hooks/useWsTestPanelLifecycle";
import { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestPanelDelegationSection from "@/features/agent/WsTestPanelDelegationSection";
import WsTestPanelMacSessionSection from "@/features/agent/WsTestPanelMacSessionSection";
import WsTestPanelStatusSection from "@/features/agent/WsTestPanelStatusSection";
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
  const {
    terminalSectionRef,
    isSessionActive,
    sessionDeviceName,
    sessionErrorMessage,
    terminalFeedback,
  } = useWsTestMacSession({
    socket,
    composer,
    sessionTargets,
    enqueueRun,
  });
  const promptHandlers = useWsTestPromptHandlers({
    composer,
    activeWriterAgent: sessionTargets.activeWriterAgent,
    activeDeviceId: sessionTargets.activeDeviceId,
    sendClaudePrompt: socket.sendClaudePrompt,
    enqueueRun,
  });
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  useWsTestPanelLifecycle({
    connectionStatus: socket.connectionStatus,
    flushQueue,
    refreshCount,
    sendClaudePrompt: socket.sendClaudePrompt,
    writerAgent,
  });

  return (
    <div
      className={`flex w-full flex-col ${variant === "modal" ? "gap-4" : "gap-6"}`}
    >
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <WsTestPanelStatusSection
        isModal={variant === "modal"}
        connectionStatus={socket.connectionStatus}
        queueCount={queueCount}
        queueMessage={queueMessage}
        errorMessage={sessionErrorMessage}
      />
      {isSessionActive ? (
        <WsTestPanelMacSessionSection
          ref={terminalSectionRef}
          output={socket.liveTerminalOutput}
          status={socket.liveTerminalStatus}
          activeRunId={socket.liveTerminalRunId}
          sessionWriterAgent={socket.sessionWriterAgent}
          sessionDeviceName={sessionDeviceName}
          feedbackVisible={terminalFeedback.visible}
          feedbackPendingQuestion={terminalFeedback.pendingQuestion}
          feedbackQueuedCount={terminalFeedback.queuedCount}
          feedbackQueueNotice={terminalFeedback.queueNotice}
          isFeedbackSubmitting={terminalFeedback.isSubmitting}
          onSubmitFeedback={terminalFeedback.submitFeedback}
          errorMessage={
            socket.lastResponse.isError ? socket.lastResponse.text : null
          }
          onFinishSession={socket.finishLiveTerminalSession}
        />
      ) : (
        <WsTestPanelDelegationSection
          composer={composer}
          sessionTargets={sessionTargets}
          connectionStatus={socket.connectionStatus}
          writerAgent={sessionTargets.activeWriterAgent}
          onWriterAgentChange={setWriterAgent}
          promptHandlers={promptHandlers}
          isSteppedComposer={variant === "modal"}
          onStartWriterAgent={(writerAgent) => {
            setWriterAgent(writerAgent);
            socket.startWriterSession(
              writerAgent,
              sessionTargets.activeDeviceId,
            );
          }}
        />
      )}
    </div>
  );
}
