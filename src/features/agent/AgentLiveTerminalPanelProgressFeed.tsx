"use client";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import { useAgentLiveTerminalPanelProgress } from "@/features/agent/hooks/useAgentLiveTerminalPanelProgress";

interface AgentLiveTerminalPanelProgressFeedProps {
  readonly panelProgress: ReturnType<typeof useAgentLiveTerminalPanelProgress>;
  readonly sessionDeviceId?: string | null;
  readonly nextActions: readonly string[];
  readonly nextActionsDisabled: boolean;
  readonly onSelectNextAction: (action: string) => void;
  readonly onStopRun: () => void;
  readonly onDeleteRun?: () => void;
}

export default function AgentLiveTerminalPanelProgressFeed({
  panelProgress,
  sessionDeviceId,
  nextActions,
  nextActionsDisabled,
  onSelectNextAction,
  onStopRun,
  onDeleteRun,
}: AgentLiveTerminalPanelProgressFeedProps) {
  return (
    <AgentLiveProgressFeed
      steps={panelProgress.progress.steps}
      replyPreview={panelProgress.progress.replyPreview}
      isWorking={panelProgress.isWorking}
      isStopping={panelProgress.isStopping}
      stallState={panelProgress.stallState}
      connectionStatus={panelProgress.connectionStatus}
      msSinceLastActivity={panelProgress.msSinceLastActivity}
      estimateProgress={panelProgress.estimateProgress}
      wavePlanItems={panelProgress.wavePlanItems}
      sessionDeviceId={sessionDeviceId}
      nextActions={nextActions}
      nextActionsDisabled={nextActionsDisabled}
      onSelectNextAction={onSelectNextAction}
      onStopRun={onStopRun}
      onDeleteRun={onDeleteRun}
    />
  );
}
