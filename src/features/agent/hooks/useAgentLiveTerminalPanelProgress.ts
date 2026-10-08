import { useComposerApprovalWaitingLabel } from "@/features/agent/hooks/useComposerApprovalWaitingLabel";
import { useAgentLiveProgressStallState } from "@/features/agent/hooks/useAgentLiveProgressStallState";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { useAgentRunHeartbeatStallReset } from "@/features/agent/hooks/useAgentRunHeartbeatStallReset";
import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/AgentWitchDashboardContext";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import { isAgentLiveTerminalWorking } from "@/features/agent/utils/isAgentLiveTerminalWorking";
import { parseAgentLiveWorkingEstimateSeconds } from "@/features/agent/utils/parseAgentLiveWorkingEstimateSeconds";
import { resolveAgentLiveWavePlanView } from "@/features/agent/utils/resolveAgentLiveWavePlanView";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";
import { useRegisterAgentLiveProgressFeed } from "@/features/agent/hooks/useRegisterAgentLiveProgressFeed";

export function useAgentLiveTerminalPanelProgress(input: {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly activeRunId?: string | null;
  readonly pendingCommandLine: string | null;
  readonly feedbackPendingQuestion: string | null;
  readonly feedbackPendingPartialOutput?: string | null;
  readonly sessionWriterAgent?: string | null;
}) {
  const approvalWaitingLabel = useComposerApprovalWaitingLabel({
    activeRunId: input.activeRunId,
    isWaitingApproval: input.status === "waiting_approval",
  });
  const isStopping = input.status === "stopping";
  const isWorking = isAgentLiveTerminalWorking(input.status);
  const dashboard = useAgentWitchDashboard();

  useRegisterAgentLiveProgressFeed(input.activeRunId);

  const connectionStatus = dashboard?.connectionStatus ?? "disconnected";
  const progressSource = [
    input.output,
    input.feedbackPendingPartialOutput ?? "",
  ].join("\n");
  const estimateSeconds = parseAgentLiveWorkingEstimateSeconds(progressSource);
  const wavePlanItems = resolveAgentLiveWavePlanView(progressSource);
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

  const cachedRun =
    input.activeRunId !== null &&
    input.activeRunId !== undefined &&
    input.activeRunId.length > 0
      ? getAgentRunLocalCache(input.activeRunId)
      : null;
  const writerAgent =
    (isHarnessWriterAgent(input.sessionWriterAgent)
      ? input.sessionWriterAgent
      : null) ??
    (cachedRun !== null && isHarnessWriterAgent(cachedRun.writerAgent)
      ? cachedRun.writerAgent
      : null);

  const progress = buildAgentLiveProgressSteps({
    status: input.status,
    output: input.output,
    pendingCommandLine: input.pendingCommandLine,
    pendingQuestion: input.feedbackPendingQuestion,
    partialOutput: input.feedbackPendingPartialOutput ?? null,
    stallState,
    estimateSeconds,
    approvalWaitingLabel,
    writerAgent,
  });
  const cachedReportSummary =
    input.activeRunId !== null &&
    input.activeRunId !== undefined &&
    input.activeRunId.length > 0
      ? (getAgentRunLocalCache(input.activeRunId)?.reportSummary ?? null)
      : null;
  const progressWithReport = {
    ...progress,
    humanSummary:
      progress.humanSummary ??
      (cachedReportSummary !== null &&
      cachedReportSummary.trim().length > 0 &&
      progress.outcome.kind === "passed"
        ? cachedReportSummary.trim().slice(0, 280)
        : null),
  };
  const estimateProgress =
    estimateSeconds !== null && workedMs !== null
      ? resolveAgentLiveWorkingEstimateProgress({
          estimateSeconds,
          workedMs,
        })
      : null;

  return {
    isWorking,
    isStopping,
    connectionStatus,
    stallState,
    msSinceLastActivity,
    estimateProgress,
    wavePlanItems,
    progress: progressWithReport,
    approvalWaitingLabel,
  };
}
