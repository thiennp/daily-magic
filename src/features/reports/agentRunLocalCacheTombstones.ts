const TOMBSTONE_KEY = "daily-magic.agent-runs.deleted.v1";

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string");

const readTombstones = (): Set<string> => {
  if (typeof window === "undefined") {
    return new Set();
  }

  const raw = window.localStorage.getItem(TOMBSTONE_KEY);
  if (raw === null) {
    return new Set();
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isStringArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
};

const writeTombstones = (ids: ReadonlySet<string>): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOMBSTONE_KEY, JSON.stringify([...ids]));
};

export const isAgentRunLocalCacheTombstoned = (runId: string): boolean =>
  readTombstones().has(runId);

export const addAgentRunLocalCacheTombstone = (runId: string): void => {
  const next = readTombstones();
  next.add(runId);
  writeTombstones(next);
};

export const filterAgentRunsNotDeletedLocally = <
  T extends { readonly id: string },
>(
  runs: readonly T[],
): readonly T[] =>
  runs.filter((run) => !isAgentRunLocalCacheTombstoned(run.id));
