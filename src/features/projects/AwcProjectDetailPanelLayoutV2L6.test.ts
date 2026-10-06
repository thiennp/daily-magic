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
  it("replaces the Reports/Library stubs with full panels; tabs stay", () => {
    const body = read(`${P}/AwcProjectDetailTabPanelBody.tsx`);
    const tabs = read(`${P}/projectPageTabs.constant.ts`);
    expect(body).not.toContain("STUB_TABS");
    expect(body).not.toContain("AwcProjectTabStub");
    expect(body).toContain("<AwcProjectReportsPanel projectId={project.id} />");
    expect(body).toContain("<AwcProjectLibraryPanel");
    expect(body).toContain('canEdit={pageActorRole !== "viewer"}');
    expect(tabs).toMatch(
      /"activity",\s*"reports",\s*"library",\s*"pitfalls",\s*"resources",\s*"settings"/,
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

  it("scopes data to this project via existing report / library / skills APIs", () => {
    const reports = read(`${P}/reports/useAwcProjectReports.ts`);
    const library = read(`${P}/library/useAwcProjectLibrary.ts`);
    const addFrom = read(`${P}/library/AwcProjectLibraryAddFrom.tsx`);
    expect(reports).toContain("useAgentRunsList");
    expect(reports).toContain("run.projectId === projectId");
    expect(library).toContain("useLibraryCapabilities");
    expect(library).toContain("useProjectSkills(projectId)");
    expect(addFrom).toContain("forkCapabilityToLibrary(itemId, project.id)");
  });

  it("ships no remove / delete / unpublish / New report controls (open Qs)", () => {
    for (const source of [
      ...panelSources("reports"),
      ...panelSources("library"),
    ]) {
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

  it("keeps Resources Shared skills mounted (Resources drop deferred, Q11)", () => {
    const resources = read(`${P}/resources/AwcProjectResourcesPanel.tsx`);
    expect(resources).toContain(
      "<ProjectSkillsSection projectId={project.id} />",
    );
  });
});
