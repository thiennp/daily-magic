import { beforeEach, describe, expect, it, vi } from "vitest";

import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import {
  PROJECT_MESSAGE_DISPATCH_HOURLY_LIMIT,
  PROJECT_MESSAGE_DISPATCH_UNACKED_LIMIT,
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

  it("rejects when hourly send count >= limit", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("INTERVAL '1 hour'")) {
        return [{ c: PROJECT_MESSAGE_DISPATCH_HOURLY_LIMIT }];
      }
      return [{ c: 0 }];
    });
    const result = await assertProjectMessageDispatchRateLimits({
      senderMembershipId: "mem-1",
    });
    expect(result).toEqual({ ok: false, code: "rate_limited_hourly" });
  });

  it("rejects when unacked outbound count >= limit", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("INTERVAL '1 hour'")) {
        return [{ c: 1 }];
      }
      if (q.includes("acked_at IS NULL")) {
        return [{ c: PROJECT_MESSAGE_DISPATCH_UNACKED_LIMIT }];
      }
      return [{ c: 0 }];
    });
    const result = await assertProjectMessageDispatchRateLimits({
      senderMembershipId: "mem-1",
    });
    expect(result).toEqual({ ok: false, code: "rate_limited_unacked" });
  });

  it("allows when under both caps", async () => {
    sqlMock.mockResolvedValue([{ c: 0 }]);
    const result = await assertProjectMessageDispatchRateLimits({
      senderMembershipId: "mem-1",
    });
    expect(result).toEqual({ ok: true });
  });
});
