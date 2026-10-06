"use client";

import { useCallback, useRef, useState } from "react";

import { joinTypeIdForInvitePlatform } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";
import { shouldKeepCreatedInviteBanner } from "@/features/projects/access/invites/shouldKeepCreatedInviteBanner";

type CreatedInviteSelection = {
  readonly inviteId: string | null;
  /** null = no type picked (any assistant). */
  readonly platform: ProjectInvitePlatform | null;
  /** Picked types[] id; null = any assistant. */
  readonly joinTypeId: string | null;
};

const NO_CREATED_INVITE: CreatedInviteSelection = {
  inviteId: null,
  platform: null,
  joinTypeId: null,
};

/** Local Copy-prompt banner: set on create, cleared on dismiss or when the invite leaves the usable list. */
export const useCreatedInviteBanner = () => {
  const [createdInviteUrl, setCreatedInviteUrl] = useState<string | null>(null);
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(
    null,
  );
  /** inviteId + platform are one state value, written together only on create success. */
  const [createdInvite, setCreatedInvite] =
    useState<CreatedInviteSelection>(NO_CREATED_INVITE);
  const createdInviteIdRef = useRef<string | null>(null);

  const clearCreatedInviteBanner = useCallback(() => {
    createdInviteIdRef.current = null;
    setCreatedInvite(NO_CREATED_INVITE);
    setCreatedInviteUrl(null);
    setCreatedInviteToken(null);
  }, []);

  const setCreatedInviteIdTracked = useCallback(
    (
      inviteId: string | null,
      platform: ProjectInvitePlatform | null,
      joinTypeId: string | null = joinTypeIdForInvitePlatform(platform),
    ) => {
      createdInviteIdRef.current = inviteId;
      setCreatedInvite({ inviteId, platform, joinTypeId });
    },
    [],
  );

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
    createdInviteId: createdInvite.inviteId,
    createdInvitePlatform: createdInvite.platform,
    createdInviteJoinTypeId: createdInvite.joinTypeId,
    setCreatedInviteUrl,
    setCreatedInviteToken,
    setCreatedInviteId: setCreatedInviteIdTracked,
    clearCreatedInviteBanner,
    syncBannerWithUsableInvites,
  };
};
