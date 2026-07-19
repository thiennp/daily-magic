"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import { useAgentWitchDashboardSubscription } from "@/features/agent-witch/dashboard/useAgentWitchDashboardSubscription";
import {
  parseDispatchApprovalSocketMessage,
  sendAgentRunInputResponse,
  sendDispatchApprovalResponse,
  type AgentRunInputRequest,
} from "@/features/dispatch/utils/dispatchApprovalSocket";
import { isAgentRunLiveTerminalActive } from "@/features/reports/utils/registerAgentRunLiveTerminal";

export interface DispatchApprovalRequest {
  readonly runId: string;
  readonly requesterEmail: string;
  readonly prompt: string;
}

export function useDispatchApprovalListener(): {
  readonly pendingApproval: DispatchApprovalRequest | null;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly respondToApproval: (
    decision: "approve" | "deny",
    denialReason?: string,
  ) => void;
  readonly respondToInput: (response: string) => void;
  readonly dismissApproval: () => void;
  readonly dismissInput: () => void;
} {
  const dashboard = useAgentWitchDashboard();
  const socketRef = useRef<WebSocket | null>(null);
  const [pendingApproval, setPendingApproval] =
    useState<DispatchApprovalRequest | null>(null);
  const [pendingInput, setPendingInput] = useState<AgentRunInputRequest | null>(
    null,
  );

  useEffect(() => {
    socketRef.current = dashboard.getSocket();
  }, [dashboard]);

  const handleDashboardMessage = useCallback((raw: string) => {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        !("type" in parsed)
      ) {
        return;
      }

      parseDispatchApprovalSocketMessage(parsed as Record<string, unknown>, {
        onApprovalRequired: setPendingApproval,
        onInputRequired: (request) => {
          if (isAgentRunLiveTerminalActive(request.agentRunId)) {
            return;
          }
          setPendingInput(request);
        },
      });
    } catch {
      return;
    }
  }, []);

  useAgentWitchDashboardSubscription(handleDashboardMessage);

  const respondToApproval = useCallback(
    (decision: "approve" | "deny", denialReason?: string) => {
      const runId = pendingApproval?.runId;
      const socket = socketRef.current;

      if (runId === undefined || socket === null) {
        return;
      }

      if (socket.readyState === WebSocket.OPEN) {
        sendDispatchApprovalResponse(socket, runId, decision, denialReason);
      }

      setPendingApproval(null);
    },
    [pendingApproval?.runId],
  );

  const respondToInput = useCallback(
    (response: string) => {
      const agentRunId = pendingInput?.agentRunId;
      const socket = socketRef.current;
      const trimmedResponse = response.trim();

      if (
        agentRunId === undefined ||
        socket === null ||
        trimmedResponse.length === 0
      ) {
        return;
      }

      if (socket.readyState === WebSocket.OPEN) {
        sendAgentRunInputResponse(socket, agentRunId, trimmedResponse);
      }

      setPendingInput(null);
    },
    [pendingInput?.agentRunId],
  );

  const dismissApproval = useCallback(() => {
    setPendingApproval(null);
  }, []);

  const dismissInput = useCallback(() => {
    setPendingInput(null);
  }, []);

  return {
    pendingApproval,
    pendingInput,
    respondToApproval,
    respondToInput,
    dismissApproval,
    dismissInput,
  };
}
