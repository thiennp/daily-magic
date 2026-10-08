import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  role: vi.fn(),
  publish: vi.fn(),
  list: vi.fn(),
  get: vi.fn(),
  mark: vi.fn(),
  settings: vi.fn(),
}));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  resolveProjectSkillMemberRole: mocks.role,
  publishProjectSkill: mocks.publish,
  listProjectSkills: mocks.list,
  deriveProjectSkillIdFromName: (n: string) => n,
}));
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb",
  () => ({
    getAutoSkillSuggestion: mocks.get,
    markAutoSkillSuggestionAnswered: mocks.mark,
  }),
);
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/autoSkillsSettingsDb",
  () => ({
    getAutoSkillsSettingsRow: mocks.settings,
  }),
);

import { answerAutoSkillSuggestion } from "@/features/project-auto-skills/internal/infrastructure/answerAutoSkillSuggestion";

const input = { projectId: "p", suggestionId: "s1", actorUserId: "u" };

beforeEach(() => {
  vi.clearAllMocks();
  mocks.role.mockResolvedValue({ ok: true, role: "owner" });
  mocks.get.mockResolvedValue({
    id: "s1",
    draftName: "release-notes",
    title: "t",
    draftBody: "body",
  });
  mocks.settings.mockResolvedValue({ publishMode: "draft" });
  mocks.list.mockResolvedValue({ ok: true, skills: [] });
  mocks.publish.mockResolvedValue({ ok: true });
});

describe("answerAutoSkillSuggestion", () => {
  it("only the owner can answer", async () => {
    mocks.role.mockResolvedValue({ ok: true, role: "member" });
    expect(
      await answerAutoSkillSuggestion({ ...input, answer: "save" }),
    ).toMatchObject({ ok: false, status: 403 });
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it("save publishes the skill right away (not a draft) and marks it saved", async () => {
    const out = await answerAutoSkillSuggestion({ ...input, answer: "save" });
    expect(out).toEqual({ ok: true, skillId: "release-notes" });
    expect(mocks.publish.mock.calls[0]?.[0].args).toMatchObject({
      asDraft: false,
      body: "body",
      kind: "skill",
    });
    expect(mocks.mark).toHaveBeenCalledWith(
      expect.objectContaining({ status: "saved", skillId: "release-notes" }),
    );
  });

  it("ignores a stored draft publish mode: auto skills are always live", async () => {
    mocks.settings.mockResolvedValue({ publishMode: "draft" });
    await answerAutoSkillSuggestion({ ...input, answer: "save" });
    expect(mocks.publish.mock.calls[0]?.[0].args.asDraft).toBe(false);
  });

  it("does not clobber an existing skill id", async () => {
    mocks.list.mockResolvedValue({
      ok: true,
      skills: [{ skillId: "release-notes" }],
    });
    const out = await answerAutoSkillSuggestion({ ...input, answer: "save" });
    expect(out).toEqual({ ok: true, skillId: "release-notes-s1" });
  });

  it("a script approval is saved/denied without publishing a skill", async () => {
    mocks.get.mockResolvedValue({ id: "s1", kind: "script_approval" });
    await answerAutoSkillSuggestion({ ...input, answer: "save" });
    await answerAutoSkillSuggestion({ ...input, answer: "never" });
    expect(mocks.mark.mock.calls.map((c) => c[0].status)).toEqual([
      "saved",
      "never",
    ]);
    expect(mocks.publish).not.toHaveBeenCalled();
  });

  it("never and not_now only record the answer", async () => {
    await answerAutoSkillSuggestion({ ...input, answer: "never" });
    await answerAutoSkillSuggestion({ ...input, answer: "not_now" });
    expect(mocks.mark.mock.calls.map((c) => c[0].status)).toEqual([
      "never",
      "not_now",
    ]);
    expect(mocks.publish).not.toHaveBeenCalled();
  });
});
