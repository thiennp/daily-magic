import { afterEach, describe, expect, it, vi } from "vitest";

import { postSignedProjectMembershipWebhook } from "@/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook";
import { signProjectWebhookBody } from "@/lib/projects/acl/webhooks/projectWebhookSecret";

describe("postSignedProjectMembershipWebhook", () => {
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
      body: "{\"messageId\":\"msg-9\"}",
    });
    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
