import { afterEach, describe, expect, it, vi } from "vitest";

const postMock = vi.fn();
vi.mock(
  "@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook",
  () => ({
    postSignedProjectMembershipWebhook: (...args: unknown[]) =>
      postMock(...args),
  }),
);

import { postProjectMembershipWebhookHonoringRetryAfter } from "@/lib/projects/acl/webhooks/postProjectMembershipWebhookHonoringRetryAfter";
import { projectWakeRetryAfterRegistry } from "@/lib/projects/acl/webhooks/projectWakeRetryAfterRegistry";

const push = (messageId: string) =>
  postProjectMembershipWebhookHonoringRetryAfter({
    membershipId: "mem-a",
    webhookUrl: "https://example.com/hook",
    secret: "test-secret",
    messageId,
    body: "{}",
  });

describe("postProjectMembershipWebhookHonoringRetryAfter", () => {
  afterEach(() => {
    postMock.mockReset();
    projectWakeRetryAfterRegistry.clear();
    vi.useRealTimers();
  });

  it("does not POST again until the 429 Retry-After passes", async () => {
    vi.useFakeTimers({ now: Date.parse("2026-10-07T19:00:00.000Z") });
    postMock.mockResolvedValueOnce({
      ok: false,
      error: "http_429",
      retryAfterSeconds: 30,
    });
    expect(await push("msg-1")).toEqual({
      ok: false,
      error: "http_429",
      retryAfterSeconds: 30,
    });
    expect(await push("msg-2")).toEqual({
      ok: false,
      error: "rate_limited_retry_after",
    });
    expect(postMock).toHaveBeenCalledTimes(1);
    vi.setSystemTime(Date.parse("2026-10-07T19:00:31.000Z"));
    postMock.mockResolvedValueOnce({ ok: true });
    expect(await push("msg-3")).toEqual({ ok: true });
    expect(postMock).toHaveBeenCalledTimes(2);
  });

  it("a non-429 failure does not defer", async () => {
    postMock.mockResolvedValue({ ok: false, error: "http_500" });
    await push("msg-1");
    await push("msg-2");
    expect(postMock).toHaveBeenCalledTimes(2);
  });
});
