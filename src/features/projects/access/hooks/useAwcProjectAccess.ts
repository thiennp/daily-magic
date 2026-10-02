"use client";

import { useCallback, useEffect, useState } from "react";

import {
  loadAwcProjectAccess,
  type AwcProjectAccessFolderRef,
  type AwcProjectAccessInvite,
  type AwcProjectAccessMember,
  type AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectInviteActions } from "@/features/projects/access/hooks/useAwcProjectInviteActions";
import { postProjectAccessAction } from "@/features/projects/access/utils/projectAccessApi";

export const useAwcProjectAccess = (projectId: string) => {
  const [members, setMembers] = useState<readonly AwcProjectAccessMember[]>([]);
  const [pending, setPending] = useState<readonly AwcProjectAccessPending[]>(
    [],
  );
  const [folderRefs, setFolderRefs] = useState<
    readonly AwcProjectAccessFolderRef[]
  >([]);
  const [invites, setInvites] = useState<readonly AwcProjectAccessInvite[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [createdInviteUrl, setCreatedInviteUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const snapshot = await loadAwcProjectAccess(projectId);
      setMembers(snapshot.members);
      setPending(snapshot.pending);
      setFolderRefs(snapshot.folderRefs);
      setInvites(snapshot.invites);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    const controller = new AbortController();
    void reload().finally(() => {
      if (controller.signal.aborted) {
        /* ignore */
      }
    });
    return () => controller.abort();
  }, [reload]);

  const inviteActions = useAwcProjectInviteActions({
    projectId,
    reload,
    setMessage,
    setCreatedInviteUrl,
  });

  const approve = async (requestId: string, projectDisplayName?: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/approve`,
      projectDisplayName ? { projectDisplayName } : {},
    );
    setMessage(result.ok ? "Approved." : (result.errorMessage ?? "Failed."));
    await reload();
    return result;
  };

  const deny = async (requestId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/deny`,
    );
    setMessage(result.ok ? "Denied." : (result.errorMessage ?? "Failed."));
    await reload();
  };

  const revoke = async (membershipId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/members/${membershipId}/revoke`,
    );
    setMessage(result.ok ? "Revoked." : (result.errorMessage ?? "Failed."));
    await reload();
  };

  return {
    members,
    pending,
    folderRefs,
    invites,
    message,
    createdInviteUrl,
    setCreatedInviteUrl,
    isLoading,
    reload,
    approve,
    deny,
    revoke,
    ...inviteActions,
    setFolderRefs,
    setMessage,
  };
};
