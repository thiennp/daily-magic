import { beforeEach, describe, expect, it, vi } from "vitest";

const skillMock = vi.hoisted(() => vi.fn());
const versionMock = vi.hoisted(() => vi.fn());
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow",
  () => ({ selectProjectSkillRow: skillMock }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow",
  () => ({ selectProjectSkillVersionRow: versionMock }),
);

import { getPublishedProjectSkillBodyFromDb } from "@/features/project-skill-share/internal/infrastructure/awc/getPublishedProjectSkillBodyFromDb";

const get = () =>
  getPublishedProjectSkillBodyFromDb({
    projectId: "p1",
    skillId: "s1",
    version: 1,
  });

describe("getPublishedProjectSkillBodyFromDb", () => {
  beforeEach(() => {
    skillMock.mockReset();
    versionMock.mockReset();
    versionMock.mockResolvedValue({
      body: "text",
      contentHash: "h",
      isDraft: false,
    });
  });

  it("serves a published skill", async () => {
    skillMock.mockResolvedValue({ rowId: "r1", state: "published" });
    expect(await get()).toEqual({ body: "text", contentHash: "h" });
  });

  it("does not serve a revoked skill's old versions", async () => {
    skillMock.mockResolvedValue({ rowId: "r1", state: "revoked" });
    expect(await get()).toBeNull();
    expect(versionMock).not.toHaveBeenCalled();
  });
});
