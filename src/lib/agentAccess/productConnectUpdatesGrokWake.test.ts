import { describe, expect, it } from "vitest";

import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

describe("product connect grok wake copy", () => {
  it("drops inbox timer polling and tells bots to check status daily and re-enter in the form", () => {
    const blob = PRODUCT_CONNECT_UPDATES.map(
      (entry) => `${entry.summary} ${entry.adapt ?? ""}`,
    ).join("\n");
    expect(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION).toBe(15);
    expect(blob).toContain(AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS);
    expect(blob).toMatch(/Grok Bot only/);
    expect(blob).not.toMatch(/Slack|Discord|grokbot:\/\//i);
    expect(blob).toContain(AWC_GROK_WEBHOOK_DAILY_REPAIR);
    expect(blob).toMatch(/get_my_project_webhook_status/);
    expect(blob).toMatch(/once a day/i);
    expect(blob).toMatch(/never ask .*(paste|for) them .*chat/i);
    expect(blob).not.toMatch(/every 30 seconds/i);
    expect(blob).not.toMatch(/5 minutes/i);
    expect(blob).not.toMatch(/MUST poll list_project_inbox/i);
    expect(blob).not.toMatch(/Grok auto-wake(?!, or faster)/i);
  });
});
