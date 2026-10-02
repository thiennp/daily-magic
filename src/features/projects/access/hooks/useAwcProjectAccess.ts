"use client";

import { useCallback, useEffect, useState } from "react";

import {
  loadAwcProjectAccess,
  type AwcProjectAccessFolderRef,
  type AwcProjectAccessInvite,
  type AwcProjectAccessMember,
  type AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  createProjectInviteApi,
  postProjectAccessAction,
  renameMembershipDisplayNameApi,
  revokeProjectInviteApi,
} from "@/features/projects/access/utils/projectAccessApi";

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
    const load = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const snapshot = await loadAwcProjectAccess(projectId);
        if (!controller.signal.aborted) {
          setMembers(snapshot.members);
          setPending(snapshot.pending);
          setFolderRefs(snapshot.folderRefs);
          setInvites(snapshot.invites);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId]);

  const approve = async (
    requestId: string,
    projectDisplayName?: string,
  ) => {
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

  const createInvite = async () => {
    const result = await createProjectInviteApi(projectId, {});
    if (result.url) {
      setCreatedInviteUrl(result.url);
      setMessage("Invite created — copy the URL now.");
    } else {
      setMessage(result.errorMessage ?? "Failed to create invite.");
    }
    await reload();
  };

  const revokeInvite = async (inviteId: string) => {
    const result = await revokeProjectInviteApi(projectId, inviteId);
    setMessage(result.ok ? "Invite revoked." : (result.errorMessage ?? "Failed."));
    await reload();
  };

  const renameMember = async (
    membershipId: string,
    projectDisplayName: string,
  ) => {
    const result = await renameMembershipDisplayNameApi(
      projectId,
      membershipId,
      projectDisplayName,
    );
    setMessage(result.ok ? "Renamed." : (result.errorMessage ?? "Failed."));
    await reload();
    return result;
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
    createInvite,
    revokeInvite,
    renameMember,
    setFolderRefs,
    setMessage,
  };
};
