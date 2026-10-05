"use client";

import { useCallback, useState } from "react";

import { createHumanInviteApi } from "@/features/projects/access/humanInvites/humanInviteApi";
import { mapCreateHumanInviteError } from "@/features/projects/access/humanInvites/utils/buildHumanInviteCreateBody";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type {
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export const useHumanInviteCreateActions = (input: {
  readonly projectId: string;
  readonly reload: () => Promise<void>;
  readonly setMessage: (message: string | null) => void;
}) => {
  const copy = HUMAN_INVITE_UI_COPY;
  const [createdInvite, setCreatedInvite] =
    useState<CreateHumanInviteResponse | null>(null);
  const [createBusy, setCreateBusy] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

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
        () => input.setMessage(copy.linkCopiedToast),
        () => input.setMessage(copy.copyFailed),
      );
      await input.reload();
    },
    [copy.copyFailed, copy.linkCopiedToast, input],
  );

  const copyCreatedLink = useCallback(
    (url: string) => {
      void navigator.clipboard.writeText(url).then(
        () => input.setMessage(copy.linkCopiedToast),
        () => input.setMessage(copy.copyFailed),
      );
    },
    [copy.copyFailed, copy.linkCopiedToast, input],
  );

  return {
    createdInvite,
    clearCreatedInvite: () => setCreatedInvite(null),
    createBusy,
    createError,
    createInvite,
    copyCreatedLink,
  };
};
