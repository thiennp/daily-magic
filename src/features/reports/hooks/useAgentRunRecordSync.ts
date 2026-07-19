"use client";

import { useCallback } from "react";

import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
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
  const handleMessage = useCallback(
    (raw: string) => {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (
          !isRecord(parsed) ||
          parsed.type !== AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD ||
          !isRecord(parsed.payload)
        ) {
          return;
        }

        const run = parseAgentRunRecord(parsed.payload.run);
        if (run !== null) {
          onRunUpdated?.(run);
        }
      } catch {
        return;
      }
    },
    [onRunUpdated],
  );

  useAgentWitchDashboardSubscription(handleMessage);
};
