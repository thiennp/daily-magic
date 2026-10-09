import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ get: vi.fn(), list: vi.fn() }));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  getProjectSkill: mocks.get,
  listProjectSkills: mocks.list,
  deriveProjectSkillIdFromName: (name: string) => name,
}));

import { pickAutoSkillId } from "@/features/project-auto-skills/internal/infrastructure/pickAutoSkillId";

const SHA = "a".repeat(40);
const draft = (extra = ""): string =>
  `---\nname: quick-commit\nsource: docs/qa/a.md@${SHA}\norigin: folder-doc\n${extra}---\n\n1. x\n`;
const stored = (
  path: string,
  origin = "folder-doc",
): { ok: true; skill: { body: string } } => ({
  ok: true,
  skill: {
    body: `---\nname: quick-commit\nsource: ${path}@${"b".repeat(40)}\norigin: ${origin}\n---\n\n1. x\n`,
  },
});
const pick = (draftBody: string) =>
  pickAutoSkillId({
    actorUserId: "u",
    projectId: "p",
    name: "quick-commit",
    suggestionId: "abcd1234",
    draftBody,
  });

beforeEach(() => {
  vi.clearAllMocks();
  mocks.list.mockResolvedValue({ ok: true, skills: [] });
});

describe("pickAutoSkillId", () => {
  it("updates the named skill when it came from the same doc", async () => {
    mocks.get.mockResolvedValue(stored("docs/qa/a.md"));
    expect(await pick(draft("updates: quick-commit\n"))).toBe("quick-commit");
  });

  it("does not overwrite a skill from another doc or one made by hand", async () => {
    mocks.list.mockResolvedValue({
      ok: true,
      skills: [{ skillId: "quick-commit" }],
    });
    mocks.get.mockResolvedValue(stored("docs/qa/other.md"));
    expect(await pick(draft("updates: quick-commit\n"))).toBe(
      "quick-commit-abcd",
    );
    mocks.get.mockResolvedValue(stored("docs/qa/a.md", "hand"));
    expect(await pick(draft("updates: quick-commit\n"))).toBe(
      "quick-commit-abcd",
    );
    mocks.get.mockResolvedValue({ ok: false, code: "not_found" });
    expect(await pick(draft("updates: quick-commit\n"))).toBe(
      "quick-commit-abcd",
    );
  });

  it("a normal question keeps the name, with a suffix only when it is taken", async () => {
    expect(await pick(draft())).toBe("quick-commit");
    expect(mocks.get).not.toHaveBeenCalled();
    mocks.list.mockResolvedValue({
      ok: true,
      skills: [{ skillId: "quick-commit" }],
    });
    expect(await pick(draft())).toBe("quick-commit-abcd");
  });
});
