"use client";

import { useAgentLiveProgressStallState } from "@/features/agent/hooks/useAgentLiveProgressStallState";
import { useAgentRunHeartbeatStallReset } from "@/features/agent/hooks/useAgentRunHeartbeatStallReset";
import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";
import { parseAgentLiveWorkingEstimateSeconds } from "@/features/agent/utils/parseAgentLiveWorkingEstimateSeconds";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

export function useAgentLiveTerminalPanelProgress(input: {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId?: string | null;
  readonly pendingCommandLine: string | null;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
}) {
  const isWorking = isAgentLiveTerminalWorking(input.status);
  const dashboard = useAgentWitchDashboard();
  const connectionStatus = dashboard?.connectionStatus ?? "disconnected";
  const estimateSeconds = parseAgentLiveWorkingEstimateSeconds(
    [input.output, input.feedbackPendingPartialOutput ?? ""].join("\n"),
  );
  const { stallState, msSinceLastActivity, workedMs, noteRunHeartbeat } =
    useAgentLiveProgressStallState({
      isWorking,
      estimateSeconds,
      activityFingerprint: [
        input.output,
        input.feedbackPendingPartialOutput ?? "",
        input.status,
        input.pendingCommandLine ?? "",
      ].join("\u0000"),
    });

  useAgentRunHeartbeatStallReset({
    activeRunId: input.activeRunId ?? null,
    isWorking,
    noteRunHeartbeat,
  });

  const progress = buildAgentLiveProgressSteps({
    status: input.status,
    output: input.output,
    pendingCommandLine: input.pendingCommandLine,
    pendingQuestion: input.feedbackPendingQuestion,
    partialOutput: input.feedbackPendingPartialOutput ?? null,
    stallState,
  });
  const estimateProgress =
    estimateSeconds !== null && workedMs !== null
      ? resolveAgentLiveWorkingEstimateProgress({
          estimateSeconds,
          workedMs,
        })
      : null;

  return {
    isWorking,
    connectionStatus,
    stallState,
    msSinceLastActivity,
    estimateProgress,
    progress,
  };
}
