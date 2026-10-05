import { beforeEach, describe, expect, it, vi } from "vitest";

import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import {
  PROJECT_MESSAGE_HOURLY_CAP,
  PROJECT_MESSAGE_HOURLY_WINDOW_MS,
  PROJECT_MESSAGE_UNREAD_CAP,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("assertProjectMessageDispatchRateLimits", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("allows under hourly and unread caps", async () => {
    sqlMock
      .mockResolvedValueOnce([{ c: PROJECT_MESSAGE_HOURLY_CAP - 1 }])
      .mockResolvedValueOnce([{ c: PROJECT_MESSAGE_UNREAD_CAP - 1 }]);

    const result = await assertProjectMessageDispatchRateLimits({
      projectId: "proj-1",
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });

    expect(result).toEqual({ ok: true });
    expect(sqlMock).toHaveBeenCalledTimes(2);
  });

  it("returns rate_limited hourly with retryAfter from the oldest counted row", async () => {
    const oldest = new Date("2026-10-05T08:00:00.000Z");
    const now = new Date("2026-10-05T08:50:00.000Z");
    sqlMock
      .mockResolvedValueOnce([{ c: PROJECT_MESSAGE_HOURLY_CAP }])
      .mockResolvedValueOnce([{ oldest }]);

    const result = await assertProjectMessageDispatchRateLimits({
      projectId: "proj-1",
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
      now,
    });

    expect(result).toEqual({
      ok: false,
      code: "rate_limited",
      reason: "hourly",
      detail: "rate_limited_hourly",
      retryAfterSeconds: 10 * 60,
      retryAfterAt: new Date(
        oldest.getTime() + PROJECT_MESSAGE_HOURLY_WINDOW_MS,
      ).toISOString(),
      message: expect.stringContaining("Tell your user the message was not sent"),
    });
    expect(sqlMock).toHaveBeenCalledTimes(2);
  });

  it("returns rate_limited unread_cap with null retryAfter", async () => {
    sqlMock
      .mockResolvedValueOnce([{ c: 0 }])
      .mockResolvedValueOnce([{ c: PROJECT_MESSAGE_UNREAD_CAP }]);

    const result = await assertProjectMessageDispatchRateLimits({
      projectId: "proj-1",
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });

    expect(result).toEqual({
      ok: false,
      code: "rate_limited",
      reason: "unread_cap",
      detail: "unread_cap",
      retryAfterSeconds: null,
      retryAfterAt: null,
      message: expect.stringContaining("Ack or Clear all frees slots"),
    });
  });
});
