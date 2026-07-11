import type { RefObject } from "react";

import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { HarnessExportResultPayload } from "@/features/harness/types/HarnessExportResult.type";

const mapExportItems = (
  items: NonNullable<
    NonNullable<HarnessExportResultPayload["sets"]>[number]["items"]
  >,
): readonly HarnessItemSpec[] =>
  items.map((item) => ({
    id: item.id,
    kind: item.kind as HarnessItemKind,
    title: item.title,
    content: item.content,
  }));

export const createHarnessExportResultHandler = (input: {
  readonly sendHarnessRequestRef: RefObject<
    (request: {
      readonly setName: string;
      readonly writerAgent: HarnessWriterAgent;
      readonly items: readonly HarnessItemSpec[];
    }) => void
  >;
  readonly setBorrowImportStatus: (status: BorrowImportStatus) => void;
  readonly setBorrowImportMessage: (message: string | null) => void;
}) => {
  return (payload: HarnessExportResultPayload): void => {
    if (!payload.success || payload.sets === undefined) {
      input.setBorrowImportStatus("error");
      input.setBorrowImportMessage(
        payload.errorMessage ?? "Could not export harness sets from owner.",
      );
      return;
    }

    input.setBorrowImportStatus("importing");
    for (const set of payload.sets) {
      input.sendHarnessRequestRef.current?.({
        setName: set.name,
        writerAgent: "claude-cli",
        items: mapExportItems(set.items),
      });
    }

    input.setBorrowImportStatus("done");
    input.setBorrowImportMessage(
      `Requested import of ${payload.sets.length} harness set(s) to your local agent.`,
    );
  };
};
