import type { RefObject } from "react";

import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";
import type { HarnessExportResultPayload } from "@/features/harness/types/HarnessExportResult.type";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const mergeImportedItems = (
  sets: NonNullable<HarnessExportResultPayload["sets"]>,
): readonly HarnessItemWriteSpec[] => {
  const merged = new Map<string, HarnessItemWriteSpec>();

  for (const set of sets) {
    for (const item of set.items ?? []) {
      const existing = merged.get(item.id);
      const nextSetSlugs = existing
        ? [...new Set([...existing.setSlugs, set.slug])]
        : [set.slug];

      merged.set(item.id, {
        id: item.id,
        kind: item.kind as HarnessItemKind,
        title: item.title,
        content: item.content,
        setSlugs: nextSetSlugs,
      });
    }
  }

  return [...merged.values()];
};

export const createHarnessExportResultHandler = (input: {
  readonly sendWriteHarnessItemsRef: RefObject<
    (request: {
      readonly writerAgent: HarnessWriterAgent;
      readonly items: readonly HarnessItemWriteSpec[];
    }) => void
  >;
  readonly sendCreateHarnessSetRef: RefObject<
    (request: {
      readonly name: string;
      readonly writerAgent: HarnessWriterAgent;
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
      input.sendCreateHarnessSetRef.current?.({
        name: set.name,
        writerAgent: "claude-cli",
      });
    }

    const items = mergeImportedItems(payload.sets);
    if (items.length > 0) {
      input.sendWriteHarnessItemsRef.current?.({
        writerAgent: "claude-cli",
        items,
      });
    }

    input.setBorrowImportStatus("done");
    input.setBorrowImportMessage(
      `Requested import of ${payload.sets.length} harness set(s) to your local agent.`,
    );
  };
};
