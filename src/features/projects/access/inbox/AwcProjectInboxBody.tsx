"use client";

import { useState } from "react";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxArchivedPanel from "@/features/projects/access/inbox/AwcProjectInboxArchivedPanel";
import AwcProjectInboxMessageList from "@/features/projects/access/inbox/AwcProjectInboxMessageList";
import AwcProjectInboxRestoreAllConfirmModal from "@/features/projects/access/inbox/AwcProjectInboxRestoreAllConfirmModal";
import type { useAwcProjectInbox } from "@/features/projects/access/inbox/hooks/useAwcProjectInbox";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

interface AwcProjectInboxBodyProps {
  readonly inbox: ReturnType<typeof useAwcProjectInbox>;
}

/** Loading / unavailable / Inbox list, or the Archived filter with Restore. */
export default function AwcProjectInboxBody({
  inbox,
}: AwcProjectInboxBodyProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  const [restoreAllOpen, setRestoreAllOpen] = useState(false);
  const ready = !inbox.isLoading && !inbox.unavailable;

  return (
    <>
      {inbox.isLoading ? (
        <p className={`text-xs ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>
          {copy.loading}
        </p>
      ) : null}
      {inbox.unavailable ? (
        <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {inbox.message ?? copy.unavailable}
        </p>
      ) : null}
      {ready && !inbox.showArchived ? (
        <AwcProjectInboxMessageList messages={inbox.messages} />
      ) : null}
      {ready && inbox.showArchived ? (
        <AwcProjectInboxArchivedPanel
          messages={inbox.archivedMessages}
          canRestore={inbox.canRestore}
          restoring={inbox.restoring}
          onRestoreOne={(messageId) => {
            void inbox.restore({ messageId });
          }}
          onRequestRestoreAll={() => setRestoreAllOpen(true)}
        />
      ) : null}
      <AwcProjectInboxRestoreAllConfirmModal
        isOpen={restoreAllOpen}
        restoring={inbox.restoring}
        onClose={() => setRestoreAllOpen(false)}
        onConfirm={() => {
          void inbox.restore({ all: true }).then((ok) => {
            if (ok) {
              setRestoreAllOpen(false);
            }
          });
        }}
      />
    </>
  );
}
