import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

/** Toast after Clear all → archive (LOCK clearAll.toast / toastOne). */
export const formatInboxClearToast = (input: {
  readonly archivedMessages: number;
}): string => {
  const copy = AWC_PROJECT_INBOX_COPY;
  if (input.archivedMessages <= 0) {
    return copy.clearAlreadyEmpty;
  }
  if (input.archivedMessages === 1) {
    return copy.clearAll.toastOne;
  }
  return copy.clearAll.toast.replace("{n}", String(input.archivedMessages));
};
