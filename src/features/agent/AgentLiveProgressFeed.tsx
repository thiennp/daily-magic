"use client";

import AgentLiveProgressFeedSummary from "@/features/agent/AgentLiveProgressFeedSummary";
import AgentLiveProgressFeedStatus from "@/features/agent/AgentLiveProgressFeedStatus";
import AgentLiveProgressStepRow from "@/features/agent/AgentLiveProgressStepRow";
import AgentLiveProgressWavesPanel from "@/features/agent/AgentLiveProgressWavesPanel";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { useAgentLiveTerminalLoadingDots } from "@/features/agent/hooks/public-api/client";
import type { WsTestConnectionStatus } from "@/features/agent/types/public-api/types";
import type {
  AgentLiveProgressStep,
  AgentLiveRunOutcome,
} from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { buildAgentLiveTerminalLoadingLine } from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import type { AgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";
import type { AgentLiveWavePlanViewItem } from "@/features/agent/utils/agentLiveWavePlan.type";

interface AgentLiveProgressFeedProps {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly humanSummary: string | null;
  /** Plain reason lines shown under a Failed outcome (73181622). */
  readonly failureDetails?: string | null;
  readonly outcome: AgentLiveRunOutcome;
  readonly isWorking: boolean;
  readonly isStopping?: boolean;
  readonly stallState?: AgentLiveProgressStallState;
  readonly connectionStatus?: WsTestConnectionStatus;
  readonly msSinceLastActivity?: number | null;
  readonly estimateProgress?: AgentLiveWorkingEstimateProgress | null;
  readonly wavePlanItems?: readonly AgentLiveWavePlanViewItem[];
  readonly activeRunId?: string | null;
  readonly sessionDeviceId?: string | null;
  readonly nextActions?: readonly string[];
  readonly nextActionsDisabled?: boolean;
  readonly onSelectNextAction?: (action: string) => void;
  readonly onStopRun?: () => void;
  readonly onDeleteRun?: () => void;
  readonly onRetryRun?: () => void;
}

export default function AgentLiveProgressFeed({
  steps,
  humanSummary,
  failureDetails = null,
  outcome,
  isWorking,
  isStopping = false,
  stallState = "none",
  connectionStatus = "idle",
  msSinceLastActivity = null,
  estimateProgress = null,
  wavePlanItems = [],
  activeRunId = null,
  sessionDeviceId = null,
  nextActions = [],
  nextActionsDisabled = false,
  onSelectNextAction,
  onStopRun,
  onDeleteRun,
  onRetryRun,
}: AgentLiveProgressFeedProps) {
  const loadingDotCount = useAgentLiveTerminalLoadingDots(isWorking);
  const workingEllipsis = buildAgentLiveTerminalLoadingLine(loadingDotCount);

  return (
    <div
      className="mt-3 rounded-xl border border-awc-border bg-white p-4 dark:border-gray-800 dark:bg-white/[0.02]"
      aria-busy={isWorking || isStopping}
    >
      <AgentLiveProgressFeedStatus
        outcome={outcome}
        isWorking={isWorking}
        isStopping={isStopping}
        workingEllipsis={workingEllipsis}
        connectionStatus={connectionStatus}
        msSinceLastActivity={msSinceLastActivity}
        stallState={stallState}
        estimateProgress={estimateProgress}
        activeRunId={activeRunId}
        sessionDeviceId={sessionDeviceId}
        onStopRun={onStopRun}
        onDeleteRun={onDeleteRun}
        onRetryRun={onRetryRun}
      />
      <AgentLiveProgressFeedSummary
        humanSummary={humanSummary}
        failureDetails={failureDetails}
        outcome={outcome}
        finishedRunId={isWorking ? null : activeRunId}
      />
      <AgentLiveProgressWavesPanel items={wavePlanItems} />
      <ol className="mt-4 space-y-3">
        {steps.map((step) => (
          <AgentLiveProgressStepRow
            key={step.id}
            step={step}
            isWorking={isWorking}
            workingEllipsis={workingEllipsis}
          />
        ))}
      </ol>
      {nextActions.length > 0 && onSelectNextAction !== undefined ? (
        <AgentLiveTerminalNextActions
          actions={nextActions}
          disabled={nextActionsDisabled}
          onSelect={onSelectNextAction}
        />
      ) : null}
    </div>
  );
}
