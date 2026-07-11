"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  connectDispatchApprovalSocket,
  sendDispatchApprovalResponse,
} from "@/features/dispatch/utils/dispatchApprovalSocket";

export interface DispatchApprovalRequest {
  readonly runId: string;
  readonly requesterEmail: string;
  readonly prompt: string;
}

export function useDispatchApprovalListener(): {
  readonly pendingApproval: DispatchApprovalRequest | null;
  readonly respondToApproval: (
    decision: "approve" | "deny",
    denialReason?: string,
  ) => void;
  readonly dismissApproval: () => void;
} {
  const socketRef = useRef<WebSocket | null>(null);
  const [pendingApproval, setPendingApproval] =
    useState<DispatchApprovalRequest | null>(null);

  useEffect(() => {
    const connection = connectDispatchApprovalSocket((request) => {
      setPendingApproval(request);
    });
    socketRef.current = connection.socket;

    return connection.disconnect;
  }, []);

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

  const dismissApproval = useCallback(() => {
    setPendingApproval(null);
  }, []);

  return {
    pendingApproval,
    respondToApproval,
    dismissApproval,
  };
}
