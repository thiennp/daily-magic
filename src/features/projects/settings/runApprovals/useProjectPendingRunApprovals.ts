"use client";

import { useCallback, useEffect, useState } from "react";

import { requestProjectRunApprovals } from "@/features/projects/settings/runApprovals/requestProjectRunApprovals";
import { requestRespondProjectRunApproval } from "@/features/projects/settings/runApprovals/requestRespondProjectRunApproval";
import { usePendingRunApprovalsLivePoll } from "@/features/projects/settings/runApprovals/usePendingRunApprovalsLivePoll";
import type {
  RunApprovalListItem,
  RunApprovalsLoadState,
} from "@/features/projects/settings/runApprovals/runApprovalListItem.type";

/** Owner reopen list: load, poll, focus-refetch, approve/deny. */
export const useProjectPendingRunApprovals = (
  projectId: string,
): {
  readonly loadState: RunApprovalsLoadState;
  readonly approvals: readonly RunApprovalListItem[];
  readonly busyRunId: string | null;
  readonly actionError: string | null;
  readonly actionErrorRunId: string | null;
  readonly reload: () => void;
  readonly respond: (
    runId: string,
    decision: "approve" | "deny",
  ) => Promise<void>;
} => {
  const [loadState, setLoadState] =
    useState<RunApprovalsLoadState>("loading");
  const [approvals, setApprovals] = useState<readonly RunApprovalListItem[]>(
    [],
  );
  const [busyRunId, setBusyRunId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionErrorRunId, setActionErrorRunId] = useState<string | null>(
    null,
  );
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    void requestProjectRunApprovals({
      projectId,
      signal: controller.signal,
    }).then((result) => {
      if (controller.signal.aborted) return;
      if (!result.ok) {
        setLoadState("error");
        return;
      }
      setApprovals(result.approvals);
      setLoadState("ready");
    });
    return () => controller.abort();
  }, [projectId, loadKey]);

  const refreshSilent = useCallback(() => {
    void requestProjectRunApprovals({ projectId }).then((result) => {
      if (!result.ok) return;
      setApprovals(result.approvals);
      setLoadState("ready");
    });
  }, [projectId]);

  usePendingRunApprovalsLivePoll({ enabled: true, onTick: refreshSilent });

  const reload = useCallback(() => {
    setLoadState("loading");
    setLoadKey((key) => key + 1);
  }, []);

  const respond = useCallback(
    async (runId: string, decision: "approve" | "deny"): Promise<void> => {
      setBusyRunId(runId);
      setActionError(null);
      setActionErrorRunId(null);
      const result = await requestRespondProjectRunApproval({
        projectId,
        runId,
        decision,
      });
      setBusyRunId(null);
      if (!result.ok) {
        setActionError(result.code);
        setActionErrorRunId(runId);
        refreshSilent();
        return;
      }
      refreshSilent();
    },
    [projectId, refreshSilent],
  );

  return {
    loadState,
    approvals,
    busyRunId,
    actionError,
    actionErrorRunId,
    reload,
    respond,
  };
};
