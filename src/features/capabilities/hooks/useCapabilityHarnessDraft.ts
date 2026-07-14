import { useMemo, useState } from "react";

import {
  createHarnessItemDraftForKind,
  type HarnessItemDraft,
} from "@/features/harness/types/HarnessItemDraft.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

export interface CapabilityHarnessItemPayload {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
}

interface UseCapabilityHarnessDraftResult {
  readonly items: readonly HarnessItemDraft[];
  readonly readyItems: readonly CapabilityHarnessItemPayload[];
  readonly addItem: (kind: HarnessItemKind) => void;
  readonly removeItem: (itemId: string) => void;
  readonly updateItem: (nextItem: HarnessItemDraft) => void;
}

export function useCapabilityHarnessDraft(): UseCapabilityHarnessDraftResult {
  const [items, setItems] = useState<readonly HarnessItemDraft[]>([]);

  const readyItems = useMemo(
    (): readonly CapabilityHarnessItemPayload[] =>
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

  const addItem = (kind: HarnessItemKind): void => {
    setItems((current) => [...current, createHarnessItemDraftForKind(kind)]);
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
    items,
    readyItems,
    addItem,
    removeItem,
    updateItem,
  };
}
