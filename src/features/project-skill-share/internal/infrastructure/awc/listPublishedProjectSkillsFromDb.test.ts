import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { listPublishedProjectSkillsFromDb } from "@/features/project-skill-share/internal/infrastructure/awc/listPublishedProjectSkillsFromDb";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows",
  () => ({ selectProjectSkillRows: vi.fn() }),
);

const record = (
  overrides: Partial<ProjectSkillRecord> = {},
): ProjectSkillRecord => ({
  rowId: "row-1",
  projectId: "proj-1",
  skillId: "deploy",
  kind: "skill",
  name: "Deploy",
  description: null,
  publisherUserId: "u1",
  state: "published",
  publishedVersion: 2,
  latestVersion: 2,
  contentHash: "sha256:abc",
  createdAt: "2026-10-05T00:00:00Z",
  updatedAt: "2026-10-05T00:00:00Z",
  revokedAt: null,
  ...overrides,
});

describe("listPublishedProjectSkillsFromDb", () => {
  beforeEach(() => {
    vi.mocked(selectProjectSkillRows).mockReset();
  });

  it("DB error throws (never [])", async () => {
    vi.mocked(selectProjectSkillRows).mockRejectedValue(new Error("neon down"));
    await expect(listPublishedProjectSkillsFromDb("proj-1")).rejects.toThrow(
      "neon down",
    );
  });

  it("published row missing version/hash throws instead of being dropped", async () => {
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      record({ contentHash: null }),
    ]);
    await expect(listPublishedProjectSkillsFromDb("proj-1")).rejects.toThrow(
      /missing version\/contentHash/,
    );
  });

  it("real empty set resolves [] with strict select", async () => {
    vi.mocked(selectProjectSkillRows).mockResolvedValue([]);
    await expect(listPublishedProjectSkillsFromDb("proj-1")).resolves.toEqual(
      [],
    );
    expect(selectProjectSkillRows).toHaveBeenCalledWith({
      projectId: "proj-1",
      states: ["published"],
      strict: true,
    });
  });

  it("maps published rows", async () => {
    vi.mocked(selectProjectSkillRows).mockResolvedValue([record()]);
    await expect(listPublishedProjectSkillsFromDb("proj-1")).resolves.toEqual([
      {
        skillId: "deploy",
        kind: "skill",
        publishedVersion: 2,
        contentHash: "sha256:abc",
        skillRowId: "row-1",
      },
    ]);
  });
});
