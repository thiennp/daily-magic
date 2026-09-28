import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string): string =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("Awc projects card view", () => {
  it("uses a responsive card grid and project actions menu", () => {
    const listBody = readSource(
      "src/features/projects/AwcProjectsListBody.tsx",
    );
    const card = readSource("src/features/projects/AwcProjectCard.tsx");
    const menu = readSource(
      "src/features/projects/AwcProjectCardActionsMenu.tsx",
    );
    const menuItems = readSource(
      "src/features/projects/AwcProjectCardActionsMenuItems.tsx",
    );

    expect(listBody).toContain("AwcProjectCard");
    expect(listBody).toContain("grid grid-cols-1 gap-3 sm:grid-cols-2");
    expect(card).toContain("AwcProjectCardActionsMenu");
    expect(card).toContain("APP_SURFACE_NESTED_CARD_CLASS");
    expect(card).toContain("shouldShowProjectEditOnMacHelperText");
    expect(menu).toContain('aria-label="Project actions"');
    expect(menu).toContain("buildAgentComposerHref");
    expect(menu).toContain("customTask: true");
    expect(menu).toContain("projectId");
    expect(menu).toContain("toggleRef={toggleRef}");
    expect(menuItems).toContain("View details");
    expect(menuItems).toContain("Assign tasks");
    expect(menuItems).toContain("Edit");
  });
});
