"use client";

import { useCallback, useState } from "react";

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

  const applySnapshot = useCallback(
    (snapshot: Awaited<ReturnType<typeof loadAwcProjectAccess>>) => {
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
    ...inviteActions,
    setFolderRefs,
    setMessage: setFriendlyMessage,
  };
};
