import type {
  AgentLiveWaveItemStatus,
  AgentLiveWavePlanItem,
  AgentLiveWavePlanViewItem,
} from "@/features/agent/utils/agentLiveWavePlan.type";
import { parseAgentLiveWavePlan } from "@/features/agent/utils/parseAgentLiveWavePlan";
import { parseAgentLiveWaveStatuses } from "@/features/agent/utils/parseAgentLiveWaveStatuses";

const resolveItemStatus = (
  item: AgentLiveWavePlanItem,
  statuses: ReadonlyMap<string, AgentLiveWaveItemStatus>,
  agents: readonly AgentLiveWavePlanItem[],
): AgentLiveWaveItemStatus => {
  const direct = statuses.get(item.id);
  if (direct !== undefined) {
    return direct;
  }

  if (item.kind === "agent") {
    return "pending";
  }

  const childAgents = agents.filter(
    (entry) => entry.kind === "agent" && entry.parentWaveId === item.id,
  );
  if (childAgents.length === 0) {
    return "pending";
  }

  const childStatuses = childAgents.map((child) =>
    resolveItemStatus(child, statuses, agents),
  );
  if (childStatuses.every((status) => status === "done")) {
    return "done";
  }
  if (
    childStatuses.some((status) => status === "working" || status === "done")
  ) {
    return "working";
  }
  return "pending";
};

export const resolveAgentLiveWavePlanView = (
  output: string,
): readonly AgentLiveWavePlanViewItem[] => {
  const plan = parseAgentLiveWavePlan(output);
  if (plan.length === 0) {
    return [];
  }

  const statuses = parseAgentLiveWaveStatuses(output);
  return plan.map((item) => ({
    ...item,
    status: resolveItemStatus(item, statuses, plan),
  }));
};
