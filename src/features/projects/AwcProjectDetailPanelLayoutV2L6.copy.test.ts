import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as L } from "@/features/projects/library/projectPageLibraryCopy.constant";
import { PROJECT_PAGE_REPORTS_COPY as R } from "@/features/projects/reports/projectPageReportsCopy.constant";

const P = "src/features/projects";
const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

describe("project layout v2 L6 Reports + Library — Product EN copy", () => {
  it("uses Shared visibility Product EN exactly", () => {
    expect(R["reports.intro"]).toBe(
      "Finished work from this project's assistants and computers lands here.",
    );
    expect(R["reports.empty"]).toBe(
      "No reports in this project yet. Finished work from its assistants and computers shows up here.",
    );
    expect(R["reports.aria"]).toBe("Reports for this project");
    expect(L["library.intro"]).toBe(
      "Playbooks, workflows, assistants, and skills for this project.",
    );
    expect(L["library.aria"]).toBe("Library for this project");
    expect(L["library.empty.owner"]).toBe(
      "No playbooks or skills yet. Create one, or add one from another project.",
    );
    expect(L["library.empty.member"]).toBe(
      "Nothing in this project's library yet. The project owner adds items here.",
    );
    expect(L["library.readOnlyNote"]).toBe(
      "You can view this library. Only the project owner can change it.",
    );
    expect(L["library.visibilityHint"]).toBe(
      "Members and viewers see published items. Drafts are visible only to you.",
    );
    expect(A["library.publish.toast"]).toBe(
      "Published. Everyone in this project can see it now.",
    );
    expect(L["disabled.new"]).toBe("Only the project owner can add items.");
    expect(L["disabled.addFrom"]).toBe("Only the project owner can add items.");
    expect(L["disabled.edit"]).toBe("Only the project owner can edit this.");
    expect(L["disabled.publish"]).toBe("Only the project owner can publish.");
    expect(L["disabled.delete"]).toBe(
      "Only the project owner can delete this.",
    );
    const skillForm = read(`${P}/library/AwcProjectLibrarySkillForm.tsx`);
    expect(skillForm).toContain('A["library.publish.toast"]');
    expect([
      L["library.filter.all"],
      L["library.filter.playbooks"],
      L["library.filter.workflows"],
      L["library.filter.skills"],
    ]).toEqual(["All", "Playbooks", "Workflows", "Skills"]);
  });
});
