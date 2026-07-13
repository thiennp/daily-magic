"use client";

import { useEffect } from "react";

import { upsertAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  buildAgentWitchWebSocketUrl,
  sendAgentWitchPairingToken,
} from "@/features/wsTest/utils/agentWitchSocketUtils";
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
      try {
        const parsed: unknown = JSON.parse(String(event.data));
        if (
          !isRecord(parsed) ||
          parsed.type !== AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD ||
          !isRecord(parsed.payload)
        ) {
          return;
        }

        const run = parseAgentRunRecord(parsed.payload.run);
        if (run === null) {
          return;
        }

        upsertAgentRunLocalCache(run);
        onRunUpdated?.(run);
      } catch {
        return;
      }
    });

    return () => {
      socket.close();
    };
  }, [onRunUpdated]);
};
