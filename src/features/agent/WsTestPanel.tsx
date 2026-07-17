"use client";

import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { useWsTestPanelController } from "@/features/agent/hooks/useWsTestPanelController";
import WsTestPanelComposerSection from "@/features/agent/WsTestPanelComposerSection";
import WsTestPanelStatusSection from "@/features/agent/WsTestPanelStatusSection";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

interface WsTestPanelProps {
  readonly variant?: "page" | "modal";
}

export default function WsTestPanel({ variant = "page" }: WsTestPanelProps) {
  const isSteppedComposer = variant === "modal";
  const panel = useWsTestPanelController({ isSteppedComposer });
  const host = typeof window !== "undefined" ? window.location.host : "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  return (
    <div
      className={`flex w-full flex-col ${variant === "modal" ? "gap-4" : "gap-6"}`}
    >
      {!isWebSocketSupported ? (
        <AgentWitchUnsupportedHostNotice host={host} />
      ) : null}
      <WsTestPanelStatusSection
        isModal={variant === "modal"}
        connectionStatus={panel.socket.connectionStatus}
        queueCount={panel.queueCount}
        queueMessage={panel.queueMessage}
        errorMessage={panel.sessionErrorMessage}
      />
      <WsTestPanelComposerSection
        isSessionActive={panel.isSessionActive}
        isSteppedComposer={isSteppedComposer}
        terminalSectionRef={panel.terminalSectionRef}
        composer={panel.composer}
        sessionTargets={panel.sessionTargets}
        connectionStatus={panel.socket.connectionStatus}
        promptHandlers={panel.promptHandlers}
        wizard={panel.wizard}
        panelActions={panel.panelActions}
        stepTrail={panel.stepTrail}
        liveTerminalOutput={panel.socket.liveTerminalOutput}
        liveTerminalStatus={panel.socket.liveTerminalStatus}
        liveTerminalPendingCommandLine={
          panel.socket.liveTerminalPendingCommandLine
        }
        liveTerminalRunId={panel.socket.liveTerminalRunId}
        feedbackVisible={panel.terminalFeedback.visible}
        feedbackPendingQuestion={panel.terminalFeedback.pendingQuestion}
        feedbackPendingPartialOutput={
          panel.terminalFeedback.pendingPartialOutput
        }
        feedbackQueuedCount={panel.terminalFeedback.queuedCount}
        feedbackQueueNotice={panel.terminalFeedback.queueNotice}
        isFeedbackSubmitting={panel.terminalFeedback.isSubmitting}
        onSubmitFeedback={panel.terminalFeedback.submitFeedback}
        sessionErrorMessage={
          panel.socket.lastResponse.isError
            ? panel.socket.lastResponse.text
            : null
        }
        onWriterAgentChange={panel.setWriterAgent}
        onStartWriterAgent={panel.startWriterSession}
        onFinishSession={panel.socket.finishLiveTerminalSession}
      />
    </div>
  );
}
