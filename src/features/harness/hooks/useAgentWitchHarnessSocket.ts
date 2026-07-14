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
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

export type {
  AgentPairingStatus,
  HarnessRequestResult,
  UseAgentWitchHarnessSocketResult,
};

export function useAgentWitchHarnessSocket(): UseAgentWitchHarnessSocketResult {
  const socketStore = useMemo(() => createAgentWitchSocketStore(), []);
  const sendWriteHarnessItemsRef = useRef<
    (input: {
      readonly writerAgent: HarnessWriterAgent;
      readonly items: readonly HarnessItemWriteSpec[];
    }) => void
  >(() => undefined);
  const sendCreateHarnessSetRef = useRef<
    (input: {
      readonly name: string;
      readonly writerAgent: HarnessWriterAgent;
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
    sendWriteHarnessItemsRef.current = actions.sendWriteHarnessItems;
    sendCreateHarnessSetRef.current = actions.sendCreateHarnessSet;
  }, [actions.sendCreateHarnessSet, actions.sendWriteHarnessItems]);

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
        sendWriteHarnessItemsRef,
        sendCreateHarnessSetRef,
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
    sendCreateHarnessSet: actions.sendCreateHarnessSet,
    sendWriteHarnessItems: actions.sendWriteHarnessItems,
    borrowImportStatus,
    borrowImportMessage,
    requestBorrowedHarnessExport: actions.requestBorrowedHarnessExport,
  };
}
