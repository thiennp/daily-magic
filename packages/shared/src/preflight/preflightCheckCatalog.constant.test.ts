import { describe, expect, it } from "vitest";

import {
  PREFLIGHT_ACTION_IDS,
  PREFLIGHT_ACTION_REQUIRED_CHECKS,
} from "./preflightAction.constant";
import {
  PREFLIGHT_CHECK_BY_ID,
  PREFLIGHT_CHECK_CATALOG,
} from "./preflightCheckCatalog.constant";

describe("PREFLIGHT_CHECK_CATALOG", () => {
  it("has 12 unique pf.* ids", () => {
    const ids = PREFLIGHT_CHECK_CATALOG.map((check) => check.id);
    expect(ids).toHaveLength(12);
    expect(new Set(ids).size).toBe(12);
    expect(ids.every((id) => id.startsWith("pf."))).toBe(true);
  });

  it("maps every action to known catalog checks only", () => {
    for (const actionId of PREFLIGHT_ACTION_IDS) {
      const required = PREFLIGHT_ACTION_REQUIRED_CHECKS[actionId];
      expect(required.length).toBeGreaterThan(0);
      for (const checkId of required) {
        expect(PREFLIGHT_CHECK_BY_ID[checkId], checkId).toBeDefined();
      }
    }
  });

  it("gives every check a name, intent, fix, and rerun hint", () => {
    for (const check of PREFLIGHT_CHECK_CATALOG) {
      expect(check.name.length).toBeGreaterThan(0);
      expect(check.intent.length).toBeGreaterThan(0);
      expect(check.fix.length).toBeGreaterThan(0);
      expect(check.rerunHint).toContain("setup_project");
    }
  });
});
