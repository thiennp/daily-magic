import { describe, expect, it } from "vitest";

import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { filterProductConnectUpdatesSince } from "@/lib/agentAccess/buildCheckProductUpdatesPayload";

const findEntry = (id: string) =>
  PRODUCT_CONNECT_UPDATES.find((row) => row.id === id);

describe("product connect Playbook skill catalog", () => {
  it("is at catalog v30", () => {
    expect(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION).toBe(30);
  });

  it("v29 teaches library-first lookup, resultSummary and Playbook skills", () => {
    const entry = findEntry("bot-knowledge-card-report");
    expect(entry?.catalogVersion).toBe(29);
    expect(entry?.adapt).toMatch(/publish_project_skill/);
    expect(entry?.adapt).toMatch(/list_project_skills/);
    expect(entry?.adapt).toMatch(/resultSummary/);
    expect(entry?.adapt).toMatch(/Playbook skill/);
  });

  it("v30 retracts the onboarding skill and the resultSummary to auto-skill link", () => {
    const entry = findEntry("bot-playbook-skill-terminology");
    expect(entry?.catalogVersion).toBe(30);
    expect(entry?.adapt).toMatch(/no longer required/);
    expect(entry?.adapt).toMatch(/does not feed auto skills/);
    expect(entry?.adapt).toMatch(/bots never create auto skills/);
  });

  it("returns v29 + v30 to a bot at catalog 28, only v30 at 29, nothing at 30", () => {
    const ids = (since: number) =>
      filterProductConnectUpdatesSince(since).map((row) => row.id);
    expect(ids(28)).toEqual(
      expect.arrayContaining([
        "bot-knowledge-card-report",
        "bot-playbook-skill-terminology",
      ]),
    );
    expect(ids(29)).toEqual(["bot-playbook-skill-terminology"]);
    expect(ids(30)).toHaveLength(0);
  });
});
