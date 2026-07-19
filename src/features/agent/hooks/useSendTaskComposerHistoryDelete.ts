"use client";

import { useCallback, useState } from "react";

import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import {
  clearAgentRunHistory,
  deleteAgentRunHistory,
} from "@/features/reports/utils/deleteAgentRunHistory";

export const useSendTaskComposerHistoryDelete = (): {
  readonly isDeleting: boolean;
  readonly deleteHistoryItem: (
    item: SendTaskComposerPickerItem,
  ) => Promise<void>;
  readonly clearHistory: () => Promise<void>;
} => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHistoryItem = useCallback(
    async (item: SendTaskComposerPickerItem): Promise<void> => {
      if (item.kind !== "history" || isDeleting) {
        return;
      }
      setIsDeleting(true);
      try {
        await deleteAgentRunHistory(item.id);
      } finally {
        setIsDeleting(false);
      }
    },
    [isDeleting],
  );

  const clearHistory = useCallback(async (): Promise<void> => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      await clearAgentRunHistory();
    } finally {
      setIsDeleting(false);
    }
  }, [isDeleting]);

  return { isDeleting, deleteHistoryItem, clearHistory };
};
