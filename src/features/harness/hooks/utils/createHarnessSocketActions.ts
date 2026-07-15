import type { AgentWitchSocketStore } from "@/features/harness/hooks/utils/agentWitchSocketStore";
import { createAgentWitchRequestId } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import { sendBorrowedHarnessExportRequest } from "@/features/harness/hooks/utils/sendBorrowedHarnessExportRequest";
import { sendHarnessPayloadOverSocket } from "@/features/harness/hooks/utils/sendHarnessPayloadOverSocket";
import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";
import buildHarnessCreateSetPrompt from "@/lib/agentWitch/harness/buildHarnessCreateSetPrompt";
import buildHarnessWriteItemsPrompt from "@/lib/agentWitch/harness/buildHarnessWriteItemsPrompt";
import sanitizeHarnessSlug from "@/lib/agentWitch/harness/sanitizeHarnessSlug";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const createHarnessSocketActions = (input: {
  readonly socketStore: AgentWitchSocketStore;
  readonly setPairingStatus: (status: AgentPairingStatus) => void;
  readonly setBorrowImportStatus: (status: BorrowImportStatus) => void;
  readonly setBorrowImportMessage: (message: string | null) => void;
}) => {
  const sendCreateHarnessSet = (request: {
    readonly name: string;
    readonly writerAgent: HarnessWriterAgent;
    readonly slug?: string;
  }) => {
    const trimmedName = request.name.trim();
    const slug = request.slug?.trim() || sanitizeHarnessSlug(trimmedName);
    if (trimmedName.length === 0) {
      return;
    }

    const spec = {
      mode: "create-set" as const,
      name: trimmedName,
      slug,
    };

    sendHarnessPayloadOverSocket({
      socketStore: input.socketStore,
      writerAgent: request.writerAgent,
      spec,
      instruction: buildHarnessCreateSetPrompt(spec),
    });
  };

  const sendWriteHarnessItems = (request: {
    readonly writerAgent: HarnessWriterAgent;
    readonly items: readonly HarnessItemWriteSpec[];
  }) => {
    if (request.items.length === 0) {
      return;
    }

    const spec = {
      mode: "write-items" as const,
      items: request.items,
    };

    sendHarnessPayloadOverSocket({
      socketStore: input.socketStore,
      writerAgent: request.writerAgent,
      spec,
      instruction: buildHarnessWriteItemsPrompt(request.items),
    });
  };

  const pairLocalAgent = (pairingToken: string) => {
    const trimmedToken = pairingToken.trim();
    const socket = input.socketStore.socket;
    if (
      trimmedToken.length === 0 ||
      socket === null ||
      socket.readyState !== WebSocket.OPEN
    ) {
      input.setPairingStatus("not_connected");
      return;
    }

    socket.send(
      JSON.stringify({
        type: "agent.pair",
        payload: { pairingToken: trimmedToken },
        requestId: createAgentWitchRequestId(),
      }),
    );
    input.setPairingStatus("ready_to_pair");
  };

  const requestBorrowedHarnessExport = (
    ownerUserId: string,
    setSlugs: readonly string[],
  ) => {
    const socket = input.socketStore.socket;
    if (socket === null || socket.readyState !== WebSocket.OPEN) {
      input.setBorrowImportStatus("error");
      input.setBorrowImportMessage(
        "Connect your Mac before installing bundles.",
      );
      return;
    }

    sendBorrowedHarnessExportRequest({
      socket,
      ownerUserId,
      setSlugs,
      setBorrowImportStatus: input.setBorrowImportStatus,
      setBorrowImportMessage: input.setBorrowImportMessage,
    });
  };

  return {
    sendCreateHarnessSet,
    sendWriteHarnessItems,
    pairLocalAgent,
    requestBorrowedHarnessExport,
  };
};
