import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

/** Toast after Clear all — prefers deletedMessages; zeros → already empty. */
export const formatInboxClearToast = (input: {
  readonly deletedMessages: number;
  readonly deletedDeliveries: number;
}): string => {
  if (input.deletedMessages === 0 && input.deletedDeliveries === 0) {
    return AWC_PROJECT_INBOX_COPY.clearAlreadyEmpty;
  }
  return AWC_PROJECT_INBOX_COPY.clearSuccess.replace(
    "{n}",
    String(input.deletedMessages),
  );
};
