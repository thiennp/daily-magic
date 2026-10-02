import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

describe("AwcProjectActivityFeed disclosure", () => {
  it("stays closed by default and only mounts the panel when opened", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/AwcProjectActivityFeed.tsx",
      ),
      "utf8",
    );

    expect(source).toMatch(/useState\(false\)/);
    expect(source).toContain("aria-expanded={isOpen}");
    expect(source).toContain("aria-controls={panelId}");
    expect(source).toMatch(
      /useAwcProjectActivity\(projectId,\s*refreshSignal,\s*isOpen\)/,
    );
    expect(source).toContain('panelId = "project-activity-panel"');
    expect(source).toMatch(/\{isOpen \? \(/);
    expect(source).toContain("id={panelId}");
    expect(AWC_PROJECT_ACCESS_COPY.activityToggleShow).toBe("Show activity");
    expect(AWC_PROJECT_ACCESS_COPY.activityToggleHide).toBe("Hide activity");
  });
});
