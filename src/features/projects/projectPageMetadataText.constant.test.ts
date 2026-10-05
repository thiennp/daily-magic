import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("PROJECT_PAGE_METADATA_TEXT_CLASS", () => {
  it("pairs AA-safe light and dark gray tokens", () => {
    expect(PROJECT_PAGE_METADATA_TEXT_CLASS).toBe(
      "text-gray-500 dark:text-gray-400",
    );
  });

  it("is applied to project-page metadata nodes that used bare gray-400", () => {
    const files = [
      "src/features/projects/access/AwcProjectAccessMemberRow.tsx",
      "src/features/project-skill-share/internal/presentation/ProjectSkillRow.tsx",
      "src/features/project-skill-share/internal/presentation/ProjectSkillPublishForm.tsx",
      "src/features/project-skill-share/internal/presentation/ProjectSkillsSection.tsx",
      "src/features/projects/access/inbox/AwcProjectInboxSection.tsx",
    ];
    for (const file of files) {
      const source = readSrc(file);
      expect(source).toContain("PROJECT_PAGE_METADATA_TEXT_CLASS");
      expect(source).not.toMatch(/(?<!dark:)text-gray-400\b/);
    }
  });
});
