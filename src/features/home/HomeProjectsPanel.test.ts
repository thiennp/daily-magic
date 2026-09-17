import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeProjectsPanel", () => {
  it("HOME-048: lists project names with Edit opening send-task composer", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "HomeProjectsPanel.tsx"),
      "utf8",
    );

    expect(source).toContain("useUserProjects");
    expect(source).toContain("HomeProjectListRow");
    expect(source).not.toContain("SendTaskComposerProjectPickerStep");
    expect(source).not.toContain("onProjectDeleted");
    expect(source).toContain("buildAgentComposerHref");
    expect(source).toContain("projectId: project.id");
    expect(source).toContain("customTask: true");
  });
});
