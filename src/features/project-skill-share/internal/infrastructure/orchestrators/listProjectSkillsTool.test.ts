import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { listProjectSkillsTool } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkillsTool";
import { projectSkillRecordFixture } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole",
  () => ({ resolveProjectSkillActorRole: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows",
  () => ({ selectProjectSkillRows: vi.fn() }),
);

describe("listProjectSkillsTool whole-library warning", () => {
  beforeEach(() => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      projectSkillRecordFixture({ skillId: "deploy", name: "Deploy" }),
    ]);
  });

  it("warns a bot that read the whole library", async () => {
    const result = await listProjectSkillsTool({
      actorUserId: "o",
      args: { projectId: "proj-1" },
    });
    expect(result).toMatchObject({ ok: true });
    expect(result.ok && "warning" in result && result.warning).toMatch(
      /Pass query/,
    );
  });

  it("does not warn on a query, and does not decorate failures", async () => {
    const searched = await listProjectSkillsTool({
      actorUserId: "o",
      args: { projectId: "proj-1", query: "deploy" },
    });
    expect("warning" in searched).toBe(false);
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("none");
    const denied = await listProjectSkillsTool({
      actorUserId: "x",
      args: { projectId: "proj-1" },
    });
    expect(denied).toEqual({ ok: false, code: "forbidden" });
  });
});
