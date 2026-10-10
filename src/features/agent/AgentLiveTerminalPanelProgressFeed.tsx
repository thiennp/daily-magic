"use client";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import { useAgentLiveTerminalPanelProgress } from "@/features/agent/hooks/public-api/client";
import { resolveAgentLiveFailureDetails } from "@/features/agent/utils/resolveAgentLiveFailureDetails";
import { SendReadinessApprovalWaitingChip } from "@/features/agent/send-readiness/public-api/presentation";

interface AgentLiveTerminalPanelProgressFeedProps {
  readonly panelProgress: ReturnType<typeof useAgentLiveTerminalPanelProgress>;
  readonly output?: string;
  readonly activeRunId?: string | null;
  readonly sessionDeviceId?: string | null;
  readonly nextActions: readonly string[];
  readonly nextActionsDisabled: boolean;
  readonly onSelectNextAction: (action: string) => void;
  readonly onStopRun: () => void;
  readonly onDeleteRun?: () => void;
  readonly onRetryRun?: () => void;
}

export default function AgentLiveTerminalPanelProgressFeed({
  panelProgress,
  output = "",
  sessionDeviceId,
  activeRunId,
  nextActions,
  nextActionsDisabled,
  onSelectNextAction,
  onStopRun,
  onDeleteRun,
  onRetryRun,
}: AgentLiveTerminalPanelProgressFeedProps) {
  const approvalWaitingLabel = panelProgress.approvalWaitingLabel;

  return (
    <>
      {approvalWaitingLabel !== null ? (
        <SendReadinessApprovalWaitingChip label={approvalWaitingLabel} />
      ) : null}
      <AgentLiveProgressFeed
        steps={panelProgress.progress.steps}
        humanSummary={panelProgress.progress.humanSummary}
        failureDetails={
          panelProgress.progress.outcome.kind === "failed"
            ? resolveAgentLiveFailureDetails(output)
            : null
        }
        outcome={panelProgress.progress.outcome}
        isWorking={panelProgress.isWorking}
        isStopping={panelProgress.isStopping}
        stallState={panelProgress.stallState}
        connectionStatus={panelProgress.connectionStatus}
        msSinceLastActivity={panelProgress.msSinceLastActivity}
        estimateProgress={panelProgress.estimateProgress}
        wavePlanItems={panelProgress.wavePlanItems}
        activeRunId={activeRunId}
        sessionDeviceId={sessionDeviceId}
        nextActions={nextActions}
        nextActionsDisabled={nextActionsDisabled}
        onSelectNextAction={onSelectNextAction}
        onStopRun={onStopRun}
        onDeleteRun={onDeleteRun}
        onRetryRun={onRetryRun}
      />
    </>
  );
}
