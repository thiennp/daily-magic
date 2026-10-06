import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

/** Toast after Restore / Undo (LOCK archived.restoredToast / restoredToastOne). */
export const formatInboxRestoreToast = (restoredMessages: number): string => {
  const copy = AWC_PROJECT_INBOX_COPY.archived;
  if (restoredMessages === 1) {
    return copy.restoredToastOne;
  }
  return copy.restoredToast.replace(
    "{n}",
    String(Math.max(0, restoredMessages)),
  );
};
