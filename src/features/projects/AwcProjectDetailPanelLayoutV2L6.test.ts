import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const P = "src/features/projects";
const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");
const panelSources = (dir: string): readonly string[] =>
  readdirSync(path.join(process.cwd(), P, dir))
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => read(`${P}/${dir}/${name}`));

describe("project layout v2 L6 Reports + Library", () => {
  it("wires full panels; canEdit is owner-only", () => {
    const body = read(`${P}/AwcProjectDetailTabPanelBody.tsx`);
    const tabs = read(`${P}/projectPageTabs.constant.ts`);
    expect(body).not.toContain("STUB_TABS");
    expect(body).not.toContain("AwcProjectTabStub");
    expect(body).toContain("AwcProjectReportsPanel");
    expect(body).toContain("<AwcProjectLibraryPanel");
    expect(body).toContain('canEdit={p.pageActorRole === "owner"}');
    expect(tabs).toMatch(
      /"overview",\s*"tasks",\s*"reports",\s*"library",\s*"pitfalls",\s*"resources",\s*"settings"/,
    );
  });

  it("wires hash deep links: #reports?report= and #library?item=", () => {
    const reports = read(`${P}/reports/AwcProjectReportsPanel.tsx`);
    const library = read(`${P}/library/AwcProjectLibraryPanel.tsx`);
    const tabHook = read(`${P}/hooks/useAwcProjectDetailTab.ts`);
    expect(reports).toMatch(
      /useAwcProjectHashDeepLink\(\s*"reports",\s*"report",?\s*\)/,
    );
    expect(library).toMatch(
      /useAwcProjectHashDeepLink\(\s*"library",\s*"item",?\s*\)/,
    );
    expect(tabHook).toContain("parseProjectPageHash(window.location.hash)");
  });

  it("scopes data via project library/reports APIs + skills", () => {
    const reports = read(`${P}/reports/useAwcProjectReports.ts`);
    const library = read(`${P}/library/useAwcProjectLibrary.ts`);
    const addFrom = read(`${P}/library/AwcProjectLibraryAddFrom.tsx`);
    expect(reports).toContain("/reports");
    expect(reports).toContain("encodeURIComponent(projectId)");
    expect(library).toContain("/library");
    expect(library).toContain("useProjectSkills(projectId)");
    expect(addFrom).toContain("forkCapabilityToLibrary(itemId, project.id)");
    expect(addFrom).toContain("useLibraryCapabilities");
  });

  it("shows disabled New/Add with owner-only reason for non-owners", () => {
    const disabled = read(`${P}/library/AwcProjectLibraryDisabledActions.tsx`);
    expect(disabled).toContain("aria-describedby");
    expect(disabled).toContain('C["disabled.new"]');
    expect(disabled).toContain('A["library.new"]');
    expect(disabled).toContain('A["library.add_from"]');
    expect(disabled).toContain("disabled");
  });

  it("ships no remove / delete / unpublish / New report controls on Reports (open Qs)", () => {
    for (const source of panelSources("reports")) {
      expect(source).not.toMatch(
        /\b(Remove|Delete|Unpublish|Revoke|Discard)\b/,
      );
      expect(source).not.toMatch(/deleteAgentRunHistory|skills\.revoke/);
      expect(source).not.toContain('R["reports.new"]');
      expect(source).not.toMatch(
        /blue-|indigo-|purple-|emerald-|amber-|#0a6cf5/i,
      );
    }
  });

  it("Library detail revokes skills via shared skills hook", () => {
    const detailActions = read(
      `${P}/library/AwcProjectLibraryDetailActions.tsx`,
    );
    expect(detailActions).toContain('A["library.delete"]');
    expect(detailActions).toContain("library.skills.revoke");
  });

  it("keeps Resources Shared skills mounted; mutate owner-only", () => {
    const resources = read(`${P}/resources/AwcProjectResourcesPanel.tsx`);
    expect(resources).toContain("ProjectSkillsSection");
    expect(resources).toContain('canEdit={pageActorRole === "owner"}');
  });
});
