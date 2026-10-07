"use client";

import { useCallback, useRef, useState } from "react";

import { joinTypeIdForInvitePlatform } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import {
  pruneCreatedInvitePrompts,
  readCreatedInvitePrompts,
  writeCreatedInvitePrompts,
  type CreatedInvitePrompt,
  type CreatedInvitePrompts,
} from "@/features/projects/access/invites/createdInvitePrompts";
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

const NO_PROMPTS: CreatedInvitePrompts = {};

/**
 * Local Copy-prompt banner: set on create, cleared on dismiss or when the
 * invite leaves the usable list. Also keeps every invite this tab created
 * (DF-014) so a pending "Invite sent" row can Copy the prompt again;
 * with projectId those survive reload via sessionStorage (owner tab only).
 */
export const useCreatedInviteBanner = (projectId?: string) => {
  const [createdInviteUrl, setCreatedInviteUrl] = useState<string | null>(null);
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(
    null,
  );
  /** inviteId + platform are one state value, written together only on create success. */
  const [createdInvite, setCreatedInvite] =
    useState<CreatedInviteSelection>(NO_CREATED_INVITE);
  const createdInviteIdRef = useRef<string | null>(null);
  const createdAtMsRef = useRef<number | null>(null);
  const [createdInvitePrompts, setCreatedInvitePrompts] =
    useState<CreatedInvitePrompts>(NO_PROMPTS);
  const promptsRef = useRef<CreatedInvitePrompts>(NO_PROMPTS);
  const hydratedRef = useRef(false);

  const commitPrompts = useCallback(
    (next: CreatedInvitePrompts) => {
      promptsRef.current = next;
      setCreatedInvitePrompts(next);
      if (projectId) writeCreatedInvitePrompts(projectId, next);
    },
    [projectId],
  );

  const clearCreatedInviteBanner = useCallback(() => {
    createdInviteIdRef.current = null;
    createdAtMsRef.current = null;
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
      createdAtMsRef.current = inviteId === null ? null : Date.now();
      setCreatedInvite({ inviteId, platform, joinTypeId });
    },
    [],
  );

  /** Remember a just-created invite so its pending row can Copy again. */
  const rememberCreatedInvite = useCallback(
    (prompt: Omit<CreatedInvitePrompt, "createdAtMs">) => {
      commitPrompts({
        ...promptsRef.current,
        [prompt.inviteId]: { ...prompt, createdAtMs: Date.now() },
      });
    },
    [commitPrompts],
  );

  /** Owner cancelled the invite: drop its prompt (and banner) right away. */
  const forgetCreatedInvite = useCallback(
    (inviteId: string) => {
      if (inviteId in promptsRef.current) {
        commitPrompts(
          Object.fromEntries(
            Object.entries(promptsRef.current).filter(
              ([id]) => id !== inviteId,
            ),
          ),
        );
      }
      if (createdInviteIdRef.current === inviteId) {
        clearCreatedInviteBanner();
      }
    },
    [commitPrompts, clearCreatedInviteBanner],
  );

  const syncBannerWithUsableInvites = useCallback(
    (invites: readonly { readonly inviteId: string }[]) => {
      const nowMs = Date.now();
      const base = hydratedRef.current
        ? promptsRef.current
        : {
            ...(projectId ? readCreatedInvitePrompts(projectId) : NO_PROMPTS),
            ...promptsRef.current,
          };
      hydratedRef.current = true;
      const pruned = pruneCreatedInvitePrompts({
        prompts: base,
        invites,
        nowMs,
      });
      if (
        base !== promptsRef.current ||
        Object.keys(pruned).length !== Object.keys(base).length
      ) {
        commitPrompts(pruned);
      }
      if (
        shouldKeepCreatedInviteBanner({
          createdInviteId: createdInviteIdRef.current,
          createdAtMs: createdAtMsRef.current,
          invites,
          nowMs,
        })
      ) {
        return;
      }
      clearCreatedInviteBanner();
    },
    [projectId, commitPrompts, clearCreatedInviteBanner],
  );

  return {
    createdInviteUrl,
    createdInviteToken,
    createdInviteId: createdInvite.inviteId,
    createdInvitePlatform: createdInvite.platform,
    createdInviteJoinTypeId: createdInvite.joinTypeId,
    createdInvitePrompts,
    setCreatedInviteUrl,
    setCreatedInviteToken,
    setCreatedInviteId: setCreatedInviteIdTracked,
    rememberCreatedInvite,
    forgetCreatedInvite,
    clearCreatedInviteBanner,
    syncBannerWithUsableInvites,
  };
};
