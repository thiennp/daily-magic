"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/types/UseAgentWitchHarnessSocketResult.type";
import { connectAgentWitchHarnessSocket } from "@/features/harness/hooks/utils/connectAgentWitchHarnessSocket";
import { createAgentWitchRequestId } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import buildHarnessWritePrompt from "@/lib/agentWitch/harness/buildHarnessWritePrompt";
import sanitizeHarnessSlug from "@/lib/agentWitch/harness/sanitizeHarnessSlug";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

export type {
  AgentPairingStatus,
  HarnessRequestResult,
  UseAgentWitchHarnessSocketResult,
};

export function useAgentWitchHarnessSocket(): UseAgentWitchHarnessSocketResult {
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<WsTestConnectionStatus>("connecting");
  const [pairingStatus, setPairingStatus] =
    useState<AgentPairingStatus>("not_connected");
  const [localManifest, setLocalManifest] = useState<HarnessManifest | null>(
    null,
  );
  const [manifestHostname, setManifestHostname] = useState<string | null>(null);
  const [lastRequestResult, setLastRequestResult] =
    useState<HarnessRequestResult | null>(null);
  const [lastMessage, setLastMessage] = useState("");

  const pairLocalAgent = useCallback((pairingToken: string) => {
    const trimmedToken = pairingToken.trim();
    if (trimmedToken.length === 0) {
      return;
    }

    const socket = socketRef.current;
    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      setPairingStatus("not_connected");
      return;
    }

    socket.send(
      JSON.stringify({
        type: "agent.pair",
        payload: { pairingToken: trimmedToken },
        requestId: createAgentWitchRequestId(),
      }),
    );
    setPairingStatus("ready_to_pair");
  }, []);

  useEffect(() => {
    return connectAgentWitchHarnessSocket({
      socketRef,
      setConnectionStatus,
      setPairingStatus,
      setLocalManifest,
      setManifestHostname,
      setLastRequestResult,
      setLastMessage,
    });
  }, []);

  const sendHarnessRequest = useCallback(
    (input: {
      readonly setName: string;
      readonly writerAgent: HarnessWriterAgent;
      readonly items: readonly HarnessItemSpec[];
    }) => {
      const trimmedName = input.setName.trim();
      if (trimmedName.length === 0 || input.items.length === 0) {
        return;
      }

      const socket = socketRef.current;
      if (socket === null || socket.readyState !== WebSocket.OPEN) {
        setLastMessage(
          JSON.stringify({
            type: "system.error",
            payload: { errorMessage: "WebSocket is not connected." },
          }),
        );
        return;
      }

      const spec = {
        name: trimmedName,
        slug: sanitizeHarnessSlug(trimmedName),
        items: input.items,
      };
      const instruction = buildHarnessWritePrompt(spec);

      socket.send(
        JSON.stringify({
          type: "harness.request",
          payload: {
            writerAgent: input.writerAgent,
            spec,
            instruction,
          },
          requestId: createAgentWitchRequestId(),
        }),
      );
    },
    [],
  );

  return {
    connectionStatus,
    pairingStatus,
    localManifest,
    manifestHostname,
    lastRequestResult,
    lastMessage,
    pairLocalAgent,
    sendHarnessRequest,
  };
}
