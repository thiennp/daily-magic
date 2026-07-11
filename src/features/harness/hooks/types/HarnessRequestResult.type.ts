export type AgentPairingStatus =
  "not_connected" | "ready_to_pair" | "paired" | "pairing_failed";

export default interface HarnessRequestResult {
  readonly success: boolean;
  readonly writerAgent: string;
  readonly exitCode?: number;
  readonly output?: string;
  readonly errorMessage?: string;
}
