import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_SKILLS_COPY as C } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";

const root = "src/features/project-skill-share/internal/presentation";
const read = (name: string): string =>
  readFileSync(path.join(process.cwd(), root, name), "utf8");

describe("ProjectSkillsSection owner-only mutate UI", () => {
  it("uses Product EN disabled reasons exactly", () => {
    expect(C.disabledAdd).toBe("Only the project owner can add items.");
    expect(C.disabledEdit).toBe("Only the project owner can edit this.");
    expect(C.disabledPublish).toBe("Only the project owner can publish.");
    expect(C.disabledDelete).toBe("Only the project owner can delete this.");
  });

  it("disables form + row mutate with aria-describedby for non-owners", () => {
    const form = read("ProjectSkillPublishForm.tsx");
    const ownerOnly = read("ProjectSkillOwnerOnlyActions.tsx");
    const rowActions = read("ProjectSkillRowActions.tsx");
    const section = read("ProjectSkillsSection.tsx");
    expect(form).toContain("canEdit");
    expect(form).toContain("ProjectSkillOwnerOnlyActions");
    expect(ownerOnly).toContain("aria-describedby");
    expect(ownerOnly).toContain("disabledAdd");
    expect(ownerOnly).toContain("{copy.publish}");
    expect(ownerOnly).toContain("{copy.saveDraft}");
    expect(rowActions).toContain("aria-describedby");
    expect(rowActions).toContain("disabledPublish");
    expect(rowActions).toContain("disabledDelete");
    expect(section).toContain("canEdit");
  });

  it("owner Publish draft is not publisher-only (member-created drafts)", () => {
    const row = read("ProjectSkillRow.tsx");
    expect(row).toContain("skill.latestVersion !== skill.publishedVersion");
    expect(row).not.toContain("skill.isPublisher &&");
  });
});
