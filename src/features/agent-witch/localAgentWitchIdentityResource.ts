export type {
  LocalAgentWitchIdentityLoadStatus,
  LocalAgentWitchIdentitySnapshot,
} from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";

export {
  ensureLocalAgentWitchIdentityLoaded,
  getLocalAgentWitchIdentitySnapshot,
  subscribeLocalAgentWitchIdentity,
} from "@/features/agent-witch/localAgentWitchIdentityStore";

import {
  ensureLocalAgentWitchIdentityLoaded,
  resetLocalAgentWitchIdentityForRefresh,
} from "@/features/agent-witch/localAgentWitchIdentityStore";
import type { LocalAgentWitchIdentitySnapshot } from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";

export const refreshLocalAgentWitchIdentity = async (
  extraWakePorts: readonly (number | null | undefined)[] = [],
): Promise<LocalAgentWitchIdentitySnapshot> => {
  resetLocalAgentWitchIdentityForRefresh();
  return ensureLocalAgentWitchIdentityLoaded(extraWakePorts);
};
