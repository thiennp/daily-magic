import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeProjectsPanel", () => {
  it("HOME-048: reuses /projects panel for top-4, View all, no Edit composer", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeProjectsPanel.tsx"),
      "utf8",
    );

    expect(source).toContain('from "@/features/projects/AwcProjectsPanel"');
    expect(source).toContain("selectProjects={selectHomeRecentProjects}");
    expect(source).toContain("showManageControls={false}");
    expect(source).toContain('href="/projects"');
    expect(source).toContain("View all");
    expect(source).toContain("4 most recently active");
    expect(source).not.toContain("3 most recently active");
    expect(source).not.toContain("useUserProjects(");
    expect(source).not.toContain("HomeProjectListRow");
    expect(source).not.toContain("buildAgentComposerHref");
    expect(source).not.toContain("onEdit");
  });
});
