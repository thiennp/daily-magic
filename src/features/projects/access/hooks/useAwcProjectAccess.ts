"use client";

import { useCallback, useEffect, useState } from "react";

import {
  loadAwcProjectAccess,
  type AwcProjectAccessFolderRef,
  type AwcProjectAccessMember,
  type AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { postProjectAccessAction } from "@/features/projects/access/utils/projectAccessApi";

export const useAwcProjectAccess = (projectId: string) => {
  const [members, setMembers] = useState<readonly AwcProjectAccessMember[]>([]);
  const [pending, setPending] = useState<readonly AwcProjectAccessPending[]>(
    [],
  );
  const [folderRefs, setFolderRefs] = useState<
    readonly AwcProjectAccessFolderRef[]
  >([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const snapshot = await loadAwcProjectAccess(projectId);
      setMembers(snapshot.members);
      setPending(snapshot.pending);
      setFolderRefs(snapshot.folderRefs);
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

  const approve = async (requestId: string) => {
    const result = await postProjectAccessAction(
      `/api/projects/${projectId}/access/requests/${requestId}/approve`,
    );
    setMessage(result.ok ? "Approved." : (result.errorMessage ?? "Failed."));
    await reload();
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
    message,
    isLoading,
    reload,
    approve,
    deny,
    revoke,
    setFolderRefs,
    setMessage,
  };
};
