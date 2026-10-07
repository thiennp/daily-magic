"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxMessageList from "@/features/projects/access/inbox/AwcProjectInboxMessageList";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

interface AwcProjectInboxArchivedPanelProps {
  readonly messages: readonly AwcProjectInboxMessage[];
  readonly canRestore: boolean;
  readonly restoring: boolean;
  readonly onRestoreOne: (messageId: string) => void;
  readonly onRequestRestoreAll: () => void;
}

/**
 * Archived filter body. Readable by everyone who can read Messages;
 * Restore / Restore all are owner-only — shown disabled with the reason.
 */
export default function AwcProjectInboxArchivedPanel({
  messages,
  canRestore,
  restoring,
  onRestoreOne,
  onRequestRestoreAll,
}: AwcProjectInboxArchivedPanelProps) {
  const copy = AWC_PROJECT_INBOX_COPY.archived;
  const reason = canRestore ? undefined : copy.ownerOnlyReason;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {canRestore ? (
          <span />
        ) : (
          <p className="text-[11px] text-awc-fg-muted dark:text-gray-400">
            {copy.ownerOnlyReason}
          </p>
        )}
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          disabled={!canRestore || restoring || messages.length === 0}
          title={reason}
          onClick={onRequestRestoreAll}
        >
          {copy.restoreAll}
        </button>
      </div>
      <AwcProjectInboxMessageList
        messages={messages}
        emptyText={copy.empty}
        renderRowAction={(row) => (
          <button
            type="button"
            className={AWC_PROJECT_ACCESS_CTA.secondary}
            disabled={!canRestore || restoring}
            title={reason}
            onClick={() => onRestoreOne(row.messageId)}
          >
            {copy.restore}
          </button>
        )}
      />
    </div>
  );
}
