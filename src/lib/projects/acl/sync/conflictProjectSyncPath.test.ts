import { describe, expect, it } from "vitest";

import { conflictProjectSyncPath } from "@/lib/projects/acl/sync/conflictProjectSyncPath";

describe("conflictProjectSyncPath", () => {
  it("inserts conflict marker before extension", () => {
    const path = conflictProjectSyncPath({
      path: "skills/a/SKILL.md",
      deviceId: "abcdef12zzzz",
      now: new Date("2026-10-07T04:20:00.000Z"),
    });
    expect(path).toContain(".conflict-abcdef12-");
    expect(path.endsWith(".md")).toBe(true);
  });
});
