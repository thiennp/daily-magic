import { describe, expect, it } from "vitest";

import { filterProductConnectUpdatesSince } from "@/lib/agentAccess/buildCheckProductUpdatesPayload";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { PROJECT_TASK_REFINEMENT_CLAUSE } from "@/lib/projects/acl/projectTaskRefinementClause.constant";

const ENTRY_ID = "task-refinement-tools";

describe("product connect task refinement catalog", () => {
  it("is the newest entry and carries the shared refinement sentence", () => {
    const entry = PRODUCT_CONNECT_UPDATES.find((row) => row.id === ENTRY_ID);
    expect(entry?.catalogVersion).toBe(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION);
    expect(entry?.adapt).toBe(PROJECT_TASK_REFINEMENT_CLAUSE);
    expect(entry?.summary).toMatch(/split_project_task/);
    expect(entry?.summary).toMatch(/list_project_task_blockers/);
  });

  it("reaches bots that already joined, and nobody at the new version", () => {
    const ids = (since: number) =>
      filterProductConnectUpdatesSince(since).map((row) => row.id);
    expect(ids(0)).toContain(ENTRY_ID);
    expect(ids(31)).toEqual([ENTRY_ID]);
    expect(ids(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION)).toHaveLength(0);
  });
});
