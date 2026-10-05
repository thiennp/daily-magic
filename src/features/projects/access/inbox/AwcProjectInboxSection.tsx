"use client";

import { useCallback, useState } from "react";

import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxClearBar from "@/features/projects/access/inbox/AwcProjectInboxClearBar";
import AwcProjectInboxClearConfirmModal from "@/features/projects/access/inbox/AwcProjectInboxClearConfirmModal";
import AwcProjectInboxDispatchForm from "@/features/projects/access/inbox/AwcProjectInboxDispatchForm";
import AwcProjectInboxMessageList from "@/features/projects/access/inbox/AwcProjectInboxMessageList";
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
          toast={inbox.clearToast}
          onRequestClear={() => setConfirmOpen(true)}
        />
      ) : null}
      {inbox.isLoading ? (
        <p className="text-xs text-gray-400">{copy.loading}</p>
      ) : null}
      {inbox.unavailable ? (
        <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {inbox.message ?? copy.unavailable}
        </p>
      ) : null}
      {!inbox.isLoading && !inbox.unavailable ? (
        <AwcProjectInboxMessageList messages={inbox.messages} />
      ) : null}
      {canCompose ? (
        <AwcProjectInboxDispatchForm
          projectId={projectId}
          members={inbox.members}
          messages={inbox.messages}
        />
      ) : (
        <p className="mt-2 text-xs text-gray-500">
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
