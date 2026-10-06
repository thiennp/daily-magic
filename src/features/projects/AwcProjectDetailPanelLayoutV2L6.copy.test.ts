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
  it("uses Product EN exactly (locked strings)", () => {
    expect(R["reports.intro"]).toBe(
      "Finished work from assistants and this computer lands here.",
    );
    expect(R["reports.empty"]).toBe(
      "You don't have any reports in this project yet. Finished work from your assistants and this computer shows up here.",
    );
    expect(R["reports.aria"]).toBe("Your reports for this project");
    expect(L["library.intro"]).toBe(
      "Your playbooks and workflows, plus this project's skills.",
    );
    expect(L["library.aria"]).toBe("Your library for this project");
    expect(L["library.empty"]).toBe(
      "Nothing here for you yet. Create a skill, or add one from another project.",
    );
    expect(A["library.share.note"]).toBe(
      "Members see published skills. Drafts are visible only to you and the owner.",
    );
    expect(A["library.publish.toast"]).toBe(
      "Published. Members can use this now.",
    );
    const skillForm = read(`${P}/library/AwcProjectLibrarySkillForm.tsx`);
    expect(skillForm).toContain('A["library.publish.toast"]');
    expect(skillForm).not.toContain(
      'asDraft ? A["library.save_draft.toast"] : A["library.new.toast.skill"]',
    );
    expect(A["library.new"]).toBe("New");
    expect(A["library.add_from"]).toBe("Add from another project");
    expect(A["library.add_from.toast"]).toBe("Copy added to {project}.");
    expect(A["library.skills.heading"]).toBe("Shared skills");
    expect([
      L["library.filter.all"],
      L["library.filter.playbooks"],
      L["library.filter.workflows"],
      L["library.filter.skills"],
    ]).toEqual(["All", "Playbooks", "Workflows", "Skills"]);
    expect([L["library.state.draft"], L["library.state.published"]]).toEqual([
      "Draft",
      "Published",
    ]);
    const total =
      Object.keys(R).length + Object.keys(L).length + Object.keys(A).length;
    expect(total).toBe(108);
  });
});
