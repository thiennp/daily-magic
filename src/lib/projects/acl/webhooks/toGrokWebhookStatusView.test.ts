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
      "http_401, http_403, http_404, not_postable, or fetch_failed on repeated checks",
    );
    expect(AWC_GROK_WEBHOOK_DAILY_REPAIR).toContain(
      "a single fetch_failed can just be the 3s wake timeout",
    );
    const named =
      AWC_GROK_WEBHOOK_DAILY_REPAIR.match(
        /\b(?:http_\w+|fetch_failed|not_postable)\b/g,
      ) ?? [];
    expect(new Set(named)).toEqual(
      new Set([
        "http_401",
        "http_403",
        "http_404",
        "not_postable",
        "fetch_failed",
      ]),
    );
    for (const value of named) {
      expect(STORED_GROK_WAKE_RESULT.test(value)).toBe(true);
    }
    expect(AWC_GROK_WEBHOOK_DAILY_REPAIR).not.toMatch(/non-2xx/);
    expect(STORED_GROK_WAKE_RESULT.test("timeout")).toBe(false);
    expect(STORED_GROK_WAKE_RESULT.test("forbidden")).toBe(false);
  });

  it("daily repair copy sends forbidden to get_my_project_access, not re-entry", () => {
    expect(AWC_GROK_WEBHOOK_DAILY_REPAIR).toContain(
      "If it returns forbidden, your membership is not active: re-check get_my_project_access.",
    );
  });
});
