import AppPanel from "@/components/surfaces/AppPanel";
import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import AgentRunContinueButton from "@/features/reports/AgentRunContinueButton";
import AgentRunLiveTerminal from "@/features/reports/AgentRunLiveTerminal";
import AgentRunOutcomeBanner from "@/features/reports/AgentRunOutcomeBanner";
import AgentRunResultOutput from "@/features/reports/AgentRunResultOutput";
import AgentRunEstimateComparison from "@/features/reports/AgentRunEstimateComparison";
import AgentRunKeepInProjectButton from "@/features/reports/AgentRunKeepInProjectButton";
import AgentRunReportProgress from "@/features/reports/AgentRunReportProgress";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { resolveAgentRunDetailOutcomeMessage } from "@/features/reports/utils/resolveAgentRunDetailOutcomeMessage";
import { resolveAgentRunDetailResultOutputForHonesty } from "@/features/reports/utils/resolveAgentRunDetailResultOutputForHonesty";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveAgentRunHistoryOutcomeBadge } from "@/features/reports/utils/resolveAgentRunHistoryOutcomeBadge";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import AwcPreflightFailureCard from "@/features/preflight/AwcPreflightFailureCard";
import AgentRunDetailMeta from "@/features/reports/AgentRunDetailMeta";
import { resolveAgentRunPreflightView } from "@/features/reports/resolveAgentRunPreflightView";

interface AgentRunDetailContentProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunDetailContent({
  run,
}: AgentRunDetailContentProps) {
  const outcomeBadge = resolveAgentRunHistoryOutcomeBadge(run);
  const supplementalResultOutput = resolveAgentRunDetailResultOutputForHonesty(
    run.id,
    run.resultOutput,
  );
  const outcomeMessage = resolveAgentRunDetailOutcomeMessage({
    status: run.status,
    resultOutput: run.resultOutput,
    denialReason: run.denialReason,
    reportSummary: run.reportSummary,
    resultOutcomeCode: run.resultOutcomeCode,
    supplementalResultOutput:
      supplementalResultOutput.length > 0 ? supplementalResultOutput : null,
  });

  const preflightView = resolveAgentRunPreflightView({
    resultOutput: run.resultOutput,
    denialReason: run.denialReason,
  });

  return (
    <AppPanel as="div">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AgentRunStatusBadge
          status={run.status}
          labelOverride={outcomeBadge.label}
          classNameOverride={outcomeBadge.className}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Created {new Date(run.createdAt).toLocaleString()}
        </p>
      </div>
      <AgentRunDetailMeta run={run} />
      <AgentRunEstimateComparison
        estimateSeconds={run.estimateSeconds}
        actualSeconds={run.actualSeconds}
      />
      <h2 className="mt-6 text-sm font-medium text-gray-800 dark:text-white/90">
        Prompt
      </h2>
      <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {run.prompt}
      </pre>
      <AgentRunReportProgress
        reportSummary={run.reportSummary}
        reportStatus={run.reportStatus}
      />
      {run.status === AgentRunStatus.RUNNING ? (
        <AgentRunLiveTerminal key={run.id} runId={run.id} />
      ) : null}
      <AgentRunOutcomeBanner run={run} />
      {preflightView !== null ? (
        <AwcPreflightFailureCard view={preflightView} showFixOnMacHint />
      ) : null}
      {run.resultOutput ? (
        <AgentRunResultOutput run={run} resultOutput={run.resultOutput} />
      ) : null}
      <AgentRunKeepInProjectButton runId={run.id} projectId={run.projectId} />
      {outcomeMessage !== null ? (
        <p className="mt-4 text-sm text-gray-800 dark:text-white/90">
          {outcomeMessage}
        </p>
      ) : null}
      {run.status === AgentRunStatus.COMPLETED ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <AgentRunContinueButton run={run} />
          <AgentRunAgainButton prompt={run.prompt} />
        </div>
      ) : null}
    </AppPanel>
  );
}
