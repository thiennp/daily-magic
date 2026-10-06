import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";

/** "Archived ({n})" filter label. */
export const formatInboxArchivedFilterLabel = (archivedCount: number): string =>
  AWC_PROJECT_INBOX_COPY.archived.filter.replace(
    "{n}",
    String(Math.max(0, archivedCount)),
  );
