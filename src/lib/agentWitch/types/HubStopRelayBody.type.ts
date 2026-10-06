/** S0-7 — relay row body asking the socket-owning instance to stop a run. */
export type HubStopRelayBody = {
  readonly kind: "stop";
  readonly agentRunId: string;
};
