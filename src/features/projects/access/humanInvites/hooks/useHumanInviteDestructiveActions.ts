"use client";

import { useCallback, useState } from "react";

import {
  removeHumanMemberApi,
  revokeHumanInviteApi,
} from "@/features/projects/access/humanInvites/humanInviteApi";
import {
  addHiddenId,
  removeHiddenId,
} from "@/features/projects/access/humanInvites/hooks/hiddenIdSet";
import { useDeferredDestructiveAction } from "@/features/projects/access/humanInvites/hooks/useDeferredDestructiveAction";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export const useHumanInviteDestructiveActions = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setMessage: (message: string | null) => void;
}) => {
  const copy = HUMAN_INVITE_UI_COPY;
  const [hiddenPending, setHiddenPending] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [hiddenRemoved, setHiddenRemoved] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const revokeCommit = useCallback(
    async (inviteId: string, options?: { readonly keepalive?: boolean }) => {
      const result = await revokeHumanInviteApi(
        input.projectId,
        inviteId,
        options,
      );
      if (!result.ok) {
        input.setMessage(result.errorMessage ?? copy.revokeFailed);
        setHiddenPending((prev) => removeHiddenId(prev, inviteId));
        return;
      }
      await input.reload();
    },
    [copy.revokeFailed, input],
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
        input.setMessage(result.errorMessage ?? copy.removeFailed);
        setHiddenRemoved((prev) => removeHiddenId(prev, membershipId));
        return;
      }
      await input.reload();
    },
    [copy.removeFailed, input],
  );

  const revokeUndo = useDeferredDestructiveAction({ onCommit: revokeCommit });
  const removeUndo = useDeferredDestructiveAction({ onCommit: removeCommit });

  const scheduleRevoke = useCallback(
    (inviteId: string) => {
      setHiddenPending((prev) => addHiddenId(prev, inviteId));
      revokeUndo.schedule(inviteId, copy.revokeScheduled);
    },
    [copy.revokeScheduled, revokeUndo],
  );

  const scheduleRemove = useCallback(
    (membershipId: string) => {
      setHiddenRemoved((prev) => addHiddenId(prev, membershipId));
      removeUndo.schedule(membershipId, copy.removeScheduled);
    },
    [copy.removeScheduled, removeUndo],
  );

  const cancelRevoke = useCallback(() => {
    const id = revokeUndo.pending?.id;
    revokeUndo.cancel();
    if (id) setHiddenPending((prev) => removeHiddenId(prev, id));
  }, [revokeUndo]);

  const cancelRemove = useCallback(() => {
    const id = removeUndo.pending?.id;
    removeUndo.cancel();
    if (id) setHiddenRemoved((prev) => removeHiddenId(prev, id));
  }, [removeUndo]);

  const undoToast =
    revokeUndo.pending !== null
      ? { message: revokeUndo.pending.label, onUndo: cancelRevoke }
      : removeUndo.pending !== null
        ? { message: removeUndo.pending.label, onUndo: cancelRemove }
        : null;

  return {
    scheduleRevoke,
    scheduleRemove,
    hiddenPending,
    hiddenRemoved,
    undoToast,
  };
};
