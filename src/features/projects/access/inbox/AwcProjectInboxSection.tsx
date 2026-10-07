"use client";

import { useCallback, useState } from "react";

import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxArchivedFilter from "@/features/projects/access/inbox/AwcProjectInboxArchivedFilter";
import AwcProjectInboxBody from "@/features/projects/access/inbox/AwcProjectInboxBody";
import AwcProjectInboxClearBar from "@/features/projects/access/inbox/AwcProjectInboxClearBar";
import AwcProjectInboxClearConfirmModal from "@/features/projects/access/inbox/AwcProjectInboxClearConfirmModal";
import AwcProjectInboxDispatchForm from "@/features/projects/access/inbox/AwcProjectInboxDispatchForm";
import { PROJECT_ACTIVITY_TASK_ANCHOR_ID } from "@/features/projects/utils/projectActivityTaskDeepLink.constant";
import { useAwcProjectInbox } from "@/features/projects/access/inbox/hooks/useAwcProjectInbox";
import { useAwcProjectInboxLivePoll } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxLivePoll";

interface AwcProjectInboxSectionProps {
  readonly projectId: string;
  /** Owner Access loaded successfully — show inbox. */
  readonly enabled: boolean;
  /** False for viewers — messages list only, no composer (Lead GO). */
  readonly canCompose?: boolean;
}

export default function AwcProjectInboxSection({
  projectId,
  enabled,
  canCompose = true,
}: AwcProjectInboxSectionProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  const inbox = useAwcProjectInbox(projectId, enabled);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const reloadSilent = inbox.reloadSilent;
  const onTick = useCallback(() => {
    void reloadSilent();
  }, [reloadSilent]);
  useAwcProjectInboxLivePoll({ enabled: enabled && !inbox.forbidden, onTick });

  if (!enabled || inbox.forbidden) {
    return null;
  }

  return (
    <AwcProjectAccessSection
      id="project-inbox"
      title={copy.title}
      hint={copy.honesty}
      count={inbox.unavailable ? undefined : inbox.messages.length}
      alertCount={inbox.messages.length > 0}
    >
      {canCompose ? (
        <AwcProjectInboxClearBar
          clearing={inbox.clearing}
          restoring={inbox.restoring}
          toast={inbox.toast}
          onRequestClear={() => setConfirmOpen(true)}
          onUndo={(archiveBatch) => {
            void inbox.restore({ archiveBatch });
          }}
        />
      ) : null}
      {inbox.unavailable ? null : (
        <AwcProjectInboxArchivedFilter
          archivedCount={inbox.archivedCount}
          pressed={inbox.showArchived}
          onToggle={() => inbox.setShowArchived((shown) => !shown)}
        />
      )}
      <AwcProjectInboxBody inbox={inbox} />
      {canCompose ? (
        <div id={PROJECT_ACTIVITY_TASK_ANCHOR_ID}>
          <AwcProjectInboxDispatchForm
            projectId={projectId}
            members={inbox.members}
            messages={inbox.messages}
          />
        </div>
      ) : (
        <p className="mt-2 text-xs text-awc-fg-muted">
          Viewers can&apos;t send messages.
        </p>
      )}
      <AwcProjectInboxClearConfirmModal
        isOpen={confirmOpen}
        clearing={inbox.clearing}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          void inbox.clearAll().then((ok) => {
            if (ok) {
              setConfirmOpen(false);
            }
          });
        }}
      />
    </AwcProjectAccessSection>
  );
}
