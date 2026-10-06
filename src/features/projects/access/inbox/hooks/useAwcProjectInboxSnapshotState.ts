"use client";

import { useCallback, useState } from "react";

import type { AwcProjectInboxSnapshot } from "@/features/projects/access/inbox/hooks/loadAwcProjectInbox";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

type InboxView = {
  readonly messages: readonly AwcProjectInboxMessage[];
  readonly archivedMessages: readonly AwcProjectInboxMessage[];
  readonly archivedCount: number;
  readonly canRestore: boolean;
  readonly unavailable: boolean;
  readonly forbidden: boolean;
  readonly message: string | null;
};

const EMPTY_VIEW: InboxView = {
  messages: [],
  archivedMessages: [],
  archivedCount: 0,
  canRestore: false,
  unavailable: false,
  forbidden: false,
  message: null,
};

const emptyMembers: readonly AccessMembershipView[] = [];

/** Inbox + Archived list state, applied from one snapshot. */
export const useAwcProjectInboxSnapshotState = (enabled: boolean) => {
  const [view, setView] = useState<InboxView>(EMPTY_VIEW);
  const [members, setMembers] =
    useState<readonly AccessMembershipView[]>(emptyMembers);
  const [isLoading, setIsLoading] = useState(enabled);

  const applySnapshot = useCallback((snapshot: AwcProjectInboxSnapshot) => {
    setMembers(snapshot.members);
    if (snapshot.ok) {
      setView({
        messages: snapshot.messages,
        archivedMessages: snapshot.archivedMessages,
        archivedCount: snapshot.archivedCount,
        canRestore: snapshot.canRestore,
        unavailable: false,
        forbidden: false,
        message: null,
      });
      return;
    }
    setView({
      ...EMPTY_VIEW,
      unavailable: snapshot.unavailable,
      forbidden: snapshot.forbidden,
      message: snapshot.errorMessage,
    });
  }, []);

  return { view, members, isLoading, setIsLoading, applySnapshot };
};
