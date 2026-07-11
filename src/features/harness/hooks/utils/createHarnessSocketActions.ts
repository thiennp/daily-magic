import type { AgentWitchSocketStore } from "@/features/harness/hooks/utils/agentWitchSocketStore";
import { createAgentWitchRequestId } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import { sendBorrowedHarnessExportRequest } from "@/features/harness/hooks/utils/sendBorrowedHarnessExportRequest";
import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";
import buildHarnessWritePrompt from "@/lib/agentWitch/harness/buildHarnessWritePrompt";
import sanitizeHarnessSlug from "@/lib/agentWitch/harness/sanitizeHarnessSlug";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const createHarnessSocketActions = (input: {
  readonly socketStore: AgentWitchSocketStore;
  readonly setPairingStatus: (status: AgentPairingStatus) => void;
  readonly setBorrowImportStatus: (status: BorrowImportStatus) => void;
  readonly setBorrowImportMessage: (message: string | null) => void;
}) => {
  const sendHarnessRequest = (request: {
    readonly setName: string;
    readonly writerAgent: HarnessWriterAgent;
    readonly items: readonly HarnessItemSpec[];
  }) => {
    const trimmedName = request.setName.trim();
    const socket = input.socketStore.socket;
    if (
      trimmedName.length === 0 ||
      request.items.length === 0 ||
      socket === null ||
      socket.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    const spec = {
      name: trimmedName,
      slug: sanitizeHarnessSlug(trimmedName),
      items: request.items,
    };

    socket.send(
      JSON.stringify({
        type: "harness.request",
        payload: {
          writerAgent: request.writerAgent,
          spec,
          instruction: buildHarnessWritePrompt(spec),
        },
        requestId: createAgentWitchRequestId(),
      }),
    );
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
        "Connect your local agent before importing harness sets.",
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
    sendHarnessRequest,
    pairLocalAgent,
    requestBorrowedHarnessExport,
  };
};
