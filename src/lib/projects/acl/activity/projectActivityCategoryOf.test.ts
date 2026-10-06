import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  PROJECT_ACTIVITY_CATEGORIES,
  PROJECT_ACTIVITY_EVENT_TYPES,
  projectActivityCategoryOf,
  projectActivityTypesForCategory,
} from "@/lib/projects/acl/activity/projectActivityEvent.constant";

describe("Access log category filter mapping", () => {
  it("puts rule.dropped / rule.restored in safety, not access or wake", () => {
    expect(projectActivityCategoryOf("rule.dropped")).toBe("safety");
    expect(projectActivityCategoryOf("rule.restored")).toBe("safety");
    expect(projectActivityTypesForCategory("safety")).toEqual([
      "rule.dropped",
      "rule.restored",
    ]);
    expect(projectActivityTypesForCategory("access")).not.toContain("rule.dropped");
    expect(projectActivityTypesForCategory("access")).not.toContain("rule.restored");
    expect(projectActivityTypesForCategory("wake")).not.toContain("rule.dropped");
  });

  it("keeps All covering every event type across the three chips", () => {
    expect(PROJECT_ACTIVITY_CATEGORIES).toEqual(["access", "wake", "safety"]);
    const covered = PROJECT_ACTIVITY_CATEGORIES.flatMap((c) =>
      projectActivityTypesForCategory(c),
    );
    expect(covered.sort()).toEqual([...PROJECT_ACTIVITY_EVENT_TYPES].sort());
  });

  it("exposes a Safety rules filter chip next to People and invites", () => {
    const chips = readFileSync(
      path.join(process.cwd(), "src/features/projects/accessLog/AwcAccessLogFilterChips.tsx"),
      "utf8",
    );
    const copy = readFileSync(
      path.join(process.cwd(), "src/features/projects/accessLog/accessLogCopy.constant.ts"),
      "utf8",
    );
    expect(copy).toContain('filterSafety: "Safety rules"');
    expect(chips).toContain('id: "safety"');
    expect(chips).toContain("C.filterSafety");
    expect(chips).toContain('id: "access"');
    expect(chips).toContain("C.filterAccess");
    expect(chips).toContain('id: "all"');
  });
});
