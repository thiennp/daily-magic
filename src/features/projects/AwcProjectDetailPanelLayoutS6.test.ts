import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const tabPanelsSource = read(
  "src/features/projects/AwcProjectDetailTabPanels.tsx",
);
const tabBodySource = read(
  "src/features/projects/AwcProjectDetailTabPanelBody.tsx",
);
const resourcesPanelSource = read(
  "src/features/projects/resources/AwcProjectResourcesPanel.tsx",
);
const resourcesFoldersCardSource = read(
  "src/features/projects/resources/AwcProjectResourcesFoldersCard.tsx",
);
const resourcesCopySource = read(
  "src/features/projects/resources/projectPageResourcesCopy.constant.ts",
);
const tabsConstantSource = read(
  "src/features/projects/projectPageTabs.constant.ts",
);

describe("AwcProjectDetailPanel layout S6 resources", () => {
  it("mounts Resources panel and drops it from STUB_TABS", () => {
    expect(tabsConstantSource).toMatch(
      /"activity",\s*"reports",\s*"library",\s*"pitfalls",\s*"resources",\s*"settings"/,
    );
    expect(tabBodySource).toContain("AwcProjectResourcesPanel");
    expect(tabBodySource).not.toContain("STUB_TABS");
    expect(tabPanelsSource).toContain("AwcProjectDetailTabPanelBody");
  });

  it("Resources is single-column PWA + Folders + Git + Shared skills", () => {
    expect(resourcesPanelSource).toContain(
      "AwcProjectResourcesCompositionSection",
    );
    expect(resourcesPanelSource).toContain("AwcProjectResourcesFoldersCard");
    expect(resourcesFoldersCardSource).toContain("AwcProjectAccessFolderRefs");
    expect(resourcesPanelSource).toContain("AwcProjectRepoUrlsSection");
    expect(resourcesPanelSource).toContain("ProjectSkillsSection");
    expect(resourcesPanelSource).not.toContain("OVERVIEW_GRID2_CLASS");
    expect(resourcesCopySource).toContain("Folders on this computer");
    expect(resourcesCopySource).toContain("Git remotes (optional)");
    expect(resourcesCopySource).toContain("Attach on this computer");
    expect(resourcesCopySource).toContain("Shared skills");
  });

  it("keeps gray-only Resources chrome and computer wording", () => {
    expect(resourcesPanelSource).not.toMatch(/indigo|purple|brand-|#6366f1/i);
    expect(resourcesFoldersCardSource).not.toMatch(
      /indigo|purple|brand-|#6366f1/i,
    );
    expect(resourcesCopySource).toMatch(/computer/i);
    expect(resourcesCopySource).not.toMatch(/\bMac\b|\bdevice\b|\bAWL\b/i);
  });
});
