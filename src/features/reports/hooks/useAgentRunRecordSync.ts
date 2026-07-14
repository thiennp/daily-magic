"use client";

import { useEffect } from "react";

import {
  buildAgentWitchWebSocketUrl,
  sendAgentWitchPairingToken,
} from "@/features/agent/utils/agentWitchSocketUtils";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseAgentRunRecord = (value: unknown): AgentRunRecord | null => {
  if (!isRecord(value)) {
    return null;
  }

  return typeof value.id === "string"
    ? (value as unknown as AgentRunRecord)
    : null;
};

export const useAgentRunRecordSync = (
  onRunUpdated?: (run: AgentRunRecord) => void,
): void => {
  useEffect(() => {
    const wsUrl = buildAgentWitchWebSocketUrl();
    if (wsUrl.length === 0) {
      return;
    }

    const socket = new WebSocket(wsUrl);

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
          payload: { role: "dashboard" },
        }),
      );
      sendAgentWitchPairingToken(socket);
    });

    socket.addEventListener("message", (event) => {
      const raw = String(event.data);
      if (!syncAgentRunLocalCacheFromSocket(raw)) {
        return;
      }

      try {
        const parsed: unknown = JSON.parse(raw);
        if (!isRecord(parsed) || !isRecord(parsed.payload)) {
          return;
        }

        const run = parseAgentRunRecord(parsed.payload.run);
        if (run !== null) {
          onRunUpdated?.(run);
        }
      } catch {
        return;
      }
    });

    return () => {
      socket.close();
    };
  }, [onRunUpdated]);
};
