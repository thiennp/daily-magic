import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";

export type LocalAgentWitchIdentityLoadStatus = "idle" | "loading" | "ready";

export interface LocalAgentWitchIdentitySnapshot {
  readonly identity: LocalAgentWitchIdentity | null;
  readonly wakeReachable: boolean;
  readonly status: LocalAgentWitchIdentityLoadStatus;
}
