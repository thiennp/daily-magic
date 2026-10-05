import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunDetailMetaProps {
  readonly run: Pick<
    EnrichedAgentRunRecord,
    "requesterEmail" | "executorEmail" | "dispatchPolicy" | "approvalExpiresAt"
  >;
}

export default function AgentRunDetailMeta({ run }: AgentRunDetailMetaProps) {
  return (
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
          <dt className="text-gray-500 dark:text-gray-400">Approval expires</dt>
          <dd className="text-gray-800 dark:text-white/90">
            {new Date(run.approvalExpiresAt).toLocaleString()}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
