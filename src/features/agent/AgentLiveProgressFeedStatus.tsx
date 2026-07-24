"use client";

import AgentLiveProgressActivityBar from "@/features/agent/AgentLiveProgressActivityBar";
import AgentLiveProgressFeedStopControl from "@/features/agent/AgentLiveProgressFeedStopControl";
import AgentLiveProgressEstimateBar from "@/features/agent/AgentLiveProgressEstimateBar";
import AgentLiveProgressStuckBanner from "@/features/agent/AgentLiveProgressStuckBanner";
import { useIsAgentLiveSessionThisMac } from "@/features/agent/hooks/useIsAgentLiveSessionThisMac";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { formatAgentLiveProgressLastMacUpdate } from "@/features/agent/utils/formatAgentLiveProgressLastMacUpdate";
import { resolveAgentLiveProgressConnectionHint } from "@/features/agent/utils/resolveAgentLiveProgressConnectionHint";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import type { AgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

interface AgentLiveProgressFeedStatusProps {
  readonly isWorking: boolean;
  readonly isStopping?: boolean;
  readonly workingEllipsis: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly msSinceLastActivity: number | null;
  readonly stallState: AgentLiveProgressStallState;
  readonly estimateProgress: AgentLiveWorkingEstimateProgress | null;
  readonly sessionDeviceId?: string | null;
  readonly onStopRun?: () => void;
  readonly onDeleteRun?: () => void;
}

export default function AgentLiveProgressFeedStatus({
  isWorking,
  isStopping = false,
  workingEllipsis,
  connectionStatus,
  msSinceLastActivity,
  stallState,
  estimateProgress,
  sessionDeviceId = null,
  onStopRun,
  onDeleteRun,
}: AgentLiveProgressFeedStatusProps) {
  const isThisMac = useIsAgentLiveSessionThisMac(sessionDeviceId);
  const connectionHint = resolveAgentLiveProgressConnectionHint({
    connectionStatus,
    lastMacUpdateLabel:
      formatAgentLiveProgressLastMacUpdate(msSinceLastActivity),
  });
  const connectionHintTone =
    connectionStatus === "connected"
      ? "text-gray-600 dark:text-gray-300"
      : "text-amber-800 dark:text-amber-200";
  const showEstimateProgress =
    isWorking && estimateProgress !== null && stallState !== "stuck";

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white/90">
          Progress on your Mac
        </h3>
        <AgentLiveProgressFeedStopControl
          isWorking={isWorking}
          isStopping={isStopping}
          workingEllipsis={workingEllipsis}
          connectionStatus={connectionStatus}
          onStopRun={onStopRun}
          onDeleteRun={onDeleteRun}
        />
      </div>
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
        />
      ) : null}
      {stallState === "stuck" ? (
        <AgentLiveProgressStuckBanner isThisMac={isThisMac} />
      ) : null}
      {stallState === "warning" && !showEstimateProgress ? (
        <p
          className="mt-3 text-sm text-gray-600 dark:text-gray-300"
          role="status"
        >
          Still waiting for your Mac agent — this is taking longer than usual…
        </p>
      ) : null}
    </>
  );
}
