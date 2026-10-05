import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import type { ProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/projectSkillAwcPublishedSource.type";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { pullPublishedProjectSkillsToMirror } from "@/features/project-skill-share/internal/infrastructure/orchestrators/pullPublishedProjectSkillsToMirror";

const body = "# Deploy\nsteps";
const hash = computeProjectSkillContentHash(body);

const awcFixture = (
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

describe("pullPublishedProjectSkillsToMirror", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("History OFF → skipped, no writes", async () => {
    const write = vi.fn();
    const history: ProjectSkillHistoryPort = {
      isHistoryEnabled: () => false,
      resolveProjectDataDir: () => "/p",
      writeProjectSkillVersion: write,
      readProjectSkillVersion: () => null,
    };
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: { history, awcPublished: awcFixture() },
    });
    expect(result).toEqual({ ok: true, skipped: true, skills: [] });
    expect(write).not.toHaveBeenCalled();
  });

  it("skips when local meta hash already matches", async () => {
    const write = vi.fn();
    const history: ProjectSkillHistoryPort = {
      isHistoryEnabled: () => true,
      resolveProjectDataDir: () => "/p",
      writeProjectSkillVersion: write,
      readProjectSkillVersion: () => ({ body, contentHash: hash }),
    };
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: { history, awcPublished: awcFixture() },
    });
    expect(result).toMatchObject({
      ok: true,
      skipped: false,
      skills: [{ skillId: "deploy", action: "skipped" }],
    });
    expect(write).not.toHaveBeenCalled();
  });

  it("fetches and writes when local missing; hash must match AWC", async () => {
    const write = vi.fn().mockResolvedValue({
      path: "/p/skills/deploy/v0001.md",
      contentHash: hash,
    });
    const history: ProjectSkillHistoryPort = {
      isHistoryEnabled: () => true,
      resolveProjectDataDir: () => "/p",
      writeProjectSkillVersion: write,
      readProjectSkillVersion: () => null,
    };
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: { history, awcPublished: awcFixture() },
    });
    expect(result).toMatchObject({
      ok: true,
      skills: [{ action: "mirrored" }],
    });
    expect(write).toHaveBeenCalledWith({
      projectId: "proj-1",
      skillId: "deploy",
      version: 1,
      body,
    });
  });

  it("logs and continues on per-skill failure (never throws)", async () => {
    const history: ProjectSkillHistoryPort = {
      isHistoryEnabled: () => true,
      resolveProjectDataDir: () => "/p",
      writeProjectSkillVersion: () => {
        throw new Error("disk full");
      },
      readProjectSkillVersion: () => null,
    };
    const result = await pullPublishedProjectSkillsToMirror({
      projectId: "proj-1",
      deps: { history, awcPublished: awcFixture() },
    });
    expect(result.ok).toBe(false);
    expect(result.skills[0]?.action).toBe("unavailable");
  });
});
