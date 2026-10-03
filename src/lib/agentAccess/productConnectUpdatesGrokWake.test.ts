import { describe, expect, it } from "vitest";

import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

describe("product connect grok wake copy", () => {
  it("drops inbox timer polling and tells bots to re-register daily", () => {
    const blob = PRODUCT_CONNECT_UPDATES.map(
      (entry) => `${entry.summary} ${entry.adapt ?? ""}`,
    ).join("\n");
    expect(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION).toBe(13);
    expect(blob).toMatch(/grokWebhookUrl/);
    expect(blob).toMatch(/grokWebhookBearer/);
    expect(blob).toMatch(/once a day/i);
    expect(blob).toMatch(/re-register/i);
    expect(blob).not.toMatch(/every 30 seconds/i);
    expect(blob).not.toMatch(/5 minutes/i);
    expect(blob).not.toMatch(/MUST poll list_project_inbox/i);
    expect(blob).not.toMatch(/Grok auto-wake/i);
  });
});
