import type { AgentLiveProgressStepState } from "@/features/agent/utils/resolveAgentLiveProgressStepStates";

export interface AgentLiveProgressStep {
  readonly id: string;
  readonly label: string;
  readonly detail: string | null;
  readonly state: AgentLiveProgressStepState;
}
