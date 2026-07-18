import AppPanel from "@/components/surfaces/AppPanel";
import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import AgentRunContinueButton from "@/features/reports/AgentRunContinueButton";
import AgentRunLiveTerminal from "@/features/reports/AgentRunLiveTerminal";
import AgentRunResultOutput from "@/features/reports/AgentRunResultOutput";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunDetailContentProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunDetailContent({
  run,
}: AgentRunDetailContentProps) {
  return (
    <AppPanel as="div">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AgentRunStatusBadge status={run.status} />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Created {new Date(run.createdAt).toLocaleString()}
        </p>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Requester</dt>
          <dd className="text-gray-800 dark:text-white/90">
            {run.requesterEmail}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Executor</dt>
          <dd className="text-gray-800 dark:text-white/90">
            {run.executorEmail}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Policy</dt>
          <dd className="capitalize text-gray-800 dark:text-white/90">
            {run.dispatchPolicy}
          </dd>
        </div>
        {run.approvalExpiresAt ? (
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              Approval expires
            </dt>
            <dd className="text-gray-800 dark:text-white/90">
              {new Date(run.approvalExpiresAt).toLocaleString()}
            </dd>
          </div>
        ) : null}
      </dl>
      <h2 className="mt-6 text-sm font-medium text-gray-800 dark:text-white/90">
        Prompt
      </h2>
      <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {run.prompt}
      </pre>
      {run.status === AgentRunStatus.RUNNING ? (
        <AgentRunLiveTerminal key={run.id} runId={run.id} />
      ) : null}
      {run.resultOutput ? (
        <AgentRunResultOutput resultOutput={run.resultOutput} />
      ) : null}
      {run.denialReason ? (
        <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">
          {run.denialReason}
        </p>
      ) : null}
      {run.status === AgentRunStatus.COMPLETED ? (
        <div className="mt-6 flex flex-wrap gap-2">
          <AgentRunContinueButton />
          <AgentRunAgainButton prompt={run.prompt} />
        </div>
      ) : null}
    </AppPanel>
  );
}
