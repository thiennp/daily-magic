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
  const [isLoading, setIsLoading] = useState(true);

  const applySnapshot = useCallback(
    (snapshot: Awaited<ReturnType<typeof loadAwcProjectAccess>>) => {
      setMembers(snapshot.members);
      setPending(snapshot.pending);
      setFolderRefs(snapshot.folderRefs);
      setInvites(snapshot.invites);
      setProjectName(snapshot.projectName);
      if (snapshot.ok) {
        setLoadError(null);
      } else {
        setLoadError(snapshot.errorMessage);
      }
    },
    [],
  );

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const snapshot = await loadAwcProjectAccess(projectId);
      applySnapshot(snapshot);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, applySnapshot]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const snapshot = await loadAwcProjectAccess(projectId);
        if (!controller.signal.aborted) {
          applySnapshot(snapshot);
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
  }, [projectId, applySnapshot]);

  const setFriendlyMessage = useCallback((value: string | null) => {
    if (value === null) {
      setMessage(null);
      return;
    }
    setMessage(mapProjectAccessError(value, value));
  }, []);

  const inviteActions = useAwcProjectInviteActions({
    projectId,
    reload,
    setMessage: setFriendlyMessage,
    setCreatedInviteUrl,
  });

  const approve = async (requestId: string, projectDisplayName?: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/approve`,
      projectDisplayName ? { projectDisplayName } : {},
    );
    setFriendlyMessage(
      result.ok
        ? "Approved."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await reload();
    return {
      ...result,
      errorMessage: result.ok
        ? result.errorMessage
        : mapProjectAccessError(result.errorMessage, "Failed."),
    };
  };

  const deny = async (requestId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/deny`,
    );
    setFriendlyMessage(
      result.ok
        ? "Denied."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await reload();
  };

  const revoke = async (membershipId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/members/${membershipId}/revoke`,
    );
    setFriendlyMessage(
      result.ok
        ? "Revoked."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    await reload();
  };

  return {
    members,
    pending,
    folderRefs,
    invites,
    projectName,
    message,
    loadError,
    createdInviteUrl,
    setCreatedInviteUrl,
    isLoading,
    reload,
    approve,
    deny,
    revoke,
    ...inviteActions,
    setFolderRefs,
    setMessage: setFriendlyMessage,
  };
};
