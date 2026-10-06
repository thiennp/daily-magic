"use client";

import { useCallback, useState } from "react";

import type { ShowAwcProjectInboxToast } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxToast";
import type { AwcProjectInboxRestoreTarget } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import { formatInboxRestoreToast } from "@/features/projects/access/inbox/utils/formatInboxRestoreToast";
import { restoreProjectInbox } from "@/features/projects/access/inbox/utils/restoreProjectInbox";

/** Owner Restore (one, all, or toast Undo batch) + restored toast. */
export const useAwcProjectInboxRestore = (input: {
  readonly projectId: string;
  readonly reloadSilent: () => Promise<void>;
  readonly showToast: ShowAwcProjectInboxToast;
}) => {
  const { projectId, reloadSilent, showToast } = input;
  const [restoring, setRestoring] = useState(false);

  const restore = useCallback(
    async (target: AwcProjectInboxRestoreTarget): Promise<boolean> => {
      if (restoring) {
        return false;
      }
      setRestoring(true);
      const result = await restoreProjectInbox({ projectId, target });
      setRestoring(false);
      if (!result.ok) {
        showToast(result.errorMessage);
        return false;
      }
      showToast(formatInboxRestoreToast(result.restoredMessages));
      await reloadSilent();
      return true;
    },
    [restoring, projectId, reloadSilent, showToast],
  );

  return { restoring, restore };
};
