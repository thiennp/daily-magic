import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  publish: vi.fn(),
  get: vi.fn(),
}));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  resolveProjectSkillMemberRole: async () => ({ ok: true, role: "owner" }),
  publishProjectSkill: mocks.publish,
  listProjectSkills: async () => ({ ok: true, skills: [] }),
  deriveProjectSkillIdFromName: (n: string) => n,
}));
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb",
  () => ({
    getAutoSkillSuggestion: mocks.get,
    markAutoSkillSuggestionAnswered: vi.fn(),
  }),
);
vi.mock(
  "@/features/project-auto-skills/internal/infrastructure/autoSkillsSettingsDb",
  () => ({ getAutoSkillsSettingsRow: async () => ({ publishMode: "draft" }) }),
);

import { answerAutoSkillSuggestion } from "@/features/project-auto-skills/internal/infrastructure/answerAutoSkillSuggestion";

const input = { projectId: "p", suggestionId: "s1", actorUserId: "u" } as const;
const suggestion = (libraryKind: string) => ({
  id: "s1",
  draftName: "handle-hotfix",
  title: "t",
  draftBody: "body",
  libraryKind,
});

describe("answerAutoSkillSuggestion kinds", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.publish.mockResolvedValue({ ok: true });
  });

  it("saves a draft the AI tagged as a playbook as a playbook, live at once", async () => {
    mocks.get.mockResolvedValue(suggestion("playbook"));
    await answerAutoSkillSuggestion({ ...input, answer: "save" });
    expect(mocks.publish.mock.calls[0]?.[0].args).toMatchObject({
      kind: "playbook",
      asDraft: false,
    });
  });

  it("saves anything else as a skill", async () => {
    mocks.get.mockResolvedValue(suggestion("skill"));
    await answerAutoSkillSuggestion({ ...input, answer: "save" });
    expect(mocks.publish.mock.calls[0]?.[0].args).toMatchObject({
      kind: "skill",
    });
  });
});
