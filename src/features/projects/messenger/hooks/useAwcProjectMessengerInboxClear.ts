"use client";

import { useState } from "react";

import { useAwcProjectInbox } from "@/features/projects/access/inbox/hooks/useAwcProjectInbox";

/**
 * One inbox fetch per Messages tab — enabled only for owners (no requests
 * otherwise). Bar shows with >=1 message, while a toast (6s Undo) is up,
 * while the Archived view is on, or when archivedCount > 0 so Clear / Restore
 * stay reachable.
 */
export const useAwcProjectMessengerInboxClear = (
  projectId: string,
  isOwner: boolean,
) => {
  const inbox = useAwcProjectInbox(projectId, isOwner);
  const [clearOpen, setClearOpen] = useState(false);
  const [restoreAllOpen, setRestoreAllOpen] = useState(false);
  const visible =
    isOwner &&
    !inbox.forbidden &&
    !inbox.unavailable &&
    (inbox.messages.length >= 1 ||
      inbox.toast !== null ||
      inbox.showArchived ||
      inbox.archivedCount > 0);

  return {
    inbox,
    visible,
    clearOpen,
    setClearOpen,
    restoreAllOpen,
    setRestoreAllOpen,
  };
};

export type AwcProjectMessengerInboxClearState = ReturnType<
  typeof useAwcProjectMessengerInboxClear
>;
