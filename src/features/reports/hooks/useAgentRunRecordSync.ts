"use client";

import { useEffect, useRef } from "react";

import trackOnboardingFromAgentWitchSocketMessage from "@/features/home/utils/trackOnboardingFromAgentWitchSocketMessage";
import { syncAgentRunLocalCacheFromSocket } from "@/features/reports/utils/syncAgentRunLocalCacheFromSocket";
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
  const onRunUpdatedRef = useRef(onRunUpdated);

  useEffect(() => {
    onRunUpdatedRef.current = onRunUpdated;
  }, [onRunUpdated]);

  useEffect(() => {
    if (typeof EventSource === "undefined") {
      return;
    }

    const eventSource = new EventSource("/api/agent-witch/events");

    eventSource.onmessage = (event) => {
      const raw = String(event.data);
      trackOnboardingFromAgentWitchSocketMessage(raw);
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
          onRunUpdatedRef.current?.(run);
        }
      } catch {
        return;
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);
};
