"use client";

import AgentLiveProgressFeed from "@/features/agent/AgentLiveProgressFeed";
import { useAgentLiveTerminalPanelProgress } from "@/features/agent/hooks/useAgentLiveTerminalPanelProgress";
import type { AgentLiveTerminalFeedbackPreferredMode } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

interface AgentLiveTerminalPanelSteppedFeedProps {
  readonly panelProgress: ReturnType<typeof useAgentLiveTerminalPanelProgress>;
  readonly sessionDeviceId?: string | null;
  readonly nextActions: readonly string[];
  readonly nextActionsDisabled: boolean;
  readonly onSelectNextAction: (
    message: string,
    preferredMode?: AgentLiveTerminalFeedbackPreferredMode,
  ) => void;
  readonly onStopRun: () => void;
  readonly onDeleteRun?: () => void;
}

export default function AgentLiveTerminalPanelSteppedFeed({
  panelProgress,
  sessionDeviceId,
  nextActions,
  nextActionsDisabled,
  onSelectNextAction,
  onStopRun,
  onDeleteRun,
}: AgentLiveTerminalPanelSteppedFeedProps) {
  return (
    <AgentLiveProgressFeed
      steps={panelProgress.progress.steps}
      replyPreview={panelProgress.progress.replyPreview}
      isWorking={panelProgress.isWorking}
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
