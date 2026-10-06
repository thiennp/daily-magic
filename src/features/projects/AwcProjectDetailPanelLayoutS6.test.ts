import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const tabPanelsSource = read(
  "src/features/projects/AwcProjectDetailTabPanels.tsx",
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
    expect(tabPanelsSource).toContain("AwcProjectResourcesPanel");
    expect(tabPanelsSource).toMatch(
      /const STUB_TABS[\s\S]*?"reports"[\s\S]*?"library"[\s\S]*?\];/,
    );
    expect(tabPanelsSource).not.toMatch(
      /const STUB_TABS[\s\S]*?= \[[^\]]*"resources"[^\]]*\];/,
    );
  });

  it("Resources is Folders + Git only (no shared skills list)", () => {
    expect(resourcesPanelSource).toContain("AwcProjectResourcesFoldersCard");
    expect(resourcesFoldersCardSource).toContain("AwcProjectAccessFolderRefs");
    expect(resourcesPanelSource).toContain("AwcProjectRepoUrlsSection");
    expect(resourcesPanelSource).not.toMatch(
      /ProjectSkillsSection|skill-share|Skills/,
    );
    expect(resourcesFoldersCardSource).not.toMatch(
      /ProjectSkillsSection|skill-share|Skills/,
    );
    expect(resourcesCopySource).toContain("Folders on computers");
    expect(resourcesCopySource).toContain("Git remotes");
  });

  it("keeps gray-only Resources chrome and computer wording", () => {
    expect(resourcesPanelSource).not.toMatch(/indigo|purple|brand-|#6366f1/i);
    expect(resourcesFoldersCardSource).not.toMatch(
      /indigo|purple|brand-|#6366f1/i,
    );
    expect(resourcesCopySource).toMatch(/computer/i);
    expect(resourcesCopySource).not.toMatch(/\bdevice\b|\bAWL\b|\bagent\b/i);
  });
});
