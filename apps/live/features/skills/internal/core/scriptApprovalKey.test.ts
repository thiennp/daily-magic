import { describe, expect, it } from "vitest";

import { scriptApprovalKey } from "./skillScriptApprovals";

describe("scriptApprovalKey", () => {
  it("still tells two versions apart after the cloud keeps only 80 characters", () => {
    const skill = "s".repeat(64);
    const v1 = scriptApprovalKey(skill, "build-it", "a".repeat(64));
    const v2 = scriptApprovalKey(skill, "build-it", "b".repeat(64));
    expect(v1.slice(0, 80)).not.toBe(v2.slice(0, 80));
  });
});
