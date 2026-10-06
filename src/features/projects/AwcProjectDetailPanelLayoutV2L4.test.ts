import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const PIT = "src/features/projects/pitfalls";
const RES = "src/features/projects/resources";

describe("project layout v2 L4 Safety rules + Resources", () => {
  it("Safety rules chrome: All/Important/Warning chips, search, empty, note link", () => {
    const copy = read(`${PIT}/awcProjectPitfallsCopy.constant.ts`);
    const toolbar = read(`${PIT}/AwcProjectPitfallsToolbar.tsx`);
    const panel = read(`${PIT}/AwcProjectPitfallsPanel.tsx`);
    const accordion = read(`${PIT}/AwcProjectPitfallAccordionRow.tsx`);
    expect(copy).toContain('filterAll: "All"');
    expect(copy).toContain('block: "Important"');
    expect(copy).toContain('warn: "Warning"');
    expect(copy).toContain('searchPlaceholder: "Search, for example push or build"');
    expect(copy).toContain('noMatch: "No rules match."');
    expect(copy).toContain(
      'manageOnThisComputer: "Turn on, off, or edit on this computer"',
    );
    expect(copy).toContain('avoidSituationPrefix: "Avoid this situation:"');
    expect(copy).toContain('howToLabel: "How to do it:"');
    expect(toolbar).toContain('"all"');
    expect(toolbar).toContain('"block"');
    expect(toolbar).toContain('"warn"');
    expect(toolbar).not.toMatch(/CHIP_ORDER[\s\S]*"info"/);
    expect(panel).toContain("AwcProjectPitfallsToolbar");
    expect(panel).toContain("AwcProjectPitfallsManageButton");
    expect(panel).toContain("C.noMatch");
    expect(accordion).toContain("C.avoidSituationPrefix");
    expect(accordion).toContain("row.situation");
    expect(accordion).toContain("C.howToLabel");
    for (const file of [toolbar, panel, accordion]) {
      expect(file).not.toMatch(/blue-|indigo-|#0a6cf5|#4a97ff|#e5effe|#0d2749/i);
    }
  });

  it("Resources sections: PWA + Folders + Git + Shared skills (single column)", () => {
    const panel = read(`${RES}/AwcProjectResourcesPanel.tsx`);
    const composition = read(
      `${RES}/AwcProjectResourcesCompositionSection.tsx`,
    );
    const copy = read(`${RES}/projectPageResourcesCopy.constant.ts`);
    const body = read("src/features/projects/AwcProjectDetailTabPanelBody.tsx");
    expect(panel).toContain("AwcProjectResourcesCompositionSection");
    expect(panel).toContain("AwcProjectResourcesFoldersCard");
    expect(panel).toContain("AwcProjectRepoUrlsSection");
    expect(panel).toContain("ProjectSkillsSection");
    expect(panel).toContain('className="flex min-w-0 flex-col gap-6"');
    expect(composition).toContain("useAwcProjectComposition");
    expect(composition).toContain("C.pwaAttach");
    expect(copy).toContain('pwaHeading: "Playbooks, Workflows, Agents"');
    expect(copy).toContain('foldersTitle: "Folders on this computer"');
    expect(copy).toContain('gitTitle: "Git remotes (optional)"');
    expect(copy).toContain('skillsHeading: "Shared skills"');
    expect(body).toContain("AwcProjectResourcesPanel");
    expect(body).toMatch(/STUB_TABS[\s\S]*"reports"[\s\S]*"library"/);
    expect(panel).not.toMatch(/blue-|indigo-|#0a6cf5|#4a97ff/i);
    expect(composition).not.toMatch(/blue-|indigo-|#0a6cf5|#4a97ff/i);
  });

  it("keeps Reports/Library stubs; does not mount L3 Activity chrome or L5 Settings content rewrite", () => {
    const body = read("src/features/projects/AwcProjectDetailTabPanelBody.tsx");
    expect(body).toContain("AwcProjectTabStub");
    expect(body).toContain("AwcProjectDetailSettingsPanel");
    expect(body).not.toContain("AwcProjectActivity");
    expect(body).not.toMatch(/0fd0078b|layout-v2-l3/i);
  });
});
