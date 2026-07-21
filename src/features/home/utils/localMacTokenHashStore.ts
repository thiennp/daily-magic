import {
  clearAgentWitchLocalTokenHashCookie,
  readAgentWitchLocalTokenHashCookie,
  setAgentWitchLocalTokenHashCookie,
} from "@/features/agent-witch/utils/agentWitchLocalTokenHashCookie";

const storeState: { tokenHash: string | null } = {
  tokenHash:
    typeof document === "undefined"
      ? null
      : readAgentWitchLocalTokenHashCookie(),
};

const listeners = new Set<() => void>();

const notifyListeners = (): void => {
  for (const listener of listeners) {
    listener();
  }
};

export const getLocalMacTokenHashSnapshot = (): string | null =>
  storeState.tokenHash;

export const subscribeLocalMacTokenHash = (
  onStoreChange: () => void,
): (() => void) => {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
};

export const setLocalMacTokenHash = (tokenHash: string | null): void => {
  const next =
    tokenHash !== null && tokenHash.trim().length > 0
      ? tokenHash.trim().toLowerCase()
      : null;

  if (next === storeState.tokenHash) {
    return;
  }

  storeState.tokenHash = next;

  if (next !== null) {
    setAgentWitchLocalTokenHashCookie(next);
  } else {
    clearAgentWitchLocalTokenHashCookie();
  }

  notifyListeners();
};
