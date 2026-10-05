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

describe("pullPublishedProjectSkillsToMirror list coerce guard", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it.each([
    ["HTTP 403", () => Promise.reject(new Error("HTTP 403"))],
    ["HTTP 503", () => Promise.reject(new Error("HTTP 503"))],
    ["network failure", () => Promise.reject(new TypeError("fetch failed"))],
    ["empty-error body (null)", () => Promise.resolve(null)],
    ["undefined", () => Promise.resolve(undefined)],
  ])(
    "list error (%s) never becomes [] → ok:false, zero History disk calls",
    async (_label, listPublished) => {
      const spies = historySpies();
      const result = await pullPublishedProjectSkillsToMirror({
        projectId: "proj-1",
        deps: {
          history: spies.port,
          awcPublished: {
            listPublished: listPublished as never,
            getPublishedBody: async () => null,
          },
        },
      });
      expect(result).toEqual({ ok: false, skipped: false, skills: [] });
      expect(spies.write).not.toHaveBeenCalled();
      expect(spies.read).not.toHaveBeenCalled();
      expect(spies.tombstone).not.toHaveBeenCalled();
      expect(spies.listLocal).not.toHaveBeenCalled();
    },
  );

  it("real empty published [] is a success (no throw) and may tombstone locals", async () => {
    const spies = historySpies();
    spies.listLocal.mockResolvedValue([
      { skillId: "gone", contentHash: "sha256:gone" },
    ]);
    spies.tombstone.mockResolvedValue({ removed: true });
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: {
        history: spies.port,
        awcPublished: {
          listPublished: async () => [],
          getPublishedBody: async () => null,
        },
      },
    });
    expect(result.ok).toBe(true);
    expect(spies.listLocal).toHaveBeenCalledTimes(1);
    expect(spies.tombstone).toHaveBeenCalledWith({
      projectId: "proj-1",
      skillId: "gone",
      lastContentHash: "sha256:gone",
    });
  });
});
