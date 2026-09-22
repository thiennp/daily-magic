import type { AgentLiveRunOutcomeKind } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import { resolveAgentLiveRunOutcomeChipClassName } from "@/features/agent/utils/agentLiveRunOutcomeChip.constant";

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
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${resolveAgentLiveRunOutcomeChipClassName(kind)}`}
      role="status"
      data-run-outcome={kind}
    >
      {label}
    </span>
  );
}
