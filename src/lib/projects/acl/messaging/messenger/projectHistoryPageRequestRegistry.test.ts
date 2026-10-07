import { afterEach, describe, expect, it, vi } from "vitest";

import {
  completeProjectHistoryPageRequest,
  countPendingProjectHistoryPageRequestsForTests,
  registerProjectHistoryPageRequest,
  resetProjectHistoryPageRequestRegistryForTests,
} from "@/lib/projects/acl/messaging/messenger/projectHistoryPageRequestRegistry";

describe("projectHistoryPageRequestRegistry", () => {
  afterEach(() => {
    resetProjectHistoryPageRequestRegistryForTests();
  });

  it("pending → completed with page payload", async () => {
    const promise = registerProjectHistoryPageRequest("req-1", 5_000);
    expect(countPendingProjectHistoryPageRequestsForTests()).toBe(1);
    const ok = completeProjectHistoryPageRequest("req-1", {
      ok: true,
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
    expect(ok).toBe(true);
    await expect(promise).resolves.toEqual({
      ok: true,
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
    expect(countPendingProjectHistoryPageRequestsForTests()).toBe(0);
  });

  it("pending → failed on device error payload", async () => {
    const promise = registerProjectHistoryPageRequest("req-2", 5_000);
    completeProjectHistoryPageRequest("req-2", {
      ok: false,
      errorCode: "read_failed",
      errorMessage: "boom",
    });
    await expect(promise).resolves.toMatchObject({
      ok: false,
      errorCode: "read_failed",
    });
  });

  it("pending → expired on timeout", async () => {
    vi.useFakeTimers();
    const promise = registerProjectHistoryPageRequest("req-3", 50);
    vi.advanceTimersByTime(51);
    await expect(promise).resolves.toMatchObject({
      ok: false,
      errorCode: "expired",
    });
    vi.useRealTimers();
  });
});
