import { describe, expect, it } from "vitest";

import { filterProductConnectUpdatesSince } from "@/lib/agentAccess/buildCheckProductUpdatesPayload";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

const ENTRY_ID = "bot-playbook-skill-report";

describe("product connect Playbook skill catalog", () => {
  it("is at catalog v31 with one Playbook entry", () => {
    expect(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION).toBe(31);
    const entries = PRODUCT_CONNECT_UPDATES.filter((row) =>
      /playbook|knowledge-card/.test(row.id),
    );
    expect(entries.map((row) => row.id)).toEqual([ENTRY_ID]);
    expect(entries[0]?.catalogVersion).toBe(31);
  });

  it("teaches library-first lookup, resultSummary and Playbook skills", () => {
    const entry = PRODUCT_CONNECT_UPDATES.find((row) => row.id === ENTRY_ID);
    expect(entry?.adapt).toMatch(/skills_find/);
    expect(entry?.adapt).toMatch(/list_project_skills \{ projectId, query/);
    expect(entry?.adapt).toMatch(/publish_project_skill/);
    expect(entry?.adapt).toMatch(/resultSummary/);
    expect(entry?.adapt).toMatch(/You do not create auto skills/);
    expect(entry?.adapt).toMatch(/do not publish another/);
  });

  it("reaches bots at catalog 28 to 30, and nobody at 31", () => {
    const ids = (since: number) =>
      filterProductConnectUpdatesSince(since).map((row) => row.id);
    expect(ids(28)).toContain(ENTRY_ID);
    expect(ids(30)).toContain(ENTRY_ID);
    expect(ids(31)).toHaveLength(0);
  });
});
