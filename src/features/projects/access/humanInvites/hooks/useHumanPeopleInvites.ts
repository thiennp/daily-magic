"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createHumanInviteApi,
  fetchHumanInvites,
  removeHumanMemberApi,
  revokeHumanInviteApi,
} from "@/features/projects/access/humanInvites/humanInviteApi";
import { mapCreateHumanInviteError } from "@/features/projects/access/humanInvites/utils/buildHumanInviteCreateBody";
import { useDeferredDestructiveAction } from "@/features/projects/access/humanInvites/hooks/useDeferredDestructiveAction";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import { filterJoinedHumanMembers } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";
import type {
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
  HumanInviteListItem,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";

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
  const [createdInvite, setCreatedInvite] =
    useState<CreateHumanInviteResponse | null>(null);
  const [createBusy, setCreateBusy] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [hiddenPending, setHiddenPending] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [hiddenRemoved, setHiddenRemoved] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

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
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) {
        void reload();
      }
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reload]);

  const revokeCommit = useCallback(
    async (inviteId: string, options?: { readonly keepalive?: boolean }) => {
      const result = await revokeHumanInviteApi(
        input.projectId,
        inviteId,
        options,
      );
      if (!result.ok) {
        setMessage(result.errorMessage ?? copy.revokeFailed);
        setHiddenPending((prev) => {
          const next = new Set(prev);
          next.delete(inviteId);
          return next;
        });
        return;
      }
      await reload();
    },
    [copy.revokeFailed, input.projectId, reload],
  );

  const removeCommit = useCallback(
    async (
      membershipId: string,
      options?: { readonly keepalive?: boolean },
    ) => {
      const result = await removeHumanMemberApi(
        input.projectId,
        membershipId,
        options,
      );
      if (!result.ok) {
        setMessage(result.errorMessage ?? copy.removeFailed);
        setHiddenRemoved((prev) => {
          const next = new Set(prev);
          next.delete(membershipId);
          return next;
        });
        return;
      }
      await reload();
    },
    [copy.removeFailed, input.projectId, reload],
  );

  const revokeUndo = useDeferredDestructiveAction({ onCommit: revokeCommit });
  const removeUndo = useDeferredDestructiveAction({ onCommit: removeCommit });

  const scheduleRevoke = useCallback(
    (inviteId: string) => {
      setHiddenPending((prev) => new Set(prev).add(inviteId));
      revokeUndo.schedule(inviteId, copy.revokeScheduled);
    },
    [copy.revokeScheduled, revokeUndo],
  );

  const scheduleRemove = useCallback(
    (membershipId: string) => {
      setHiddenRemoved((prev) => new Set(prev).add(membershipId));
      removeUndo.schedule(membershipId, copy.removeScheduled);
    },
    [copy.removeScheduled, removeUndo],
  );

  const cancelRevoke = useCallback(() => {
    const id = revokeUndo.pending?.id;
    revokeUndo.cancel();
    if (id) {
      setHiddenPending((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [revokeUndo]);

  const cancelRemove = useCallback(() => {
    const id = removeUndo.pending?.id;
    removeUndo.cancel();
    if (id) {
      setHiddenRemoved((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [removeUndo]);

  const createInvite = useCallback(
    async (body: CreateHumanInviteBody) => {
      setCreateBusy(true);
      setCreateError(null);
      const result = await createHumanInviteApi(input.projectId, body);
      setCreateBusy(false);
      if (!result.ok) {
        setCreateError(
          mapCreateHumanInviteError(result.code, result.errorMessage),
        );
        return;
      }
      const created: CreateHumanInviteResponse = {
        inviteId: result.inviteId,
        url: result.url,
        token: result.token,
        role: result.role,
        email: result.email,
        requireEmailMatch: result.requireEmailMatch,
        expiresAt: result.expiresAt,
        maxUses: result.maxUses,
        usesRemaining: result.usesRemaining,
      };
      setCreatedInvite(created);
      void navigator.clipboard.writeText(created.url).then(
        () => setMessage(copy.linkCopiedToast),
        () => setMessage(copy.copyFailed),
      );
      await reload();
    },
    [copy.copyFailed, copy.linkCopiedToast, input.projectId, reload],
  );

  const copyCreatedLink = useCallback(
    (url: string) => {
      void navigator.clipboard.writeText(url).then(
        () => setMessage(copy.linkCopiedToast),
        () => setMessage(copy.copyFailed),
      );
    },
    [copy.copyFailed, copy.linkCopiedToast],
  );

  const joinedHumans = useMemo(
    () => filterJoinedHumanMembers(input.accessMembers),
    [input.accessMembers],
  );

  const undoToast =
    revokeUndo.pending !== null
      ? { message: revokeUndo.pending.label, onUndo: cancelRevoke }
      : removeUndo.pending !== null
        ? { message: removeUndo.pending.label, onUndo: cancelRemove }
        : null;

  return {
    invites,
    joinedHumans,
    isLoading,
    loadError,
    message,
    setMessage,
    panelOpen,
    setPanelOpen,
    createdInvite,
    clearCreatedInvite: () => setCreatedInvite(null),
    createBusy,
    createError,
    createInvite,
    copyCreatedLink,
    scheduleRevoke,
    scheduleRemove,
    hiddenPending,
    hiddenRemoved,
    undoToast,
    reload,
  };
};
