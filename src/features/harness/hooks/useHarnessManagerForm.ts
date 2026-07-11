import { useMemo, useState } from "react";

import {
  createEmptyHarnessItemDraft,
  type HarnessItemDraft,
} from "@/features/harness/types/HarnessItemDraft.type";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface UseHarnessManagerFormResult {
  readonly setName: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly items: readonly HarnessItemDraft[];
  readonly readyItems: readonly HarnessItemSpec[];
  readonly setSetName: (value: string) => void;
  readonly setWriterAgent: (value: HarnessWriterAgent) => void;
  readonly addItem: () => void;
  readonly removeItem: (itemId: string) => void;
  readonly updateItem: (nextItem: HarnessItemDraft) => void;
}

export function useHarnessManagerForm(): UseHarnessManagerFormResult {
  const [setName, setSetName] = useState("");
  const [writerAgent, setWriterAgent] =
    useState<HarnessWriterAgent>("claude-cli");
  const [items, setItems] = useState<readonly HarnessItemDraft[]>([
    createEmptyHarnessItemDraft(),
  ]);

  const readyItems = useMemo(
    (): readonly HarnessItemSpec[] =>
      items
        .filter(
          (item) =>
            item.title.trim().length > 0 && item.content.trim().length > 0,
        )
        .map((item) => ({
          id: item.id,
          kind: item.kind,
          title: item.title.trim(),
          content: item.content.trim(),
        })),
    [items],
  );

  const addItem = (): void => {
    setItems((current) => [...current, createEmptyHarnessItemDraft()]);
  };

  const removeItem = (itemId: string): void => {
    setItems((current) => current.filter((entry) => entry.id !== itemId));
  };

  const updateItem = (nextItem: HarnessItemDraft): void => {
    setItems((current) =>
      current.map((entry) => (entry.id === nextItem.id ? nextItem : entry)),
    );
  };

  return {
    setName,
    writerAgent,
    items,
    readyItems,
    setSetName,
    setWriterAgent,
    addItem,
    removeItem,
    updateItem,
  };
}
