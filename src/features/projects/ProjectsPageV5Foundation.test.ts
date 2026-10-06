import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as V5 from "@/features/projects/projectsPageV5Classes.constant";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

/** Projects list page chrome (PP-1). Create form / My bots restyle in PP-6 / PP-7. */
const PAGE_CHROME_FILES = [
  "src/features/pages/layouts/ProjectsPageLayout.tsx",
  "src/features/projects/AwcProjectsPanel.tsx",
  "src/features/projects/AwcProjectsToolbar.tsx",
  "src/features/projects/AwcProjectsListBody.tsx",
  "src/features/projects/AwcProjectsListLoadErrorPanel.tsx",
  "src/features/projects/AwcProjectCard.tsx",
  "src/features/projects/AwcProjectCardActionsMenu.tsx",
  "src/features/projects/AwcProjectCardActionsMenuItems.tsx",
  "src/features/projects/AwcProjectsMenuDisabledItem.tsx",
  "src/features/projects/AwcProjectDeleteMenuItem.tsx",
  "src/features/projects/AwcProjectPresenceBadge.tsx",
  "src/features/projects/navConsolidation/AwcProjectsIntentNotice.tsx",
  "src/features/projects/projectsPageV5Classes.constant.ts",
];

/** Light-mode cool-slate border / ring / divide utilities (`dark:` variants are allowed). */
const coolSlateBorderClasses = (source: string): string[] =>
  source
    .split(/[\s"'`{}]+/)
    .filter((token) => !token.startsWith("dark:"))
    .filter((token) =>
      /^(?:[a-z-]+:)*(?:border|divide|ring|outline)(?:-[trblxy])?-(?:gray|slate|zinc)-\d/.test(token),
    );

describe("Projects page PP-1 foundation", () => {
  it("(1) page chrome has no cool-slate border utilities", () => {
    for (const file of PAGE_CHROME_FILES) {
      expect(coolSlateBorderClasses(read(file)), file).toEqual([]);
    }
    expect(read("src/features/projects/AwcProjectCardActionsMenu.tsx")).toContain(
      "panelBaseClassName={PROJECTS_V5_MENU_PANEL_CLASS}",
    );
    expect(V5.PROJECTS_V5_CARD_CLASS).toContain("border-awc-border");
    expect(V5.PROJECTS_V5_CARD_CLASS).toContain("rounded-awc-card");
  });

  it("(2) no Google Fonts; page uses self-hosted Plex var", () => {
    for (const file of PAGE_CHROME_FILES) {
      expect(read(file), file).not.toMatch(/fonts\.googleapis|fonts\.gstatic|next\/font\/google/);
    }
    expect(V5.PROJECTS_V5_PAGE_CLASS).toContain("var(--font-awc-sans)");
    expect(read("src/lib/theme/awcFonts.ts")).toContain('from "next/font/local"');
    expect(read("src/features/pages/layouts/ProjectsPageLayout.tsx")).toContain(
      "PROJECTS_V5_PAGE_CLASS",
    );
  });

  it("(3) ships no Dev corner in the Projects tree", () => {
    const files = [
      ...PAGE_CHROME_FILES,
      "src/features/projects/storybook/ProjectsStorybookFoundationStories.tsx",
    ];
    for (const file of files) {
      expect(read(file), file).not.toMatch(/Dev corner|Not part of the product|dv-list|dv-comp/);
    }
  });

  it("(4) disabled menu rows use V5 disabled tokens + (i) reason slot", () => {
    expect(V5.PROJECTS_V5_MENU_ITEM_DISABLED_CLASS).toMatch(/(^|\s)awc-disabled(\s|$)/);
    expect(V5.PROJECTS_V5_MENU_ITEM_DISABLED_CLASS).toContain("cursor-not-allowed");
    expect(V5.PROJECTS_V5_MENU_REASON_CLASS).toContain("group-hover:opacity-100");
    expect(V5.PROJECTS_V5_MENU_REASON_CLASS).toContain("group-focus-within:opacity-100");
    expect(read("src/app/globals.css")).toMatch(
      /\.awc-disabled\[aria-disabled="true"\][\s\S]*?var\(--awc-disabled-bg\)[\s\S]*?dashed var\(--awc-disabled-border\)/,
    );
    const items = read("src/features/projects/AwcProjectCardActionsMenuItems.tsx");
    expect(items).toContain("<AwcProjectsMenuDisabledItem");
    expect(items).toContain("reason={editCta.helperText}");
    expect(items).not.toMatch(/\n\s+disabled\n/);
  });

  it("(5) Default chip is neutral tonal, not solid blue-600", () => {
    expect(V5.PROJECTS_V5_DEFAULT_CHIP_CLASS).toContain("bg-awc-tile-2");
    expect(V5.PROJECTS_V5_DEFAULT_CHIP_CLASS).toContain("text-awc-fg-muted");
    expect(V5.PROJECTS_V5_DEFAULT_CHIP_CLASS).not.toMatch(/bg-(awc-blue|brand|blue)-600/);
    expect(read("src/features/projects/AwcProjectCard.tsx")).toContain(
      "PROJECTS_V5_DEFAULT_CHIP_CLASS",
    );
  });
});
