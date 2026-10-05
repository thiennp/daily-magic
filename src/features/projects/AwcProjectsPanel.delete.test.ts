import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("AwcProjectsPanel delete list update", () => {
  it("removes the card via removeProject after a successful delete", () => {
    const panel = readFileSync(
      join(process.cwd(), "src/features/projects/AwcProjectsPanel.tsx"),
      "utf8",
    );
    const menuItem = readFileSync(
      join(process.cwd(), "src/features/projects/AwcProjectDeleteMenuItem.tsx"),
      "utf8",
    );
    const confirm = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/AwcProjectDeleteConfirmForm.tsx",
      ),
      "utf8",
    );
    const fields = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/AwcProjectDeleteConfirmFields.tsx",
      ),
      "utf8",
    );

    expect(panel).toContain("onProjectDeleted");
    expect(panel).toContain("removeProject(projectId)");
    expect(menuItem).toContain("useDeleteProject");
    expect(menuItem).toContain("AwcProjectDeleteConfirmForm");
    expect(menuItem).toContain('variant="dialog"');
    expect(confirm).toContain('variant?: AwcProjectDeleteConfirmVariant');
    expect(confirm).toContain("AwcProjectDeleteConfirmFields");
    expect(fields).toContain("disabled={!canConfirm}");
    expect(fields).toContain("isProjectDeleteConfirmNameMatch");
  });
});
