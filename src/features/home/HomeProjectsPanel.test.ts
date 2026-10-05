import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeProjectsPanel", () => {
  it("HOME-048: reuses the /projects panel and data instead of its own list", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeProjectsPanel.tsx"),
      "utf8",
    );

    expect(source).toContain('from "@/features/projects/AwcProjectsPanel"');
    expect(source).toContain("selectProjects={selectHomeRecentProjects}");
    expect(source).toContain("showManageControls={false}");
    expect(source).not.toContain("useUserProjects(");
    expect(source).not.toContain("fetch(");
    expect(source).not.toContain("HomeProjectListRow");
  });
});
