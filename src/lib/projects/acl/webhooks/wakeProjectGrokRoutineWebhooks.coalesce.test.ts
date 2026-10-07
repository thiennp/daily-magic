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

describe("wakeProjectGrokRoutineWebhooks DF-026 coalesce", () => {
  afterEach(() => {
    sqlMock.mockReset();
    fetchMock.mockReset();
    projectWakeRetryAfterRegistry.clear();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("N rows to the same recipient in one batch fire one wake", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    sqlMock.mockImplementation(
      fakeWakeThrottleDb({ hooks: ["mem-a"], woken: new Set() }),
    );
    const first = await wakeForThrottleTest("msg-1", ["mem-a", "mem-a"]);
    const second = await wakeForThrottleTest("msg-2", ["mem-a"]);
    const third = await wakeForThrottleTest("msg-3", ["mem-a"]);
    expect(first).toEqual([{ membershipId: "mem-a", result: "http_200" }]);
    expect(second).toEqual([{ membershipId: "mem-a", result: "coalesced" }]);
    expect(third).toEqual([{ membershipId: "mem-a", result: "coalesced" }]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(storedWakeResults(sqlMock.mock.calls)).toEqual(["http_200"]);
  });

  it("coalesces per recipient, not per message", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue({ ok: true, status: 200 });
    sqlMock.mockImplementation(
      fakeWakeThrottleDb({
        hooks: ["mem-a", "mem-b"],
        woken: new Set(["mem-a"]),
      }),
    );
    const results = await wakeForThrottleTest("msg-2", ["mem-a", "mem-b"]);
    expect(results).toEqual([
      { membershipId: "mem-a", result: "coalesced" },
      { membershipId: "mem-b", result: "http_200" },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("not_postable recipients skip the gate", async () => {
    vi.stubGlobal("fetch", fetchMock);
    sqlMock.mockImplementation(
      fakeWakeThrottleDb({ hooks: [], woken: new Set(["mem-a"]) }),
    );
    expect(await wakeForThrottleTest("msg-1", ["mem-a"])).toEqual([
      { membershipId: "mem-a", result: "not_postable" },
    ]);
    expect(storedWakeResults(sqlMock.mock.calls)).toEqual(["not_postable"]);
  });
});
