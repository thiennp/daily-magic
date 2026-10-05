import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { pullPublishedProjectSkillsToMirror } from "@/features/project-skill-share/internal/infrastructure/orchestrators/pullPublishedProjectSkillsToMirror";

const body = "# Deploy\nsteps";
const hash = computeProjectSkillContentHash(body);
const orphanHash = "sha256:orphan";

const history = (
  overrides: Partial<ProjectSkillHistoryPort> = {},
): ProjectSkillHistoryPort => ({
  isHistoryEnabled: () => true,
  resolveProjectDataDir: () => "/p",
  writeProjectSkillVersion: () => ({ path: "", contentHash: hash }),
  readProjectSkillVersion: () => ({ body, contentHash: hash }),
  tombstoneProjectSkill: async () => ({ removed: false }),
  readProjectSkillTombstone: async () => null,
  listProjectSkillIds: async () => [],
  ...overrides,
});

describe("pullPublishedProjectSkillsToMirror orphan tombstone", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("tombstones local orphans not on AWC published set with lastContentHash", async () => {
    const tombstone = vi.fn().mockResolvedValue({ removed: true });
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: {
        history: history({
          tombstoneProjectSkill: tombstone,
          listProjectSkillIds: async () => [
            { skillId: "deploy", contentHash: hash },
            { skillId: "revoked-old", contentHash: orphanHash },
          ],
        }),
        awcPublished: {
          listPublished: async () => [
            {
              skillId: "deploy",
              publishedVersion: 1,
              contentHash: hash,
              skillRowId: "row-1",
            },
          ],
          getPublishedBody: async () => ({ body, contentHash: hash }),
        },
      },
    });
    expect(result.ok).toBe(true);
    expect(result.skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ skillId: "deploy", action: "skipped" }),
        expect.objectContaining({
          skillId: "revoked-old",
          action: "removed",
          version: 0,
        }),
      ]),
    );
    expect(tombstone).toHaveBeenCalledTimes(1);
    expect(tombstone).toHaveBeenCalledWith({
      projectId: "proj-1",
      skillId: "revoked-old",
      lastContentHash: orphanHash,
    });
  });
});
