import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeProjectsPanel", () => {
  it("HOME-048: lists projects and opens send-task with projectId on select", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeProjectsPanel.tsx"),
      "utf8",
    );

    expect(source).toContain("useUserProjects");
    expect(source).toContain("SendTaskComposerProjectPickerStep");
    expect(source).toContain("showHeader={false}");
    expect(source).toContain("buildAgentComposerHref");
    expect(source).toContain("projectId: project.id");
    expect(source).toContain("customTask: true");
  });
});
