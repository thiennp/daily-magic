"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import buildHarnessWritePrompt from "@/lib/agentWitch/harness/buildHarnessWritePrompt";
import sanitizeHarnessSlug from "@/lib/agentWitch/harness/sanitizeHarnessSlug";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY } from "@/lib/agentWitch/constants/pairingTokenStorageKey.constant";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

const WS_PATH = "/api/agent-witch/ws";

const buildWebSocketUrl = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}${WS_PATH}`;
};

const createRequestId = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `req-${Date.now()}`;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export type AgentPairingStatus =
  "not_connected" | "ready_to_pair" | "paired" | "pairing_failed";

export interface HarnessRequestResult {
  readonly success: boolean;
  readonly writerAgent: string;
  readonly exitCode?: number;
  readonly output?: string;
  readonly errorMessage?: string;
}

export interface UseAgentWitchHarnessSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly pairingStatus: AgentPairingStatus;
  readonly localManifest: HarnessManifest | null;
  readonly manifestHostname: string | null;
  readonly lastRequestResult: HarnessRequestResult | null;
  readonly lastMessage: string;
  readonly pairLocalAgent: (pairingToken: string) => void;
  readonly sendHarnessRequest: (input: {
    readonly setName: string;
    readonly writerAgent: HarnessWriterAgent;
    readonly items: readonly HarnessItemSpec[];
  }) => void;
}

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
        requestId: createRequestId(),
      }),
    );
    setPairingStatus("ready_to_pair");
  }, []);

  useEffect(() => {
    const wsUrl = buildWebSocketUrl();
    if (wsUrl.length === 0) {
      return;
    }

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      setConnectionStatus("connected");
      socket.send(
        JSON.stringify({
          type: "agent.register",
          payload: { role: "dashboard" },
        }),
      );

      const savedToken = window.localStorage.getItem(
        AGENT_WITCH_PAIRING_TOKEN_STORAGE_KEY,
      );
      if (savedToken !== null && savedToken.trim().length > 0) {
        socket.send(
          JSON.stringify({
            type: "agent.pair",
            payload: { pairingToken: savedToken.trim() },
            requestId: createRequestId(),
          }),
        );
        setPairingStatus("ready_to_pair");
      }
    });

    socket.addEventListener("message", (event) => {
      const raw = String(event.data);
      setLastMessage(raw);

      try {
        const parsed: unknown = JSON.parse(raw);
        if (!isRecord(parsed) || typeof parsed.type !== "string") {
          return;
        }

        if (
          parsed.type === "system.ack" &&
          isRecord(parsed.payload) &&
          parsed.payload.paired === true
        ) {
          setPairingStatus("paired");
        }

        if (parsed.type === "system.error") {
          if (isRecord(parsed.payload)) {
            const errorMessage =
              typeof parsed.payload.errorMessage === "string"
                ? parsed.payload.errorMessage
                : "";
            if (errorMessage.includes("pair")) {
              setPairingStatus("pairing_failed");
            }
          }
        }

        if (
          parsed.type === "harness.manifest.report" &&
          isRecord(parsed.payload) &&
          isRecord(parsed.payload.manifest)
        ) {
          setLocalManifest(
            parsed.payload.manifest as unknown as HarnessManifest,
          );
          setManifestHostname(
            typeof parsed.payload.hostname === "string"
              ? parsed.payload.hostname
              : null,
          );
          setPairingStatus("paired");
        }

        if (
          parsed.type === "harness.request.result" &&
          isRecord(parsed.payload)
        ) {
          setLastRequestResult({
            success: parsed.payload.success === true,
            writerAgent:
              typeof parsed.payload.writerAgent === "string"
                ? parsed.payload.writerAgent
                : "unknown",
            exitCode:
              typeof parsed.payload.exitCode === "number"
                ? parsed.payload.exitCode
                : undefined,
            output:
              typeof parsed.payload.output === "string"
                ? parsed.payload.output
                : undefined,
            errorMessage:
              typeof parsed.payload.errorMessage === "string"
                ? parsed.payload.errorMessage
                : undefined,
          });
        }
      } catch {
        // Keep raw message visible in lastMessage.
      }
    });

    socket.addEventListener("close", () => {
      setConnectionStatus("disconnected");
      setPairingStatus("not_connected");
      setLocalManifest(null);
      setManifestHostname(null);
    });

    socket.addEventListener("error", () => {
      setConnectionStatus("error");
      setPairingStatus("not_connected");
    });

    return () => {
      socket.close();
      socketRef.current = null;
    };
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
          requestId: createRequestId(),
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
