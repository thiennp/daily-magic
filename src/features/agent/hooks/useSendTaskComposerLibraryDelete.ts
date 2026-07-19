"use client";

import { useCallback, useState } from "react";

import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import { deleteSendTaskComposerLibraryItem } from "@/features/agent/utils/deleteSendTaskComposerLibraryItem";

export const useSendTaskComposerLibraryDelete = (
  removeLibraryCapability: (capabilityId: string) => void,
): {
  readonly isDeleting: boolean;
  readonly deleteLibraryItem: (
    item: SendTaskComposerPickerItem,
  ) => Promise<void>;
} => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteLibraryItem = useCallback(
    async (item: SendTaskComposerPickerItem): Promise<void> => {
      if (isDeleting) {
        return;
      }
      setIsDeleting(true);
      try {
        const deleted = await deleteSendTaskComposerLibraryItem(item);
        if (deleted && item.kind === "library") {
          removeLibraryCapability(item.id);
        }
      } finally {
        setIsDeleting(false);
      }
    },
    [isDeleting, removeLibraryCapability],
  );

  return { isDeleting, deleteLibraryItem };
};
