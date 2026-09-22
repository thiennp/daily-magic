import type { AgentLiveRunOutcomeKind } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

const OUTCOME_CHIP_CLASS: Record<AgentLiveRunOutcomeKind, string> = {
  passed:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100",
  degraded:
    "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100",
  failed: "bg-rose-100 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100",
  waiting_you:
    "bg-brand-100 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100",
  running:
    "bg-brand-100 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100",
};

interface AgentLiveRunOutcomeChipProps {
  readonly kind: AgentLiveRunOutcomeKind;
  readonly label: string;
}

export default function AgentLiveRunOutcomeChip({
  kind,
  label,
}: AgentLiveRunOutcomeChipProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${OUTCOME_CHIP_CLASS[kind]}`}
      role="status"
      data-run-outcome={kind}
    >
      {label}
    </span>
  );
}
