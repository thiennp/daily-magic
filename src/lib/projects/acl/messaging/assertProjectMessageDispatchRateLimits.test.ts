import { beforeEach, describe, expect, it, vi } from "vitest";

import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import {
  PROJECT_MESSAGE_HOURLY_CAP,
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
    expect(String(sqlMock.mock.calls[0]?.[0])).toContain("INTERVAL '1 hour'");
    expect(String(sqlMock.mock.calls[0]?.[0])).toContain("NOT (kind = ANY(");
    expect(String(sqlMock.mock.calls[0]?.[0])).not.toContain(
      "INTERVAL '24 hours'",
    );
    expect(String(sqlMock.mock.calls[1]?.[0])).toContain("project_id");
  });

  it("rejects when hourly send count >= cap", async () => {
    sqlMock.mockResolvedValueOnce([{ c: PROJECT_MESSAGE_HOURLY_CAP }]);

    const result = await assertProjectMessageDispatchRateLimits({
      projectId: "proj-1",
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });

    expect(result).toEqual({ ok: false, code: "rate_limited_hourly" });
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("rejects when project unread count >= cap", async () => {
    sqlMock
      .mockResolvedValueOnce([{ c: 0 }])
      .mockResolvedValueOnce([{ c: PROJECT_MESSAGE_UNREAD_CAP }]);

    const result = await assertProjectMessageDispatchRateLimits({
      projectId: "proj-1",
      senderMembershipId: "mem-1",
      senderUserId: "user-1",
    });

    expect(result).toEqual({ ok: false, code: "unread_cap" });
    expect(sqlMock).toHaveBeenCalledTimes(2);
  });
});
