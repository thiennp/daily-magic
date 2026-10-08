"use client";

import AgentLiveProgressBudgetNotices from "@/features/agent/AgentLiveProgressBudgetNotices";
import AgentLiveProgressActivityBar from "@/features/agent/AgentLiveProgressActivityBar";
import AgentLiveProgressFeedStatusHeader from "@/features/agent/AgentLiveProgressFeedStatusHeader";
import AgentLiveProgressEstimateBar from "@/features/agent/AgentLiveProgressEstimateBar";
import AgentLiveProgressStuckBanner from "@/features/agent/AgentLiveProgressStuckBanner";
import { useIsAgentLiveSessionThisMac } from "@/features/agent/hooks/useIsAgentLiveSessionThisMac";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { formatAgentLiveProgressLastMacUpdate } from "@/features/agent/utils/formatAgentLiveProgressLastMacUpdate";
import { resolveAgentLiveProgressConnectionHint } from "@/features/agent/utils/resolveAgentLiveProgressConnectionHint";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { resolveAgentLiveRunBudgetNotices } from "@/features/agent/utils/resolveAgentLiveRunBudgetNotices";
import type { AgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";
import type { AgentLiveRunOutcome } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

interface AgentLiveProgressFeedStatusProps {
  readonly outcome?: AgentLiveRunOutcome | null;
  readonly isWorking: boolean;
  readonly isStopping?: boolean;
  readonly workingEllipsis: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly msSinceLastActivity: number | null;
  readonly stallState: AgentLiveProgressStallState;
  readonly estimateProgress: AgentLiveWorkingEstimateProgress | null;
  readonly activeRunId?: string | null;
  readonly sessionDeviceId?: string | null;
  readonly onStopRun?: () => void;
  readonly onDeleteRun?: () => void;
  readonly onRetryRun?: () => void;
}

export default function AgentLiveProgressFeedStatus({
  outcome = null,
  isWorking,
  isStopping = false,
  workingEllipsis,
  connectionStatus,
  msSinceLastActivity,
  stallState,
  estimateProgress,
  activeRunId = null,
  sessionDeviceId = null,
  onStopRun,
  onDeleteRun,
  onRetryRun,
}: AgentLiveProgressFeedStatusProps) {
  const isThisMac = useIsAgentLiveSessionThisMac(sessionDeviceId);
  const connectionHint = resolveAgentLiveProgressConnectionHint({
    connectionStatus,
    lastMacUpdateLabel:
      formatAgentLiveProgressLastMacUpdate(msSinceLastActivity),
  });
  const connectionHintTone =
    connectionStatus === "connected"
      ? "text-awc-fg-muted dark:text-gray-300"
      : "text-amber-800 dark:text-amber-200";
  const showEstimateProgress =
    isWorking && estimateProgress !== null && stallState !== "stuck";
  const budgetNotices = resolveAgentLiveRunBudgetNotices({
    isWorking,
    estimateProgress,
  });

  return (
    <>
      <AgentLiveProgressFeedStatusHeader
        outcome={outcome}
        isWorking={isWorking}
        activeRunId={activeRunId}
        isStopping={isStopping}
        workingEllipsis={workingEllipsis}
        connectionStatus={connectionStatus}
        onStopRun={onStopRun}
        onDeleteRun={onDeleteRun}
        onRetryRun={onRetryRun}
      />
      {isWorking || isStopping ? (
        <p className={`mt-2 text-xs ${connectionHintTone}`} role="status">
          {connectionHint}
        </p>
      ) : null}
      {isWorking &&
      !isStopping &&
      estimateProgress === null &&
      stallState !== "stuck" ? (
        <AgentLiveProgressActivityBar />
      ) : null}
      {showEstimateProgress && estimateProgress !== null ? (
        <AgentLiveProgressEstimateBar
          estimateSeconds={estimateProgress.estimateSeconds}
          percent={estimateProgress.percent}
          showEstimateOkMeta={!estimateProgress.isPastSoftEstimate}
        />
      ) : null}
      <AgentLiveProgressBudgetNotices notices={budgetNotices} />
      {stallState === "stuck" ? (
        <AgentLiveProgressStuckBanner isThisMac={isThisMac} />
      ) : stallState === "warning" && !showEstimateProgress ? (
        <p
          className="mt-3 text-sm text-awc-fg-muted dark:text-gray-300"
          role="status"
        >
          Still waiting for your computer agent — this is taking longer than
          usual…
        </p>
      ) : null}
    </>
  );
}
