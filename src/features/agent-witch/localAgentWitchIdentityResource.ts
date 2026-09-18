import type { LocalAgentWitchIdentitySnapshot } from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";
import {
  ensureLocalAgentWitchIdentityLoaded,
  getLocalAgentWitchIdentitySnapshot,
  resetLocalAgentWitchIdentityForRefresh,
  subscribeLocalAgentWitchIdentity,
} from "@/features/agent-witch/localAgentWitchIdentityStore";

export type {
  LocalAgentWitchIdentityLoadStatus,
  LocalAgentWitchIdentitySnapshot,
} from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";

export {
  ensureLocalAgentWitchIdentityLoaded,
  getLocalAgentWitchIdentitySnapshot,
  subscribeLocalAgentWitchIdentity,
};

export const refreshLocalAgentWitchIdentity = async (
  extraWakePorts: readonly (number | null | undefined)[] = [],
): Promise<LocalAgentWitchIdentitySnapshot> => {
  resetLocalAgentWitchIdentityForRefresh();
  return ensureLocalAgentWitchIdentityLoaded(extraWakePorts);
};

export const retryUnreachableLocalAgentWitchIdentity = (
  extraWakePorts: readonly (number | null | undefined)[] = [],
): Promise<LocalAgentWitchIdentitySnapshot> => {
  const snapshot = getLocalAgentWitchIdentitySnapshot();
  if (snapshot.wakeReachable && snapshot.identity !== null) {
    return Promise.resolve(snapshot);
  }

  resetLocalAgentWitchIdentityForRefresh();
  return ensureLocalAgentWitchIdentityLoaded(extraWakePorts);
};
