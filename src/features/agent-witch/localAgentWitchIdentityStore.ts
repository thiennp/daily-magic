import type { LocalAgentWitchIdentitySnapshot } from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";
import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import {
  clearAgentWitchWakeIdentityProbeSuppression,
  isAgentWitchWakeIdentityProbeSuppressed,
  suppressAgentWitchWakeIdentityProbe,
} from "@/features/agent-witch/utils/agentWitchWakeIdentityProbeSession";
import {
  buildAllWakePortsForPage,
  probeLocalAgentWitchWakePorts,
} from "@/features/agent-witch/utils/probeLocalAgentWitchWakePorts";
import { resolveWakeIdentityPortsToProbe } from "@/features/agent-witch/utils/resolveWakeIdentityPortsToProbe";

const state: {
  snapshot: LocalAgentWitchIdentitySnapshot;
  attemptedPorts: Set<number>;
  inflight: Promise<LocalAgentWitchIdentitySnapshot> | null;
  pendingExtraWakePorts: readonly number[] | null;
} = {
  snapshot: { identity: null, wakeReachable: false, status: "idle" },
  attemptedPorts: new Set(),
  inflight: null,
  pendingExtraWakePorts: null,
};

const listeners = new Set<() => void>();

const emit = (): void => {
  for (const listener of listeners) {
    listener();
  }
};

const finishReady = (
  identity: LocalAgentWitchIdentitySnapshot["identity"],
  wakeReachable: boolean,
): LocalAgentWitchIdentitySnapshot => {
  const snapshot: LocalAgentWitchIdentitySnapshot = {
    identity,
    wakeReachable,
    status: "ready",
  };
  state.snapshot = snapshot;
  emit();
  return snapshot;
};

const loadInternal = async (
  extraWakePorts: readonly number[],
): Promise<LocalAgentWitchIdentitySnapshot> => {
  const allPorts = buildAllWakePortsForPage(extraWakePorts);
  const portsToProbe = resolveWakeIdentityPortsToProbe({
    allPorts,
    attemptedPorts: state.attemptedPorts,
    probeSuppressed: isAgentWitchWakeIdentityProbeSuppressed(),
  });

  if (portsToProbe.length === 0) {
    if (state.snapshot.status === "idle") {
      return finishReady(null, false);
    }
    return state.snapshot;
  }

  state.snapshot = { ...state.snapshot, status: "loading" };
  emit();

  const identity = await probeLocalAgentWitchWakePorts({
    portsToProbe,
    onPortAttempted: (wakePort) => {
      state.attemptedPorts.add(wakePort);
    },
  });

  if (identity !== null) {
    clearAgentWitchWakeIdentityProbeSuppression();
    return finishReady(identity, true);
  }

  if (allPorts.every((port) => state.attemptedPorts.has(port))) {
    suppressAgentWitchWakeIdentityProbe();
  }

  return finishReady(null, false);
};

const runQueuedLoad = async (): Promise<LocalAgentWitchIdentitySnapshot> => {
  const extraWakePorts = state.pendingExtraWakePorts ?? [];
  state.pendingExtraWakePorts = null;

  const result = await loadInternal(extraWakePorts);

  if (state.pendingExtraWakePorts !== null) {
    return runQueuedLoad();
  }

  return result;
};

export const subscribeLocalAgentWitchIdentity = (
  onStoreChange: () => void,
): (() => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const getLocalAgentWitchIdentitySnapshot =
  (): LocalAgentWitchIdentitySnapshot => state.snapshot;

export const ensureLocalAgentWitchIdentityLoaded = (
  extraWakePorts: readonly (number | null | undefined)[],
): Promise<LocalAgentWitchIdentitySnapshot> => {
  state.pendingExtraWakePorts = collectUniqueWakePorts(extraWakePorts);

  if (state.inflight !== null) {
    return state.inflight;
  }

  state.inflight = runQueuedLoad().finally(() => {
    state.inflight = null;
  });

  return state.inflight;
};

export const resetLocalAgentWitchIdentityForRefresh = (): void => {
  clearAgentWitchWakeIdentityProbeSuppression();
  state.attemptedPorts.clear();
  state.pendingExtraWakePorts = null;
  state.snapshot = { identity: null, wakeReachable: false, status: "idle" };
  state.inflight = null;
};
