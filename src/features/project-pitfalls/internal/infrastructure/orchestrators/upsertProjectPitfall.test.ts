import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  pitfallRecordFixture as rec,
  validUpsertBodyFixture as body,
} from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { upsertProjectPitfallRow } from "@/features/project-pitfalls/internal/infrastructure/db/upsertProjectPitfallRow";
import {
  givenMember,
  givenOutsider,
  givenParts,
  givenViewer,
} from "@/features/project-pitfalls/internal/infrastructure/orchestrators/projectPitfallOrchestrators.mocks";
import { upsertProjectPitfall } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/upsertProjectPitfall";

vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess",
  () => ({ resolveProjectPitfallAccess: vi.fn() }),
);
vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts",
  () => ({ selectProjectPitfallParts: vi.fn() }),
);
vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/db/upsertProjectPitfallRow",
  () => ({ upsertProjectPitfallRow: vi.fn() }),
);

describe("upsertProjectPitfall", () => {
  beforeEach(() => {
    vi.mocked(upsertProjectPitfallRow).mockReset();
    vi.mocked(upsertProjectPitfallRow).mockImplementation(async (input) =>
      rec({ ...input.pitfall, projectId: input.projectId }),
    );
    givenMember();
    givenParts();
  });

  it("seed id + projectId writes a project override, never the global seed", async () => {
    const result = await upsertProjectPitfall({
      actorUserId: "u1",
      projectId: " p1 ",
      body: body({ id: "stale-next", avoidance: "Our way" }),
    });
    expect(result).toMatchObject({
      ok: true,
      pitfall: {
        id: "stale-next",
        projectId: "p1",
        overridesSeed: true,
        hitCount: 2,
      },
    });
    expect(upsertProjectPitfallRow).toHaveBeenCalledTimes(1);
    expect(vi.mocked(upsertProjectPitfallRow).mock.calls[0][0]).toMatchObject({
      projectId: "p1",
      actorUserId: "u1",
      pitfall: { id: "stale-next", source: "project" },
    });
  });

  it("rejects a new active pitfall past 64 (seeds count)", async () => {
    givenParts(
      Array.from({ length: 62 }, (_, i) =>
        rec({ id: `own-${i}`, projectId: "p1", source: "project" }),
      ),
    );
    const result = await upsertProjectPitfall({
      actorUserId: "u1",
      projectId: "p1",
      body: body(),
    });
    expect(result).toEqual({ ok: false, code: "limit_exceeded" });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
  });

  it("denies non-members and rejects invalid bodies without writing", async () => {
    givenOutsider();
    expect(
      await upsertProjectPitfall({
        actorUserId: "x",
        projectId: "p1",
        body: body(),
      }),
    ).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(
      await upsertProjectPitfall({
        actorUserId: "u1",
        projectId: "p1",
        body: body({ symptom: "" }),
      }),
    ).toMatchObject({ ok: false, code: "invalid_arguments", field: "symptom" });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
  });

  it("a read-only viewer cannot write a project rule", async () => {
    givenViewer();
    const result = await upsertProjectPitfall({
      actorUserId: "u1",
      projectId: "p1",
      body: body({ id: "stale-next", avoidance: "Our way" }),
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
  });
});
