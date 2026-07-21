export type AgentLiveWaveItemKind = "wave" | "agent";

export type AgentLiveWaveItemStatus = "pending" | "working" | "done";

export interface AgentLiveWavePlanItem {
  readonly kind: AgentLiveWaveItemKind;
  readonly id: string;
  readonly title: string;
  readonly estimateSeconds: number;
  /** Wave id for agents; null for wave rows. */
  readonly parentWaveId: string | null;
}

export interface AgentLiveWavePlanViewItem extends AgentLiveWavePlanItem {
  readonly status: AgentLiveWaveItemStatus;
}
