import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { pullPublishedProjectSkillsToMirror } from "@/features/project-skill-share/internal/infrastructure/orchestrators/pullPublishedProjectSkillsToMirror";

const historySpies = (): {
  readonly port: ProjectSkillHistoryPort;
  readonly write: ReturnType<typeof vi.fn>;
  readonly read: ReturnType<typeof vi.fn>;
  readonly tombstone: ReturnType<typeof vi.fn>;
  readonly listLocal: ReturnType<typeof vi.fn>;
} => {
  const write = vi.fn();
  const read = vi.fn();
  const tombstone = vi.fn();
  const listLocal = vi.fn();
  return {
    write,
    read,
    tombstone,
    listLocal,
    port: {
      isHistoryEnabled: () => true,
      resolveProjectDataDir: () => "/p",
      writeProjectSkillVersion: write,
      readProjectSkillVersion: read,
      tombstoneProjectSkill: tombstone,
      readProjectSkillTombstone: async () => null,
      listProjectSkillIds: listLocal,
    },
  };
};

describe("pullPublishedProjectSkillsToMirror list failure", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("listPublished throw → early return, zero History disk helper calls", async () => {
    const spies = historySpies();
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: {
        history: spies.port,
        awcPublished: {
          listPublished: async () => {
            throw new Error("awc down");
          },
          getPublishedBody: async () => null,
        },
      },
    });
    expect(result).toEqual({ ok: false, skipped: false, skills: [] });
    expect(spies.write).not.toHaveBeenCalled();
    expect(spies.read).not.toHaveBeenCalled();
    expect(spies.tombstone).not.toHaveBeenCalled();
    expect(spies.listLocal).not.toHaveBeenCalled();
  });
});
