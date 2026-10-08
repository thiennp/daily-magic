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

    expect(listBody).toContain("AwcProjectsListLoadErrorPanel");
    expect(listBody).toContain("AwcProjectCard");
    expect(listBody).toContain("grid grid-cols-1 gap-3 sm:grid-cols-2");
    expect(card).toContain("AwcProjectCardActionsMenu");
    expect(card).toContain("PROJECTS_V5_CARD_CLASS");
    expect(card).toContain("shouldShowProjectEditOnMacHelperText");
    expect(menu).toContain("`Actions for ${projectName}`");
    expect(menu).toContain("buildNavConsolidationNewTaskHref");
    expect(menu).toContain("projectId");
    expect(menu).not.toContain("buildAgentComposerHref");
    expect(menu).not.toContain("customTask");
    expect(menu).toContain("toggleRef={toggleRef}");
    expect(menuItems).toContain("View details");
    expect(menuItems).toContain("Assign tasks");
    expect(menuItems).toContain("Edit");
    expect(card).toContain("pointer-events-auto");
    expect(menuItems).toContain("AwcProjectDeleteMenuItem");
    expect(menuItems).toContain("{canDelete ? (");
    expect(menuItems).toContain("canLeave && !isDefaultProject");
    expect(menuItems).toContain("isDefaultProject");
    expect(card).toContain("canDelete={canDelete}");
    expect(card).toContain("useCanDeleteOwnedProject");
    expect(menuItems).not.toContain("localTokenHash");
    expect(
      readSource("src/features/projects/utils/requestDeleteUserProject.ts"),
    ).toContain('method: "DELETE"');
    expect(
      readSource("src/features/projects/utils/requestDeleteUserProject.ts"),
    ).toContain("/api/projects/");
    expect(
      readSource("src/features/projects/hooks/useDeleteProject.ts"),
    ).toContain("requestDeleteUserProject");
    expect(readSource("src/components/ui/dropdown/Dropdown.tsx")).toContain(
      "createPortal",
    );
    expect(readSource("src/components/ui/dropdown/Dropdown.tsx")).toContain(
      "useDropdownMenuKeyboard",
    );
  });
});
