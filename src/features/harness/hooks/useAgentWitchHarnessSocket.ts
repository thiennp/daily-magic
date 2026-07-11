"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/types/UseAgentWitchHarnessSocketResult.type";
import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";
import { createAgentWitchSocketStore } from "@/features/harness/hooks/utils/agentWitchSocketStore";
import { connectAgentWitchHarnessSocket } from "@/features/harness/hooks/utils/connectAgentWitchHarnessSocket";
import { createHarnessExportResultHandler } from "@/features/harness/hooks/utils/createHarnessExportResultHandler";
import { createHarnessSocketActions } from "@/features/harness/hooks/utils/createHarnessSocketActions";
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
  const socketStore = useMemo(() => createAgentWitchSocketStore(), []);
  const sendHarnessRequestRef = useRef<
    (input: {
      readonly setName: string;
      readonly writerAgent: HarnessWriterAgent;
      readonly items: readonly HarnessItemSpec[];
    }) => void
  >(() => undefined);
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
  const [borrowImportStatus, setBorrowImportStatus] =
    useState<BorrowImportStatus>("idle");
  const [borrowImportMessage, setBorrowImportMessage] = useState<string | null>(
    null,
  );

  const [actions] = useState(() =>
    createHarnessSocketActions({
      socketStore,
      setPairingStatus,
      setBorrowImportStatus,
      setBorrowImportMessage,
    }),
  );

  useEffect(() => {
    sendHarnessRequestRef.current = actions.sendHarnessRequest;
  }, [actions.sendHarnessRequest]);

  useEffect(() => {
    return connectAgentWitchHarnessSocket({
      socketStore,
      setConnectionStatus,
      setPairingStatus,
      setLocalManifest,
      setManifestHostname,
      setLastRequestResult,
      setLastMessage,
      onHarnessExportResult: createHarnessExportResultHandler({
        sendHarnessRequestRef,
        setBorrowImportStatus,
        setBorrowImportMessage,
      }),
    });
  }, [socketStore]);

  return {
    connectionStatus,
    pairingStatus,
    localManifest,
    manifestHostname,
    lastRequestResult,
    lastMessage,
    pairLocalAgent: actions.pairLocalAgent,
    sendHarnessRequest: actions.sendHarnessRequest,
    borrowImportStatus,
    borrowImportMessage,
    requestBorrowedHarnessExport: actions.requestBorrowedHarnessExport,
  };
}
