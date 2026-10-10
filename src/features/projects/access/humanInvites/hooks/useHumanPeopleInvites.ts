"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchHumanInvites } from "@/features/projects/access/humanInvites/humanInviteApi";
import { useHumanInviteEmailActions } from "@/features/projects/access/humanInvites/hooks/useHumanInviteEmailActions";
import { useHumanInviteCreateActions } from "@/features/projects/access/humanInvites/hooks/useHumanInviteCreateActions";
import { useHumanInviteDestructiveActions } from "@/features/projects/access/humanInvites/hooks/useHumanInviteDestructiveActions";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { filterJoinedHumanMembers } from "@/features/projects/access/humanInvites/utils/public-api/presentation";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/public-api/types";

export const useHumanPeopleInvites = (input: {
  readonly projectId: string;
  readonly enabled: boolean;
  readonly accessMembers: readonly AccessMemberForHumanFilter[];
}) => {
  const copy = HUMAN_INVITE_UI_COPY;
  const [invites, setInvites] = useState<readonly HumanInviteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const reload = useCallback(async () => {
    if (!input.enabled) return;
    setIsLoading(true);
    const result = await fetchHumanInvites(input.projectId);
    setIsLoading(false);
    if (!result.ok) {
      setLoadError(result.errorMessage ?? copy.loadFailed);
      setInvites([]);
      return;
    }
    setLoadError(null);
    setInvites(result.invites);
  }, [copy.loadFailed, input.enabled, input.projectId]);

  useEffect(() => {
    const cancelled = { current: false };
    const timer = window.setTimeout(() => {
      if (!cancelled.current) {
        void reload();
      }
    }, 0);
    return () => {
      cancelled.current = true;
      window.clearTimeout(timer);
    };
  }, [reload]);

  const create = useHumanInviteCreateActions({
    projectId: input.projectId,
    reload,
    setMessage,
  });
  const email = useHumanInviteEmailActions({
    projectId: input.projectId,
    reload,
    setMessage,
  });
  const destructive = useHumanInviteDestructiveActions({
    projectId: input.projectId,
    reload,
    setMessage,
  });

  const joinedHumans = useMemo(
    () => filterJoinedHumanMembers(input.accessMembers),
    [input.accessMembers],
  );

  return {
    invites,
    joinedHumans,
    isLoading,
    loadError,
    message,
    setMessage,
    panelOpen,
    setPanelOpen,
    createdInvite: create.createdInvite,
    clearCreatedInvite: create.clearCreatedInvite,
    createBusy: create.createBusy,
    createError: create.createError,
    createInvite: create.createInvite,
    copyCreatedLink: create.copyCreatedLink,
    sendBusy: email.sendBusy,
    sendError: email.sendError,
    clearSendError: email.clearSendError,
    sendEmails: email.sendEmails,
    decidingId: email.decidingId,
    approveRequest: email.approveRequest,
    denyRequest: email.denyRequest,
    scheduleRevoke: destructive.scheduleRevoke,
    scheduleRemove: destructive.scheduleRemove,
    hiddenPending: destructive.hiddenPending,
    hiddenRemoved: destructive.hiddenRemoved,
    undoToast: destructive.undoToast,
    reload,
  };
};
