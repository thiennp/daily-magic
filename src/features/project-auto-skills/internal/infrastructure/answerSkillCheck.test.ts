import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  canManage: vi.fn(),
  getQuestion: vi.fn(),
  markDecided: vi.fn(),
  publish: vi.fn(),
}));
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/canManageAutoSkills",
  () => ({ canManageAutoSkills: mocks.canManage }),
);
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/skillCheckQuestionsDb",
  () => ({
    getSkillCheckQuestion: mocks.getQuestion,
    markSkillCheckDecided: mocks.markDecided,
  }),
);
vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  publishProjectSkill: mocks.publish,
}));

import { answerSkillCheck } from "@/features/project-auto-skills/internal/infrastructure/answerSkillCheck";

const input = { projectId: "p1", checkId: 4, actorUserId: "u1" } as const;
const question = {
  id: 4,
  skillId: "deploy",
  skillName: "Deploy",
  skillVersion: 2,
  usesAtCheck: 3,
  note: "add migrate",
  proposedBody: "# Deploy v3",
  createdAt: "2026-10-10T00:00:00.000Z",
};

describe("answerSkillCheck", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.canManage.mockResolvedValue(true);
    mocks.getQuestion.mockResolvedValue(question);
    mocks.markDecided.mockResolvedValue(true);
    mocks.publish.mockResolvedValue({ ok: true, version: 3 });
  });

  it("refuses people who may not manage auto skills", async () => {
    mocks.canManage.mockResolvedValue(false);
    expect(await answerSkillCheck({ ...input, answer: "new" })).toMatchObject({
      ok: false,
      status: 403,
    });
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it("404s a question that is not open", async () => {
    mocks.getQuestion.mockResolvedValue(null);
    expect(await answerSkillCheck({ ...input, answer: "old" })).toMatchObject({
      ok: false,
      status: 404,
    });
  });

  it("keeps the old version without publishing", async () => {
    expect(await answerSkillCheck({ ...input, answer: "old" })).toEqual({
      ok: true,
      newVersion: null,
    });
    expect(mocks.publish).not.toHaveBeenCalled();
    expect(mocks.markDecided).toHaveBeenCalledWith(
      expect.objectContaining({ decision: "old", newVersion: null }),
    );
  });

  it("publishes the new text live for 'new' and as a draft for 'both'", async () => {
    await answerSkillCheck({ ...input, answer: "new" });
    expect(mocks.publish).toHaveBeenLastCalledWith(
      expect.objectContaining({
        args: expect.objectContaining({ asDraft: false, body: "# Deploy v3" }),
      }),
    );
    expect(await answerSkillCheck({ ...input, answer: "both" })).toEqual({
      ok: true,
      newVersion: 3,
    });
    expect(mocks.publish).toHaveBeenLastCalledWith(
      expect.objectContaining({
        args: expect.objectContaining({ asDraft: true }),
      }),
    );
  });

  it("does not mark the question answered when publishing fails", async () => {
    mocks.publish.mockResolvedValue({ ok: false, code: "version_conflict" });
    expect(await answerSkillCheck({ ...input, answer: "new" })).toMatchObject({
      ok: false,
      status: 422,
    });
    expect(mocks.markDecided).not.toHaveBeenCalled();
  });

  it("reports a question someone already answered", async () => {
    mocks.markDecided.mockResolvedValue(false);
    expect(await answerSkillCheck({ ...input, answer: "old" })).toMatchObject({
      ok: false,
      status: 409,
    });
  });
});
