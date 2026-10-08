import { describe, expect, it } from "vitest";

import {
  clearLiveFloaterRunId,
  getLiveFloaterRunId,
  resolveLiveFloaterRunIdToPersist,
  setLiveFloaterRunId,
} from "@/features/agent/utils/liveFloaterRunIdStorage";

const memoryStorage = (): Storage => {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    key: () => null,
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
  };
};

describe("liveFloaterRunIdStorage (afae8216)", () => {
  it("gets, sets, and clears the run id", () => {
    const storage = memoryStorage();
    expect(getLiveFloaterRunId(storage)).toBeNull();
    setLiveFloaterRunId("run-1", storage);
    expect(getLiveFloaterRunId(storage)).toBe("run-1");
    clearLiveFloaterRunId(storage);
    expect(getLiveFloaterRunId(storage)).toBeNull();
  });

  it("persists only live runs or runs with an open question", () => {
    const base = { runId: "run-1", hasPendingQuestion: false };
    expect(
      resolveLiveFloaterRunIdToPersist({ ...base, status: "streaming" }),
    ).toBe("run-1");
    expect(
      resolveLiveFloaterRunIdToPersist({ ...base, status: "finished" }),
    ).toBeNull();
    expect(
      resolveLiveFloaterRunIdToPersist({
        ...base,
        status: "finished",
        hasPendingQuestion: true,
      }),
    ).toBe("run-1");
    expect(
      resolveLiveFloaterRunIdToPersist({
        runId: null,
        status: "streaming",
        hasPendingQuestion: false,
      }),
    ).toBeNull();
  });
});
