import { afterEach, describe, expect, it, vi } from "vitest";

import { postNotificationDecision } from "@/features/notifications/notificationDecision";

const stubFetch = (response: { ok: boolean; body?: unknown }) => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: response.ok,
    json: async () => response.body ?? {},
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("postNotificationDecision", () => {
  it("approves a join request through the Access requests route", async () => {
    const fetchMock = stubFetch({ ok: true });
    expect(await postNotificationDecision("join:p1:r1", "approved")).toEqual({
      ok: true,
    });
    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      "/api/projects/p1/access/requests/r1/approve",
    );
  });

  it("denies a join request and declines a run approval", async () => {
    const fetchMock = stubFetch({ ok: true });
    await postNotificationDecision("join:p1:r1", "denied");
    await postNotificationDecision("run:p1:run9", "denied");
    await postNotificationDecision("run:p1:run9", "approved");
    expect(fetchMock.mock.calls.map((call) => call[0])).toEqual([
      "/api/projects/p1/access/requests/r1/deny",
      "/api/projects/p1/access/run-approvals/run9/decline",
      "/api/projects/p1/access/run-approvals/run9/approve",
    ]);
  });

  it("returns the server message when the route refuses", async () => {
    stubFetch({ ok: false, body: { errorMessage: "display_name_required" } });
    expect(await postNotificationDecision("join:p1:r1", "approved")).toEqual({
      ok: false,
      message: "display_name_required",
    });
  });

  it("refuses unknown ids without calling the server", async () => {
    const fetchMock = stubFetch({ ok: true });
    const result = await postNotificationDecision("x1", "approved");
    expect(result.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
