import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

interface AgentRunStatusBadgeProps {
  readonly status: EnrichedAgentRunRecord["status"];
}

const STATUS_CLASS_MAP: Record<EnrichedAgentRunRecord["status"], string> = {
  [AgentRunStatus.PENDING_APPROVAL]:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200",
  [AgentRunStatus.RUNNING]:
    "bg-brand-100 text-brand-800 dark:bg-brand-950/40 dark:text-brand-200",
  [AgentRunStatus.COMPLETED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200",
  [AgentRunStatus.FAILED]:
    "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
  [AgentRunStatus.DENIED]:
    "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  [AgentRunStatus.EXPIRED]:
    "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200",
};

const formatRunStatus = (status: string): string => status.replaceAll("_", " ");

export default function AgentRunStatusBadge({
  status,
}: AgentRunStatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_CLASS_MAP[status]}`}
    >
      {formatRunStatus(status)}
    </span>
  );
}

export { formatRunStatus };
