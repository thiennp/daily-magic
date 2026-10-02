import { beforeEach, describe, expect, it, vi } from "vitest";

import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import {
  PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT,
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

  it("uses a rolling 24-hour sender window", async () => {
    sqlMock.mockResolvedValue([{ c: PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT - 1 }]);

    const result = await assertProjectMessageDispatchRateLimits({
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });

    expect(result).toEqual({ ok: true });
    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(String(sqlMock.mock.calls[0]?.[0])).toContain("INTERVAL '24 hours'");
    expect(String(sqlMock.mock.calls[0]?.[0])).not.toContain("INTERVAL '1 hour'");
    expect(String(sqlMock.mock.calls[0]?.[0])).not.toContain("acked_at IS NULL");
  });

  it("rejects when daily send count >= limit", async () => {
    sqlMock.mockResolvedValue([{ c: PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT }]);

    const result = await assertProjectMessageDispatchRateLimits({
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });

    expect(result).toEqual({ ok: false, code: "rate_limited_daily" });
  });

  it("allows when under the daily cap", async () => {
    sqlMock.mockResolvedValue([{ c: 0 }]);
    const result = await assertProjectMessageDispatchRateLimits({
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });
    expect(result).toEqual({ ok: true });
  });
});
