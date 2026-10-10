"use client";

import AgentLiveProgressFeedStopControl from "@/features/agent/AgentLiveProgressFeedStopControl";
import AgentLiveRunOutcomeChip from "@/features/agent/AgentLiveRunOutcomeChip";
import type { WsTestConnectionStatus } from "@/features/agent/types/public-api/types";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import { shouldShowAgentLiveRetry } from "@/features/agent/utils/shouldShowAgentLiveRetry";
import { useAgentRunInputRequest } from "@/features/dispatch/agentRunInputStore";
import { requestAgentRunInputModalReopen } from "@/features/dispatch/utils/agentRunInputModalEvents";
import { resolveRunInputReopenRequest } from "@/features/dispatch/utils/resolveRunInputReopenRequest";
import { getAgentRunLocalCache } from "@/features/reports/public-api/presentation";

interface AgentLiveProgressFeedStatusHeaderProps {
  readonly activeRunId?: string | null;
  readonly outcome: AgentLiveRunOutcome | null;
  readonly isWorking: boolean;
  readonly isStopping: boolean;
  readonly workingEllipsis: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly onStopRun?: () => void;
  readonly onDeleteRun?: () => void;
  readonly onRetryRun?: () => void;
}

export default function AgentLiveProgressFeedStatusHeader({
  activeRunId,
  outcome,
  isWorking,
  isStopping,
  workingEllipsis,
  connectionStatus,
  onStopRun,
  onDeleteRun,
  onRetryRun,
}: AgentLiveProgressFeedStatusHeaderProps) {
  const showRetry = shouldShowAgentLiveRetry({
    outcomeKind: outcome?.kind,
    isWorking,
    isStopping,
  });
  const pendingInput = useAgentRunInputRequest(activeRunId);
  const runId = activeRunId ?? "";
  const reopenRequest =
    runId.length > 0 && (isWorking || pendingInput !== null)
      ? resolveRunInputReopenRequest({
          runId,
          stored: pendingInput,
          reportSummary: getAgentRunLocalCache(runId)?.reportSummary ?? null,
        })
      : null;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h3 className="text-sm font-medium text-awc-fg dark:text-white/90">
          Progress on your computer
        </h3>
        {outcome !== null ? (
          <AgentLiveRunOutcomeChip
            kind={outcome.kind}
            label={outcome.chipLabel}
          />
        ) : null}
        {reopenRequest !== null ? (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
            onClick={() => requestAgentRunInputModalReopen(reopenRequest)}
          >
            Open question
          </button>
        ) : null}
      </div>
      <AgentLiveProgressFeedStopControl
        isWorking={isWorking}
        isStopping={isStopping}
        workingEllipsis={workingEllipsis}
        connectionStatus={connectionStatus}
        onStopRun={onStopRun}
        onDeleteRun={onDeleteRun}
        onRetryRun={showRetry ? onRetryRun : undefined}
      />
    </div>
  );
}
