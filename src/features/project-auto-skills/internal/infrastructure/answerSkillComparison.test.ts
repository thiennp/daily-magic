import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  canManage: vi.fn(),
  list: vi.fn(),
  decide: vi.fn(),
  get: vi.fn(),
  publish: vi.fn(),
}));
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/canManageAutoSkills",
  () => ({ canManageAutoSkills: mocks.canManage }),
);
vi.mock("@/lib/knowledge/skillUses/listSkillComparisons", () => ({
  listSkillComparisons: mocks.list,
  decideSkillComparison: mocks.decide,
}));
vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  getProjectSkill: mocks.get,
  publishProjectSkill: mocks.publish,
}));

import { answerSkillComparison } from "@/features/project-auto-skills/internal/infrastructure/answerSkillComparison";

const input = { projectId: "p1", comparisonId: 9, actorUserId: "u1" } as const;
const comparison = {
  id: 9,
  skillId: "deploy",
  skillName: "Deploy",
  oldVersion: 1,
  newVersion: 2,
};

describe("answerSkillComparison", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.canManage.mockResolvedValue(true);
    mocks.list.mockResolvedValue([comparison]);
    mocks.decide.mockResolvedValue(true);
    mocks.get.mockResolvedValue({ ok: true, skill: { body: "# compared v2" } });
    mocks.publish.mockResolvedValue({ ok: true, version: 5 });
  });

  it("refuses people who may not manage auto skills", async () => {
    mocks.canManage.mockResolvedValue(false);
    expect(
      await answerSkillComparison({ ...input, answer: "new" }),
    ).toMatchObject({
      ok: false,
      status: 403,
    });
  });

  it("404s a comparison that is not running", async () => {
    mocks.list.mockResolvedValue([]);
    expect(
      await answerSkillComparison({ ...input, answer: "old" }),
    ).toMatchObject({
      ok: false,
      status: 404,
    });
  });

  it("keeps the current version without publishing for 'old'", async () => {
    expect(await answerSkillComparison({ ...input, answer: "old" })).toEqual({
      ok: true,
    });
    expect(mocks.publish).not.toHaveBeenCalled();
    expect(mocks.decide).toHaveBeenCalledWith(
      expect.objectContaining({ winner: "old" }),
    );
  });

  it("publishes the compared text, read by its version, for 'new'", async () => {
    await answerSkillComparison({ ...input, answer: "new" });
    expect(mocks.get).toHaveBeenCalledWith(
      expect.objectContaining({
        args: expect.objectContaining({ version: 2, skillId: "deploy" }),
      }),
    );
    expect(mocks.publish).toHaveBeenCalledWith(
      expect.objectContaining({
        args: expect.objectContaining({
          body: "# compared v2",
          asDraft: false,
        }),
      }),
    );
  });

  it("leaves the comparison running when the compared text cannot be read or published", async () => {
    mocks.get.mockResolvedValue({ ok: false, code: "not_found" });
    expect(
      await answerSkillComparison({ ...input, answer: "new" }),
    ).toMatchObject({
      ok: false,
      status: 422,
    });
    expect(mocks.decide).not.toHaveBeenCalled();
  });
});
