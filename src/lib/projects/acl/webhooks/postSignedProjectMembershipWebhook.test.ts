import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const assertSafe = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl", () => ({
  assertSafeProjectWebhookUrl: assertSafe,
}));

import { postSignedProjectMembershipWebhook } from "@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook";
import { signProjectWebhookBody } from "@/lib/projects/acl/webhooks/projectWebhookSecret";

describe("postSignedProjectMembershipWebhook", () => {
  beforeEach(() => {
    assertSafe.mockReset();
    assertSafe.mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("POSTs JSON with X-AWC-Signature over timestamp.messageId.body", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      const timestamp = headers.get("x-awc-timestamp") ?? "";
      const body = String(init?.body ?? "");
      const expected = signProjectWebhookBody({
        secret: "awc_whsec_abc",
        timestamp,
        messageId: "msg-9",
        body,
      });
      expect(headers.get("x-awc-signature")).toBe(expected);
      expect(headers.get("x-awc-message-id")).toBe("msg-9");
      expect(headers.get("content-type")).toBe("application/json");
      return new Response(null, { status: 204 });
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await postSignedProjectMembershipWebhook({
      webhookUrl: "https://example.com/hook",
      secret: "awc_whsec_abc",
      messageId: "msg-9",
      body: '{"messageId":"msg-9"}',
    });
    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns http_429 with the Retry-After seconds and POSTs once", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response("slow down", {
          status: 429,
          headers: { "retry-after": "45" },
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await postSignedProjectMembershipWebhook({
      webhookUrl: "https://example.com/hook",
      secret: "awc_whsec_abc",
      messageId: "msg-9",
      body: "{}",
    });
    expect(result).toEqual({
      ok: false,
      error: "http_429",
      retryAfterSeconds: 45,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("does not send when the host now resolves somewhere unsafe", async () => {
    assertSafe.mockResolvedValue({ ok: false, code: "blocked_host" });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const result = await postSignedProjectMembershipWebhook({
      webhookUrl: "https://example.com/hook",
      secret: "awc_whsec_abc",
      messageId: "msg-9",
      body: "{}",
    });
    expect(result).toEqual({ ok: false, error: "blocked_host" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("never follows redirects and reports a 3xx as a failure", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(null, {
          status: 302,
          headers: { location: "http://169.254.169.254/" },
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await postSignedProjectMembershipWebhook({
      webhookUrl: "https://example.com/hook",
      secret: "awc_whsec_abc",
      messageId: "msg-9",
      body: "{}",
    });
    expect(result).toEqual({ ok: false, error: "http_302" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/hook",
      expect.objectContaining({ redirect: "manual" }),
    );
  });
});
