import { afterEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { projectWakeRetryAfterRegistry } from "@/lib/projects/acl/webhooks/projectWakeRetryAfterRegistry";
import {
  fakeWakeThrottleDb,
  storedWakeResults,
  wakeForThrottleTest,
} from "@/lib/projects/acl/webhooks/wakeThrottleSql.fixtures";

const fetchMock = vi.fn();

describe("wakeProjectGrokRoutineWebhooks DF-026 429 Retry-After", () => {
  afterEach(() => {
    sqlMock.mockReset();
    fetchMock.mockReset();
    projectWakeRetryAfterRegistry.clear();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("429 with Retry-After: no immediate retry, later wakes deferred until it passes", async () => {
    vi.useFakeTimers({ now: Date.parse("2026-10-07T19:00:00.000Z") });
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 429,
      headers: {
        get: (name: string) => (name === "retry-after" ? "120" : null),
      },
      text: async () => "",
    });
    sqlMock.mockImplementation(
      fakeWakeThrottleDb({ hooks: ["mem-a"], woken: new Set() }),
    );
    expect(await wakeForThrottleTest("msg-1", ["mem-a"])).toEqual([
      { membershipId: "mem-a", result: "http_429" },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(await wakeForThrottleTest("msg-2", ["mem-a"])).toEqual([
      { membershipId: "mem-a", result: "deferred_429" },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(storedWakeResults(sqlMock.mock.calls)).toEqual(["http_429"]);
    vi.setSystemTime(Date.parse("2026-10-07T19:02:01.000Z"));
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });
    expect(await wakeForThrottleTest("msg-3", ["mem-a"])).toEqual([
      { membershipId: "mem-a", result: "http_200" },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("defers on a stored recent http_429 from another instance", async () => {
    vi.stubGlobal("fetch", fetchMock);
    sqlMock.mockImplementation(
      fakeWakeThrottleDb({
        hooks: ["mem-a"],
        woken: new Set(),
        rateLimitedStored: ["mem-a"],
      }),
    );
    expect(await wakeForThrottleTest("msg-1", ["mem-a"])).toEqual([
      { membershipId: "mem-a", result: "deferred_429" },
    ]);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(storedWakeResults(sqlMock.mock.calls)).toEqual([]);
  });
});
