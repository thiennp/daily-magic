"use client";

import { useCallback, useState } from "react";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import { clearProjectInbox } from "@/features/projects/access/inbox/utils/clearProjectInbox";
import { formatInboxClearToast } from "@/features/projects/access/inbox/utils/formatInboxClearToast";

/** Owner Clear all + toast; pairs with scope=project reload. */
export const useAwcProjectInboxClear = (input: {
  readonly projectId: string;
  readonly reloadSilent: () => Promise<void>;
}) => {
  const { projectId, reloadSilent } = input;
  const [clearing, setClearing] = useState(false);
  const [clearToast, setClearToast] = useState<string | null>(null);

  const showClearToast = useCallback((text: string) => {
    setClearToast(text);
    window.setTimeout(() => setClearToast(null), 2800);
  }, []);

  const clearAll = useCallback(async (): Promise<boolean> => {
    if (clearing) {
      return false;
    }
    setClearing(true);
    const result = await clearProjectInbox({ projectId });
    setClearing(false);
    if (!result.ok) {
      showClearToast(
        result.unavailable
          ? AWC_PROJECT_INBOX_COPY.clearUnavailable
          : result.errorMessage || AWC_PROJECT_INBOX_COPY.clearFailed,
      );
      return false;
    }
    showClearToast(formatInboxClearToast(result));
    await reloadSilent();
    return true;
  }, [clearing, projectId, reloadSilent, showClearToast]);

  return { clearing, clearToast, clearAll };
};
