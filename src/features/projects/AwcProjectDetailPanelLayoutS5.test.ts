import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const detailPanelSource = read("src/features/projects/AwcProjectDetailPanel.tsx");
const tabPanelsSource = read("src/features/projects/AwcProjectDetailTabPanels.tsx");
const tabBodySource = read(
  "src/features/projects/AwcProjectDetailTabPanelBody.tsx",
);
const overviewPanelSource = read(
  "src/features/projects/overview/AwcProjectOverviewPanel.tsx",
);

const pitfallsPanelSource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/projects/pitfalls/AwcProjectPitfallsPanel.tsx",
  ),
  "utf8",
);

const tabsConstantSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/projectPageTabs.constant.ts"),
  "utf8",
);

describe("AwcProjectDetailPanel layout S5 pitfalls", () => {
  it("uses Product tab order with Reports/Library stubs", () => {
    expect(tabsConstantSource).toMatch(
      /"activity",\s*"reports",\s*"library",\s*"pitfalls",\s*"resources",\s*"settings"/,
    );
    expect(tabBodySource).toMatch(
      /const STUB_TABS[\s\S]*?"reports"[\s\S]*?"library"[\s\S]*?\];/,
    );
    expect(tabBodySource).not.toMatch(
      /const STUB_TABS[\s\S]*?= \[[^\]]*"pitfalls"[^\]]*\];/,
    );
    expect(tabPanelsSource).toContain("AwcProjectDetailTabPanelBody");
    expect(tabPanelsSource).not.toContain("AwcProjectOverviewPanel");
    expect(tabsConstantSource).toContain('pitfalls: "Safety rules"');
    expect(tabsConstantSource).toContain(
      'DEFAULT_PROJECT_PAGE_TAB: ProjectPageTabId = "activity"',
    );
  });

  it("mounts the Pitfalls panel from one shared page-level load", () => {
    expect(tabBodySource).toContain("AwcProjectPitfallsPanel");
    expect(detailPanelSource).toContain("useAwcProjectPitfalls(project.id)");
    expect(detailPanelSource).toContain("pitfallsCount={pitfallsCount}");
    expect(overviewPanelSource).not.toContain("useAwcProjectPitfalls(");
    expect(pitfallsPanelSource).toContain("AwcProjectPitfallsToolbar");
    expect(pitfallsPanelSource).toContain("AwcProjectPitfallAccordionRow");
  });

  it("keeps gray-only Pitfalls chrome and no protocol jargon", () => {
    expect(pitfallsPanelSource).not.toMatch(/indigo|purple|brand-|#6366f1/i);
    expect(pitfallsPanelSource).not.toMatch(/\bHMAC\b/);
  });
});
