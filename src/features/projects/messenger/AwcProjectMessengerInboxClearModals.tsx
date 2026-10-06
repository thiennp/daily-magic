"use client";

import AwcProjectInboxClearConfirmModal from "@/features/projects/access/inbox/AwcProjectInboxClearConfirmModal";
import AwcProjectInboxRestoreAllConfirmModal from "@/features/projects/access/inbox/AwcProjectInboxRestoreAllConfirmModal";
import type { AwcProjectMessengerInboxClearState } from "@/features/projects/messenger/hooks/useAwcProjectMessengerInboxClear";

interface AwcProjectMessengerInboxClearModalsProps {
  readonly clear: AwcProjectMessengerInboxClearState;
}

/** Clear all + Restore all confirms for the Messages bar — render once. */
export default function AwcProjectMessengerInboxClearModals({
  clear,
}: AwcProjectMessengerInboxClearModalsProps) {
  const { inbox, setClearOpen, setRestoreAllOpen } = clear;

  return (
    <>
      <AwcProjectInboxClearConfirmModal
        isOpen={clear.clearOpen}
        clearing={inbox.clearing}
        onClose={() => setClearOpen(false)}
        onConfirm={() => {
          void inbox.clearAll().then((ok) => {
            if (ok) {
              setClearOpen(false);
            }
          });
        }}
      />
      <AwcProjectInboxRestoreAllConfirmModal
        isOpen={clear.restoreAllOpen}
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
