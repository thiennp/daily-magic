import { describe, expect, it } from "vitest";

import { toHmacWebhookStatusView } from "@/lib/projects/acl/webhooks/toHmacWebhookStatusView";

describe("toHmacWebhookStatusView", () => {
  it("shows host + secret set, never the path or secret", () => {
    expect(
      toHmacWebhookStatusView({
        hmacWebhookUrl: "https://hooks.example.com/hmac/abc?k=1",
        secretSet: true,
      }),
    ).toEqual({
      hmacWebhookRegistered: true,
      hmacWebhookUrlHost: "hooks.example.com",
      secretSet: true,
    });
    expect(
      toHmacWebhookStatusView({
        hmacWebhookUrl: null,
        secretSet: false,
      }),
    ).toEqual({
      hmacWebhookRegistered: false,
      hmacWebhookUrlHost: null,
      secretSet: false,
    });
    expect(
      toHmacWebhookStatusView({
        hmacWebhookUrl: "https://hooks.example.com/hmac",
        secretSet: false,
      }),
    ).toEqual({
      hmacWebhookRegistered: true,
      hmacWebhookUrlHost: "hooks.example.com",
      secretSet: false,
    });
  });
});
