"use client";

import { useCallback, useState } from "react";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type { ShowAwcProjectInboxToast } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxToast";
import { clearProjectInbox } from "@/features/projects/access/inbox/utils/clearProjectInbox";
import { formatInboxClearToast } from "@/features/projects/access/inbox/utils/formatInboxClearToast";

/** Owner Clear all → archive + toast with Undo (that batch); pairs with reload. */
export const useAwcProjectInboxClear = (input: {
  readonly projectId: string;
  readonly reloadSilent: () => Promise<void>;
  readonly showToast: ShowAwcProjectInboxToast;
}) => {
  const { projectId, reloadSilent, showToast } = input;
  const [clearing, setClearing] = useState(false);

  const clearAll = useCallback(async (): Promise<boolean> => {
    if (clearing) {
      return false;
    }
    setClearing(true);
    const result = await clearProjectInbox({ projectId });
    setClearing(false);
    if (!result.ok) {
      showToast(
        result.unavailable
          ? AWC_PROJECT_INBOX_COPY.clearUnavailable
          : result.errorMessage || AWC_PROJECT_INBOX_COPY.clearFailed,
      );
      return false;
    }
    showToast(
      formatInboxClearToast(result),
      result.archivedMessages > 0 ? result.archiveBatch : null,
    );
    await reloadSilent();
    return true;
  }, [clearing, projectId, reloadSilent, showToast]);

  return { clearing, clearAll };
};
