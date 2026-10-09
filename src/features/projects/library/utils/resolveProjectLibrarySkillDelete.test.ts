import { describe, expect, it } from "vitest";

import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";
import { resolveProjectLibrarySkillDelete } from "@/features/projects/library/utils/resolveProjectLibrarySkillDelete";

const skill = (
  overrides: Partial<ProjectSkillView> = {},
): ProjectSkillView => ({
  skillId: "s1",
  kind: "skill",
  name: "Test",
  description: null,
  state: "draft",
  publishedVersion: null,
  latestVersion: 1,
  contentHash: null,
  updatedAt: "2026-01-01T00:00:00.000Z",
  isPublisher: true,
  canPublish: true,
  canRevoke: true,
  latestAuthorName: null,
  ...overrides,
});

describe("resolveProjectLibrarySkillDelete", () => {
  it("hides delete for workflows and missing skill rows", () => {
    expect(resolveProjectLibrarySkillDelete(undefined, null)).toEqual({
      show: false,
      canDelete: false,
      isDraft: false,
    });
    expect(resolveProjectLibrarySkillDelete(skill(), null)).toEqual({
      show: false,
      canDelete: false,
      isDraft: false,
    });
  });

  it("owner can delete published; blocked when canRevoke is false", () => {
    expect(
      resolveProjectLibrarySkillDelete(
        skill({ state: "published", canRevoke: true }),
        "s1",
      ),
    ).toEqual({ show: true, canDelete: true, isDraft: false });
    expect(
      resolveProjectLibrarySkillDelete(
        skill({ state: "published", canRevoke: false }),
        "s1",
      ),
    ).toEqual({ show: true, canDelete: false, isDraft: false });
  });

  it("member can delete draft when canRevoke is true", () => {
    expect(
      resolveProjectLibrarySkillDelete(
        skill({ state: "draft", canRevoke: true }),
        "s1",
      ),
    ).toEqual({ show: true, canDelete: true, isDraft: true });
  });
});
