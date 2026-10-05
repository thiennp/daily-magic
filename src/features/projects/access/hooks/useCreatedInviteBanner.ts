"use client";

import { useCallback, useRef, useState } from "react";

import { shouldKeepCreatedInviteBanner } from "@/features/projects/access/invites/shouldKeepCreatedInviteBanner";

/** Local Copy-prompt banner: set on create, cleared on dismiss or when the invite leaves the usable list. */
export const useCreatedInviteBanner = () => {
  const [createdInviteUrl, setCreatedInviteUrl] = useState<string | null>(null);
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(
    null,
  );
  const [createdInviteId, setCreatedInviteId] = useState<string | null>(null);
  const createdInviteIdRef = useRef<string | null>(null);

  const clearCreatedInviteBanner = useCallback(() => {
    createdInviteIdRef.current = null;
    setCreatedInviteId(null);
    setCreatedInviteUrl(null);
    setCreatedInviteToken(null);
  }, []);

  const setCreatedInviteIdTracked = useCallback((inviteId: string | null) => {
    createdInviteIdRef.current = inviteId;
    setCreatedInviteId(inviteId);
  }, []);

  const syncBannerWithUsableInvites = useCallback(
    (invites: readonly { readonly inviteId: string }[]) => {
      if (
        shouldKeepCreatedInviteBanner({
          createdInviteId: createdInviteIdRef.current,
          invites,
        })
      ) {
        return;
      }
      clearCreatedInviteBanner();
    },
    [clearCreatedInviteBanner],
  );

  return {
    createdInviteUrl,
    createdInviteToken,
    createdInviteId,
    setCreatedInviteUrl,
    setCreatedInviteToken,
    setCreatedInviteId: setCreatedInviteIdTracked,
    clearCreatedInviteBanner,
    syncBannerWithUsableInvites,
  };
};
