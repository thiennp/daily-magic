import { createAgentWitchRequestId } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";

export const sendBorrowedHarnessExportRequest = (input: {
  readonly socket: WebSocket;
  readonly ownerUserId: string;
  readonly setSlugs: readonly string[];
  readonly setBorrowImportStatus: (status: BorrowImportStatus) => void;
  readonly setBorrowImportMessage: (message: string | null) => void;
}): void => {
  input.setBorrowImportStatus("exporting");
  input.setBorrowImportMessage(null);
  input.socket.send(
    JSON.stringify({
      type: "harness.borrow.export",
      payload: {
        ownerUserId: input.ownerUserId,
        setSlugs: input.setSlugs,
      },
      requestId: createAgentWitchRequestId(),
    }),
  );
};
