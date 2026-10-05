import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import type { ProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/projectSkillAwcPublishedSource.type";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { pullPublishedProjectSkillsToMirror } from "@/features/project-skill-share/internal/infrastructure/orchestrators/pullPublishedProjectSkillsToMirror";

const body = "# Deploy\nsteps";
const hash = computeProjectSkillContentHash(body);

const pullMirrorHistoryFixture = (
  overrides: Partial<ProjectSkillHistoryPort> = {},
): ProjectSkillHistoryPort => ({
  isHistoryEnabled: () => true,
  resolveProjectDataDir: () => "/p",
  writeProjectSkillVersion: () => ({ path: "", contentHash: hash }),
  readProjectSkillVersion: () => null,
  tombstoneProjectSkill: async () => ({ removed: false }),
  readProjectSkillTombstone: async () => null,
  listProjectSkillIds: async () => [],
  ...overrides,
});

const pullMirrorAwcFixture = (
  overrides: Partial<ProjectSkillAwcPublishedSource> = {},
): ProjectSkillAwcPublishedSource => ({
  listPublished: async () => [
    {
      skillId: "deploy",
      publishedVersion: 1,
      contentHash: hash,
      skillRowId: "row-1",
    },
  ],
  getPublishedBody: async () => ({ body, contentHash: hash }),
  ...overrides,
});

describe("pullPublishedProjectSkillsToMirror republish / failure", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("list hit still fetch_writes even when a tombstone exists", async () => {
    const write = vi.fn().mockResolvedValue({
      path: "/p/skills/deploy/v0001.md",
      contentHash: hash,
    });
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: {
        history: pullMirrorHistoryFixture({
          writeProjectSkillVersion: write,
          readProjectSkillTombstone: async () => ({
            skillId: "deploy",
            revokedAt: "2026-10-01T00:00:00.000Z",
            lastContentHash: "sha256:old",
          }),
        }),
        awcPublished: pullMirrorAwcFixture(),
      },
    });
    expect(result).toMatchObject({
      ok: true,
      skills: [{ action: "mirrored" }],
    });
    expect(write).toHaveBeenCalled();
  });

  it("logs and continues on per-skill failure (never throws)", async () => {
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: {
        history: pullMirrorHistoryFixture({
          writeProjectSkillVersion: () => {
            throw new Error("disk full");
          },
        }),
        awcPublished: pullMirrorAwcFixture(),
      },
    });
    expect(result.ok).toBe(false);
    expect(result.skills[0]?.action).toBe("unavailable");
  });
});
