"use client";

import { useMemo } from "react";

import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveComposerApprovalWaitingLabel } from "@/lib/copy/resolveSoloTeamSurfaceCopy";

export const useComposerApprovalWaitingLabel = (input: {
  readonly activeRunId?: string | null;
  readonly isWaitingApproval: boolean;
}): string | null => {
  const { teamNavEnabled } = useShellNavContext();
  const { groups } = useDispatchTargets();

  return useMemo(() => {
    if (!input.isWaitingApproval) {
      return null;
    }

    const run =
      teamNavEnabled && input.activeRunId
        ? getAgentRunLocalCache(input.activeRunId)
        : null;
    const member =
      run !== null &&
      (run.status === AgentRunStatus.PENDING_APPROVAL ||
        run.executorUserId.length > 0)
        ? groups
            .flatMap((group) => group.members)
            .find((entry) => entry.userId === run.executorUserId)
        : undefined;
    const approverName = member?.name ?? member?.email ?? null;

    return resolveComposerApprovalWaitingLabel({
      teamNavEnabled,
      approverName,
    });
  }, [groups, input.activeRunId, input.isWaitingApproval, teamNavEnabled]);
};
