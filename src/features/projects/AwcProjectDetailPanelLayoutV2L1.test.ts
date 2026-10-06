import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

describe("project layout v2 L1 shell", () => {
  it("uses EN tabs with Safety rules label, Reports/Library stubs, Activity default", () => {
    const tabs = read("src/features/projects/projectPageTabs.constant.ts");
    expect(tabs).toMatch(
      /"activity",\s*"reports",\s*"library",\s*"pitfalls",\s*"resources",\s*"settings"/,
    );
    expect(tabs).toContain('activity: "Activity"');
    expect(tabs).toContain('reports: "Reports"');
    expect(tabs).toContain('library: "Library"');
    expect(tabs).toContain('pitfalls: "Safety rules"');
    expect(tabs).toContain('resources: "Resources"');
    expect(tabs).toContain('settings: "Settings"');
    expect(tabs).toContain(
      'DEFAULT_PROJECT_PAGE_TAB: ProjectPageTabId = "activity"',
    );
    // overview remains in PROJECT_PAGE_SECTION_IDS; assert tabs only.
    const tabIdsBlock =
      tabs.match(
        /export const PROJECT_PAGE_TAB_IDS = \[[\s\S]*?\] as const/,
      )?.[0] ?? "";
    expect(tabIdsBlock).toMatch(
      /^export const PROJECT_PAGE_TAB_IDS = \[\s*"activity",\s*"reports",\s*"library",\s*"pitfalls",\s*"resources",\s*"settings",\s*\] as const$/,
    );
    expect(tabIdsBlock).not.toContain('"overview"');
    expect(tabIdsBlock).not.toContain('"team"');
    const tabLabelsBlock =
      tabs.match(/export const PROJECT_PAGE_TAB_LABELS[\s\S]*?\};/)?.[0] ?? "";
    expect(tabLabelsBlock).not.toMatch(/\boverview\b/);
  });

  it("segmented tab bar is gray track + selected surface (no underline, no blue)", () => {
    const bar = read("src/features/projects/AwcProjectDetailTabBar.tsx");
    expect(bar).toContain("bg-gray-100");
    expect(bar).toContain("rounded-xl");
    expect(bar).not.toContain("border-b-2");
    expect(bar).not.toMatch(/blue-|indigo|#0a6cf5|#4a97ff/i);
    expect(bar).toContain('role="tablist"');
  });

  it("3-col shell with flat Members rail (tone/divider, no own cards)", () => {
    const panel = read("src/features/projects/AwcProjectDetailPanel.tsx");
    const members = read("src/features/projects/AwcProjectMembersColumn.tsx");
    const copy = read(
      "src/features/projects/projectPageLayoutV2Copy.constant.ts",
    );
    expect(panel).toContain("AwcProjectMembersColumn");
    expect(panel).toMatch(/lg:grid-cols-\[minmax\(0,1fr\)_20rem\]/);
    expect(members).toContain("border-l");
    expect(members).toContain("bg-gray-50/70");
    expect(members).toContain("AwcProjectMembersOwnerContent");
    expect(members).not.toContain("AwcProjectAccessPanel");
    expect(copy).toContain('editOnThisComputer: "Edit on this computer"');
    expect(copy).toContain('membersColumnLabel: "Members"');
    expect(copy).not.toMatch(/Hoạt động|Thành viên|Sửa trên/);
  });
});
