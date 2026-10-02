"use client";

import { useCallback, useEffect, useState } from "react";

import {
  loadAwcProjectAccess,
  type AwcProjectAccessFolderRef,
  type AwcProjectAccessMember,
  type AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import type { AwcAccessActionResult } from "@/features/projects/access/types/awcProjectAccessContract.type";
import { patchProjectAccess } from "@/features/projects/access/utils/patchProjectAccess";
import {
  buildApproveAccessPayload,
  buildRevokeAccessPayload,
} from "@/features/projects/access/utils/projectDisplayName.helpers";
import { renameProjectMembership } from "@/features/projects/access/utils/renameProjectMembership";

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

  const approve = async (input: {
    readonly requestId: string;
    readonly requesterIsAgent: boolean;
    readonly projectDisplayName?: string;
  }): Promise<AwcAccessActionResult> => {
    const built = buildApproveAccessPayload(input);
    if (!built.ok) {
      setMessage(built.errorMessage);
      return { ok: false, status: 400, errorMessage: built.errorMessage, code: "name_invalid" };
    }
    const result = await patchProjectAccess(projectId, built.body);
    setMessage(
      result.ok ? "Approved." : (result.errorMessage ?? "Failed."),
    );
    if (result.ok) {
      await reload();
    }
    return result;
  };

  const deny = async (requestId: string) => {
    const result = await patchProjectAccess(projectId, {
      requestId,
      action: "deny",
    });
    setMessage(result.ok ? "Denied." : (result.errorMessage ?? "Failed."));
    if (result.ok) {
      await reload();
    }
    return result;
  };

  const revoke = async (membershipId: string) => {
    const result = await patchProjectAccess(
      projectId,
      buildRevokeAccessPayload(membershipId).body,
    );
    setMessage(result.ok ? "Revoked." : (result.errorMessage ?? "Failed."));
    if (result.ok) {
      await reload();
    }
    return result;
  };

  const rename = async (membershipId: string, projectDisplayName: string) => {
    const result = await renameProjectMembership({
      projectId,
      membershipId,
      projectDisplayName,
    });
    setMessage(
      result.ok ? "Nickname updated." : (result.errorMessage ?? "Failed."),
    );
    if (result.ok) {
      await reload();
    }
    return result;
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
    rename,
    setFolderRefs,
    setMessage,
  };
};
