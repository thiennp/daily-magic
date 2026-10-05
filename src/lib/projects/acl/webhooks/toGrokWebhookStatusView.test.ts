import { describe, expect, it } from "vitest";

import { AWC_GROK_WEBHOOK_DAILY_REPAIR } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { STORED_GROK_WAKE_RESULT } from "@/lib/projects/acl/messaging/storedGrokWakeResult.constant";
import { toGrokWebhookStatusView } from "@/lib/projects/acl/webhooks/toGrokWebhookStatusView";

describe("toGrokWebhookStatusView", () => {
  it("shows host + key set, never the path or key", () => {
    expect(
      toGrokWebhookStatusView("https://hooks.example.com/wake/abc?k=1"),
    ).toEqual({
      grokWebhookRegistered: true,
      grokWebhookUrlHost: "hooks.example.com",
      keySet: true,
    });
    expect(toGrokWebhookStatusView(null)).toEqual({
      grokWebhookRegistered: false,
      grokWebhookUrlHost: null,
      keySet: false,
    });
  });

  it("daily repair copy names only results STORED_GROK_WAKE_RESULT can hold", () => {
    expect(AWC_GROK_WEBHOOK_DAILY_REPAIR).toContain(
      "fetch_failed, not_postable, or a non-2xx http_ code",
    );
    for (const value of [
      "fetch_failed",
      "not_postable",
      "http_500",
      "http_200",
    ]) {
      expect(STORED_GROK_WAKE_RESULT.test(value)).toBe(true);
    }
    expect(STORED_GROK_WAKE_RESULT.test("timeout")).toBe(false);
  });
});
