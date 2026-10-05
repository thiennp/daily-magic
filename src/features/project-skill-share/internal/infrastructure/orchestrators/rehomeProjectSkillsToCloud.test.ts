import { beforeEach, describe, expect, it, vi } from "vitest";

import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { selectProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow";
import { upsertProjectSkillVersionBody } from "@/features/project-skill-share/internal/infrastructure/db/upsertProjectSkillVersionBody";
import {
  projectSkillHistoryPortFixture as port,
  projectSkillRecordFixture,
  projectSkillVersionRowFixture,
} from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareOrchestrators.fixtures";
import { rehomeProjectSkillsToCloud } from "@/features/project-skill-share/internal/infrastructure/orchestrators/rehomeProjectSkillsToCloud";

vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole",
  () => ({ resolveProjectSkillActorRole: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows",
  () => ({ selectProjectSkillRows: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow",
  () => ({ selectProjectSkillVersionRow: vi.fn() }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/db/upsertProjectSkillVersionBody",
  () => ({ upsertProjectSkillVersionBody: vi.fn() }),
);

const body = "skill";
const hash = computeProjectSkillContentHash(body);
describe("rehomeProjectSkillsToCloud", () => {
  beforeEach(() => {
    vi.mocked(resolveProjectSkillActorRole).mockResolvedValue("owner");
    vi.mocked(selectProjectSkillRows).mockResolvedValue([
      projectSkillRecordFixture({ contentHash: hash }),
    ]);
    vi.mocked(upsertProjectSkillVersionBody).mockReset();
  });

  it("purge-ready when AWC already holds the body", async () => {
    vi.mocked(selectProjectSkillVersionRow).mockResolvedValue(
      projectSkillVersionRowFixture(body, hash),
    );
    const result = await rehomeProjectSkillsToCloud({
      projectId: "proj-1",
      actorUserId: "o",
      deps: { history: port({ body, contentHash: hash }) },
    });
    expect(result).toMatchObject({
      ok: true,
      purgeReady: true,
      skills: [{ action: "verified" }],
    });
    expect(upsertProjectSkillVersionBody).not.toHaveBeenCalled();
  });

  it("uploads from the mirror when AWC is missing, then verifies", async () => {
    vi.mocked(selectProjectSkillVersionRow)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(projectSkillVersionRowFixture(body, hash));
    const result = await rehomeProjectSkillsToCloud({
      projectId: "proj-1",
      actorUserId: "o",
      deps: { history: port({ body, contentHash: hash }) },
    });
    expect(result).toMatchObject({
      ok: true,
      purgeReady: true,
      skills: [{ action: "uploaded" }],
    });
    expect(upsertProjectSkillVersionBody).toHaveBeenCalledWith(
      expect.objectContaining({ body, contentHash: hash }),
    );
  });

  it("not purge-ready when the body cannot be restored", async () => {
    vi.mocked(selectProjectSkillVersionRow).mockResolvedValue(null);
    const result = await rehomeProjectSkillsToCloud({
      projectId: "proj-1",
      actorUserId: "o",
      deps: { history: port(null) },
    });
    expect(result).toMatchObject({
      ok: false,
      purgeReady: false,
      code: "rehome_failed",
      skills: [{ action: "missing" }],
    });
  });

  it("not purge-ready when upload verification fails", async () => {
    vi.mocked(selectProjectSkillVersionRow).mockResolvedValue(null);
    const result = await rehomeProjectSkillsToCloud({
      projectId: "proj-1",
      actorUserId: "o",
      deps: { history: port({ body, contentHash: hash }) },
    });
    expect(result).toMatchObject({
      ok: false,
      purgeReady: false,
      skills: [{ action: "upload_failed" }],
    });
  });
});
