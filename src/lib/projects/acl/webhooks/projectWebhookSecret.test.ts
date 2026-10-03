import { describe, expect, it } from "vitest";

import {
  createProjectWebhookSecret,
  hashProjectWebhookSecret,
  isProjectWebhookTimestampFresh,
  signProjectWebhookBody,
} from "@/lib/projects/acl/webhooks/projectWebhookSecret";

describe("projectWebhookSecret (A3.2)", () => {
  it("signs timestamp.messageId.body with HMAC-SHA256 hex", () => {
    const secret = createProjectWebhookSecret();
    const signature = signProjectWebhookBody({
      secret,
      timestamp: "1710000000",
      messageId: "msg-1",
      body: "{\"ok\":true}",
    });
    expect(signature).toMatch(/^[a-f0-9]{64}$/);
    expect(hashProjectWebhookSecret(secret)).toMatch(/^[a-f0-9]{64}$/);
    expect(isProjectWebhookTimestampFresh(Math.floor(Date.now() / 1000))).toBe(
      true,
    );
  });
});
