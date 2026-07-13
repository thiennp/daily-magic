"use client";

import { useEffect, useState } from "react";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

interface AgentRunLiveTerminalProps {
  readonly runId: string;
}

export default function AgentRunLiveTerminal({
  runId,
}: AgentRunLiveTerminalProps) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    const wsUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/api/agent-witch/ws`
        : "";

    if (wsUrl.length === 0) {
      return;
    }

    const socket = new WebSocket(wsUrl);
    socket.addEventListener("message", (event) => {
      try {
        const parsed: unknown = JSON.parse(String(event.data));
        if (
          typeof parsed !== "object" ||
          parsed === null ||
          !("type" in parsed) ||
          !("payload" in parsed) ||
          typeof parsed.payload !== "object" ||
          parsed.payload === null
        ) {
          return;
        }

        const payload = parsed.payload as Record<string, unknown>;
        if (payload.runId !== runId) {
          return;
        }

        if (parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK) {
          const chunk = typeof payload.chunk === "string" ? payload.chunk : "";
          setOutput((current) => `${current}${chunk}`);
        }

        if (parsed.type === AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END) {
          socket.close();
        }
      } catch {
        return;
      }
    });

    return () => {
      socket.close();
    };
  }, [runId]);

  if (output.length === 0) {
    return null;
  }

  return (
    <pre className="max-h-80 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
      {output}
    </pre>
  );
}
