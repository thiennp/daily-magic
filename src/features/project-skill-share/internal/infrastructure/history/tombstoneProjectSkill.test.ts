import { describe, expect, it, vi } from "vitest";

import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { tombstoneProjectSkill } from "@/features/project-skill-share/internal/infrastructure/history/tombstoneProjectSkill";

const portStub = (
  overrides: Partial<ProjectSkillHistoryPort> = {},
): ProjectSkillHistoryPort => ({
  isHistoryEnabled: () => true,
  resolveProjectDataDir: () => "/p",
  writeProjectSkillVersion: () => ({ path: "", contentHash: "" }),
  readProjectSkillVersion: () => null,
  tombstoneProjectSkill: async () => ({ removed: false }),
  readProjectSkillTombstone: async () => null,
  listProjectSkillIds: async () => [],
  ...overrides,
});

describe("tombstoneProjectSkill adapter", () => {
  it("rejects _-prefixed skillIds before calling History", async () => {
    const tombstone = vi.fn();
    await expect(
      tombstoneProjectSkill({
        port: portStub({ tombstoneProjectSkill: tombstone }),
        projectId: "proj-1",
        skillId: "_drafts",
        lastContentHash: "sha256:abc",
      }),
    ).rejects.toThrow("invalid_project_skill_id");
    expect(tombstone).not.toHaveBeenCalled();
  });

  it("forwards lastContentHash and optional revokedAt to History", async () => {
    const tombstone = vi.fn().mockResolvedValue({ removed: true });
    const result = await tombstoneProjectSkill({
      port: portStub({ tombstoneProjectSkill: tombstone }),
      projectId: "proj-1",
      skillId: "deploy",
      lastContentHash: "sha256:abc",
      revokedAt: "2026-10-05T08:00:00.000Z",
    });
    expect(result).toEqual({ removed: true });
    expect(tombstone).toHaveBeenCalledWith({
      projectId: "proj-1",
      skillId: "deploy",
      lastContentHash: "sha256:abc",
      revokedAt: "2026-10-05T08:00:00.000Z",
    });
  });
});
