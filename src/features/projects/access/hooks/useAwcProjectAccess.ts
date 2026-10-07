"use client";

import { useCallback } from "react";

import { applyAwcProjectAccessSnapshot } from "@/features/projects/access/hooks/applyAwcProjectAccessSnapshot";
import { loadAwcProjectAccess } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectAccessInitialLoad } from "@/features/projects/access/hooks/useAwcProjectAccessInitialLoad";
import { useAwcProjectAccessLivePoll } from "@/features/projects/access/hooks/useAwcProjectAccessLivePoll";
import { useAwcProjectAccessModel } from "@/features/projects/access/hooks/useAwcProjectAccessModel";
import { useAwcProjectAccessMutations } from "@/features/projects/access/hooks/useAwcProjectAccessMutations";
import { useAwcProjectInviteActions } from "@/features/projects/access/hooks/useAwcProjectInviteActions";
import { useCreatedInviteBanner } from "@/features/projects/access/hooks/useCreatedInviteBanner";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const useAwcProjectAccess = (projectId: string) => {
  const model = useAwcProjectAccessModel();
  const banner = useCreatedInviteBanner(projectId);
  const syncBanner = banner.syncBannerWithUsableInvites;
  const {
    knownMemberIdsRef,
    skipAutoApproveDetectRef,
    bannerTimerRef,
    snapshotSetters,
    setIsLoading,
    setMessage,
    setFolderRefs,
    markSkipAutoApproveDetect,
  } = model;

  const applySnapshot = useCallback(
    (snapshot: Awaited<ReturnType<typeof loadAwcProjectAccess>>) => {
      applyAwcProjectAccessSnapshot({
        snapshot,
        knownMemberIdsRef,
        skipAutoApproveDetectRef,
        bannerTimerRef,
        syncBannerWithUsableInvites: syncBanner,
        setters: snapshotSetters,
      });
    },
    [
      syncBanner,
      knownMemberIdsRef,
      skipAutoApproveDetectRef,
      bannerTimerRef,
      snapshotSetters,
    ],
  );

  // DF-015: post-action refresh is silent (like the live poll). Flipping
  // isLoading here made every rail/settings button unmount + remount the
  // whole Members panel (consumers gate their body on !isLoading).
  // Only the initial load (useAwcProjectAccessInitialLoad) shows the spinner.
  const reload = useCallback(async () => {
    applySnapshot(await loadAwcProjectAccess(projectId));
  }, [projectId, applySnapshot]);

  useAwcProjectAccessInitialLoad({
    projectId,
    onSnapshot: applySnapshot,
    setIsLoading,
  });
  useAwcProjectAccessLivePoll({ projectId, onSnapshot: applySnapshot });

  const setFriendlyMessage = useCallback(
    (value: string | null) => {
      setMessage(value === null ? null : mapProjectAccessError(value, value));
    },
    [setMessage],
  );

  const inviteActions = useAwcProjectInviteActions({
    projectId,
    reload,
    setMessage: setFriendlyMessage,
    setCreatedInviteUrl: banner.setCreatedInviteUrl,
    setCreatedInviteToken: banner.setCreatedInviteToken,
    setCreatedInviteId: banner.setCreatedInviteId,
    rememberCreatedInvite: banner.rememberCreatedInvite,
    forgetCreatedInvite: banner.forgetCreatedInvite,
  });
  const mutations = useAwcProjectAccessMutations({
    projectId,
    reload,
    setMessage: setFriendlyMessage,
  });

  const approve = useCallback(
    async (requestId: string, projectDisplayName?: string) => {
      markSkipAutoApproveDetect();
      return mutations.approve(requestId, projectDisplayName);
    },
    [mutations, markSkipAutoApproveDetect],
  );

  return {
    members: model.members,
    pending: model.pending,
    expired: model.expired,
    folderRefs: model.folderRefs,
    invites: model.invites,
    projectName: model.projectName,
    message: model.message,
    loadError: model.loadError,
    createdInviteUrl: banner.createdInviteUrl,
    createdInviteToken: banner.createdInviteToken,
    createdInvitePlatform: banner.createdInvitePlatform,
    createdInviteJoinTypeId: banner.createdInviteJoinTypeId,
    createdInvitePrompts: banner.createdInvitePrompts,
    clearCreatedInviteBanner: banner.clearCreatedInviteBanner,
    isLoading: model.isLoading,
    reload,
    ...mutations,
    approve,
    ...inviteActions,
    setFolderRefs,
    setMessage: setFriendlyMessage,
    autoApprovedBanner: model.autoApprovedBanner,
    recentlyAutoApprovedIds: model.recentlyAutoApprovedIds,
  };
};
