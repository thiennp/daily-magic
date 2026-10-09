import { describe, expect, it } from "vitest";

import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { filterProductConnectUpdatesSince } from "@/lib/agentAccess/buildCheckProductUpdatesPayload";

describe("product connect knowledge card catalog", () => {
  it("bumps catalog to v29 with a bot-knowledge-card entry", () => {
    expect(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION).toBe(29);
    const entry = PRODUCT_CONNECT_UPDATES.find(
      (row) => row.id === "bot-knowledge-card-report",
    );
    expect(entry?.catalogVersion).toBe(29);
    expect(entry?.adapt).toMatch(/publish_project_skill/);
    expect(entry?.adapt).toMatch(/onboarding knowledge card/i);
    expect(entry?.adapt).toMatch(/list_project_skills/);
    expect(entry?.adapt).toMatch(/resultSummary/);
  });

  it("returns the entry for bots still at catalog 28", () => {
    const entries = filterProductConnectUpdatesSince(28);
    expect(entries.map((row) => row.id)).toContain("bot-knowledge-card-report");
    expect(filterProductConnectUpdatesSince(29)).toHaveLength(0);
  });
});
