import { beforeEach, describe, expect, it, vi } from "vitest";

import { RATE_LIMITED_CASES } from "@/lib/projects/acl/messaging/projectMessageRateLimited.fixtures";

const dispatchProjectMessage = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/messaging/dispatchProjectMessage", () => ({
  dispatchProjectMessage,
}));

import { executeProjectAclMessagingTools } from "@/lib/agentAccess/executeProjectAclMessagingTools";

const callDispatch = () =>
  executeProjectAclMessagingTools({
    actor: { id: "bot-user-1" } as never,
    name: "project_dispatch",
    args: { projectId: "proj-1", body: "hello" },
  });

describe("project_dispatch tool on rate_limited", () => {
  beforeEach(() => {
    dispatchProjectMessage.mockReset();
  });

  it.each(RATE_LIMITED_CASES)(
    "returns every retry field for %s",
    async (_label, failure) => {
      dispatchProjectMessage.mockResolvedValue(failure);
      const result = await callDispatch();
      expect(result?.isError).toBe(true);
      expect(JSON.parse(result?.text ?? "null")).toEqual({
        ok: false,
        error: failure.message,
        code: "rate_limited",
        reason: failure.reason,
        detail: failure.detail,
        retryAfterSeconds: failure.retryAfterSeconds,
        retryAfterAt: failure.retryAfterAt,
        message: failure.message,
      });
      expect(dispatchProjectMessage).toHaveBeenCalledWith({
        projectId: "proj-1",
        actorUserId: "bot-user-1",
        args: { projectId: "proj-1", body: "hello" },
      });
    },
  );

  it("sets numbers and an ISO time for hourly", async () => {
    dispatchProjectMessage.mockResolvedValue(RATE_LIMITED_CASES[0][1]);
    const body = JSON.parse((await callDispatch())?.text ?? "null") as {
      retryAfterSeconds: unknown;
      retryAfterAt: unknown;
    };
    expect(typeof body.retryAfterSeconds).toBe("number");
    expect(new Date(String(body.retryAfterAt)).toISOString()).toBe(body.retryAfterAt);
  });

  it("keeps null retry fields for unread_cap", async () => {
    dispatchProjectMessage.mockResolvedValue(RATE_LIMITED_CASES[1][1]);
    const text = (await callDispatch())?.text ?? "";
    expect(text).toContain('"retryAfterSeconds":null');
    expect(text).toContain('"retryAfterAt":null');
  });
});
