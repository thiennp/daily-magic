"use client";

import AgentLiveProgressFeedStopControl from "@/features/agent/AgentLiveProgressFeedStopControl";
import AgentLiveRunOutcomeChip from "@/features/agent/AgentLiveRunOutcomeChip";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import { shouldShowAgentLiveRetry } from "@/features/agent/utils/shouldShowAgentLiveRetry";

interface AgentLiveProgressFeedStatusHeaderProps {
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
