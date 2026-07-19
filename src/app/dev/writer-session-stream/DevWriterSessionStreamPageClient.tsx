"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

import AgentLiveTerminalPanel from "@/features/agent/AgentLiveTerminalPanel";
import { useAgentWitchLiveTerminal } from "@/features/agent/hooks/useAgentWitchLiveTerminal";
import { subscribeAgentWitchDashboardSocket } from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";
import { sendWriterSessionStartOverSocket } from "@/features/agent/utils/dispatchWriterSessionStart";
import { formatWriterSessionStartDisplayCommand } from "@/lib/agentWitch/formatWriterCliDisplayCommand";
import parseAgentWitchSocketDisplay, {
  type AgentWitchSocketDisplay,
} from "@/lib/agentWitch/parseAgentWitchSocketDisplay";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export default function DevWriterSessionStreamPageClient() {
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<WsTestConnectionStatus>("connecting");
  const [lastResponse, setLastResponse] = useState<AgentWitchSocketDisplay>({
    text: "",
    isError: false,
  });
  const terminal = useAgentWitchLiveTerminal(socketRef);
  const applySocketMessageRef = useRef(terminal.applySocketMessage);

  useLayoutEffect(() => {
    applySocketMessageRef.current = terminal.applySocketMessage;
  }, [terminal.applySocketMessage]);

  useLayoutEffect(() => {
    return subscribeAgentWitchDashboardSocket({
      onStatusChange: setConnectionStatus,
      onMessage: (raw) => {
        applySocketMessageRef.current(raw);
        setLastResponse(parseAgentWitchSocketDisplay(raw));
      },
      onSocketChange: (socket) => {
        socketRef.current = socket;
      },
    });
  }, []);

  const startWriterSession = useCallback(() => {
    const writerAgent = "claude-cli" as const;
    terminal.beginSession(
      formatWriterSessionStartDisplayCommand(writerAgent),
      writerAgent,
    );
    sendWriterSessionStartOverSocket({
      socket: socketRef.current,
      writerAgent,
      onResponse: (raw) => {
        applySocketMessageRef.current(raw);
        setLastResponse(parseAgentWitchSocketDisplay(raw));
      },
    });
  }, [terminal]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white/90">
          Writer session stream (localhost)
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Dev-only page for verifying live terminal streaming over WebSocket.
          Start the Mac client with{" "}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
            AGENT_WITCH_WS_URL=ws://localhost:3000/api/agent-witch/ws npm run
            agent-witch
          </code>
          .
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Connection:{" "}
          <span
            className="font-mono text-gray-900 dark:text-white/90"
            data-testid="connection-status"
          >
            {connectionStatus}
          </span>
        </p>
      </div>
      <button
        type="button"
        className="inline-flex w-fit rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-gray-900"
        disabled={connectionStatus !== "connected"}
        onClick={startWriterSession}
      >
        Start Claude writer session
      </button>
      <AgentLiveTerminalPanel
        output={terminal.output}
        status={terminal.status}
        pendingCommandLine={terminal.pendingCommandLine}
        feedbackVisible={false}
        feedbackPendingQuestion={null}
        feedbackQueuedCount={0}
        feedbackQueueNotice={null}
        isFeedbackSubmitting={false}
        onSubmitFeedback={() => undefined}
        onFinishSession={terminal.finishSession}
      />
      {lastResponse.isError ? (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          {lastResponse.text}
        </p>
      ) : null}
    </main>
  );
}
