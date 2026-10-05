import { describe, expect, it, vi } from "vitest";

import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { readProjectSkillTombstone } from "@/features/project-skill-share/internal/infrastructure/history/readProjectSkillTombstone";

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

describe("readProjectSkillTombstone adapter", () => {
  it("returns null for _-prefixed skillIds without calling History", async () => {
    const read = vi.fn();
    const result = await readProjectSkillTombstone({
      port: portStub({ readProjectSkillTombstone: read }),
      projectId: "proj-1",
      skillId: "_drafts",
    });
    expect(result).toBeNull();
    expect(read).not.toHaveBeenCalled();
  });

  it("forwards to History and returns the tombstone record", async () => {
    const record = {
      skillId: "deploy",
      revokedAt: "2026-10-05T08:00:00.000Z",
      lastContentHash: "sha256:abc",
    };
    const read = vi.fn().mockResolvedValue(record);
    const result = await readProjectSkillTombstone({
      port: portStub({ readProjectSkillTombstone: read }),
      projectId: "proj-1",
      skillId: "deploy",
    });
    expect(result).toEqual(record);
    expect(read).toHaveBeenCalledWith({
      projectId: "proj-1",
      skillId: "deploy",
    });
  });
});
