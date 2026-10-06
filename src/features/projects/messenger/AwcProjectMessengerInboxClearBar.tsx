"use client";

import AwcProjectInboxArchivedFilter from "@/features/projects/access/inbox/AwcProjectInboxArchivedFilter";
import AwcProjectInboxArchivedPanel from "@/features/projects/access/inbox/AwcProjectInboxArchivedPanel";
import AwcProjectInboxClearBar from "@/features/projects/access/inbox/AwcProjectInboxClearBar";
import type { AwcProjectMessengerInboxClearState } from "@/features/projects/messenger/hooks/useAwcProjectMessengerInboxClear";

interface AwcProjectMessengerInboxClearBarProps {
  readonly clear: AwcProjectMessengerInboxClearState;
}

/** Owner Clear all + Archived ({n}) / Restore on the Messages tab (tip copy only). */
export default function AwcProjectMessengerInboxClearBar({
  clear,
}: AwcProjectMessengerInboxClearBarProps) {
  const { inbox } = clear;

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <AwcProjectInboxClearBar
          clearing={inbox.clearing}
          restoring={inbox.restoring}
          toast={inbox.toast}
          onRequestClear={() => clear.setClearOpen(true)}
          onUndo={(archiveBatch) => {
            void inbox.restore({ archiveBatch });
          }}
        />
        <AwcProjectInboxArchivedFilter
          archivedCount={inbox.archivedCount}
          pressed={inbox.showArchived}
          onToggle={() => inbox.setShowArchived((shown) => !shown)}
        />
      </div>
      {inbox.showArchived ? (
        <AwcProjectInboxArchivedPanel
          messages={inbox.archivedMessages}
          canRestore={inbox.canRestore}
          restoring={inbox.restoring}
          onRestoreOne={(messageId) => {
            void inbox.restore({ messageId });
          }}
          onRequestRestoreAll={() => clear.setRestoreAllOpen(true)}
        />
      ) : null}
    </div>
  );
}
