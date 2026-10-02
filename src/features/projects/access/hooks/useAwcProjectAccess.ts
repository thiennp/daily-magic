"use client";

import { useCallback, useRef, useState } from "react";

import {
  loadAwcProjectAccess,
  type AwcProjectAccessFolderRef,
  type AwcProjectAccessInvite,
  type AwcProjectAccessMember,
  type AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectAccessInitialLoad } from "@/features/projects/access/hooks/useAwcProjectAccessInitialLoad";
import { useAwcProjectAccessLivePoll } from "@/features/projects/access/hooks/useAwcProjectAccessLivePoll";
import { useAwcProjectAccessMutations } from "@/features/projects/access/hooks/useAwcProjectAccessMutations";
import { useAwcProjectInviteActions } from "@/features/projects/access/hooks/useAwcProjectInviteActions";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const useAwcProjectAccess = (projectId: string) => {
  const [members, setMembers] = useState<readonly AwcProjectAccessMember[]>([]);
  const [pending, setPending] = useState<readonly AwcProjectAccessPending[]>(
    [],
  );
  const [folderRefs, setFolderRefs] = useState<
    readonly AwcProjectAccessFolderRef[]
  >([]);
  const [invites, setInvites] = useState<readonly AwcProjectAccessInvite[]>([]);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [createdInviteUrl, setCreatedInviteUrl] = useState<string | null>(null);
  const [createdInviteToken, setCreatedInviteToken] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [autoApprovedBanner, setAutoApprovedBanner] = useState<string | null>(
    null,
  );
  const [recentlyAutoApprovedIds, setRecentlyAutoApprovedIds] = useState<
    readonly string[]
  >([]);
  const knownMemberIdsRef = useRef<ReadonlySet<string> | null>(null);
  const skipAutoApproveDetectRef = useRef(false);
  const bannerTimerRef = useRef<number | null>(null);

  const applySnapshot = useCallback(
    (snapshot: Awaited<ReturnType<typeof loadAwcProjectAccess>>) => {
      const nextIds = new Set(snapshot.members.map((member) => member.id));
      const prevIds = knownMemberIdsRef.current;
      if (
        prevIds !== null &&
        !skipAutoApproveDetectRef.current &&
        snapshot.ok
      ) {
        const added = [...nextIds].filter((id) => !prevIds.has(id));
        if (added.length > 0) {
          setAutoApprovedBanner(AWC_PROJECT_ACCESS_COPY.autoApprovedBanner);
          setRecentlyAutoApprovedIds(added);
          if (bannerTimerRef.current !== null) {
            window.clearTimeout(bannerTimerRef.current);
          }
          bannerTimerRef.current = window.setTimeout(() => {
            setAutoApprovedBanner(null);
            setRecentlyAutoApprovedIds([]);
            bannerTimerRef.current = null;
          }, 4000);
        }
      }
      knownMemberIdsRef.current = nextIds;
      skipAutoApproveDetectRef.current = false;
      setMembers(snapshot.members);
      setPending(snapshot.pending);
      setFolderRefs(snapshot.folderRefs);
      setInvites(snapshot.invites);
      setProjectName(snapshot.projectName);
      setLoadError(snapshot.ok ? null : snapshot.errorMessage);
    },
    [],
  );

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      applySnapshot(await loadAwcProjectAccess(projectId));
    } finally {
      setIsLoading(false);
    }
  }, [projectId, applySnapshot]);

  useAwcProjectAccessInitialLoad({
    projectId,
    onSnapshot: applySnapshot,
    setIsLoading,
  });
  useAwcProjectAccessLivePoll({ projectId, onSnapshot: applySnapshot });

  const setFriendlyMessage = useCallback((value: string | null) => {
    setMessage(value === null ? null : mapProjectAccessError(value, value));
  }, []);

  const inviteActions = useAwcProjectInviteActions({
    projectId,
    reload,
    setMessage: setFriendlyMessage,
    setCreatedInviteUrl,
    setCreatedInviteToken,
  });
  const mutations = useAwcProjectAccessMutations({
    projectId,
    reload,
    setMessage: setFriendlyMessage,
  });

  const approve = useCallback(
    async (requestId: string, projectDisplayName?: string) => {
      skipAutoApproveDetectRef.current = true;
      return mutations.approve(requestId, projectDisplayName);
    },
    [mutations],
  );

  return {
    members,
    pending,
    folderRefs,
    invites,
    projectName,
    message,
    loadError,
    createdInviteUrl,
    createdInviteToken,
    setCreatedInviteUrl,
    setCreatedInviteToken,
    isLoading,
    reload,
    ...mutations,
    approve,
    ...inviteActions,
    setFolderRefs,
    setMessage: setFriendlyMessage,
    autoApprovedBanner,
    recentlyAutoApprovedIds,
  };
};
