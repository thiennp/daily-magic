import { beforeEach, describe, expect, it, vi } from "vitest";

import { pitfallRecordFixture as rec } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { recordProjectPitfallHitRow } from "@/features/project-pitfalls/internal/infrastructure/db/recordProjectPitfallHitRow";
import { listProjectPitfalls } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/listProjectPitfalls";
import {
  givenMember,
  givenOutsider,
  givenParts,
} from "@/features/project-pitfalls/internal/infrastructure/orchestrators/projectPitfallOrchestrators.mocks";
import { recordProjectPitfallHit } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/recordProjectPitfallHit";

vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess",
  () => ({ resolveProjectPitfallAccess: vi.fn() }),
);
vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/db/selectProjectPitfallParts",
  () => ({ selectProjectPitfallParts: vi.fn() }),
);
vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/db/recordProjectPitfallHitRow",
  () => ({ recordProjectPitfallHitRow: vi.fn() }),
);

const nowMs = Date.parse("2026-10-05T12:00:00.000Z");
const call = (pitfallId: string, actorUserId = "u1") =>
  recordProjectPitfallHit({
    actorUserId,
    projectId: "p1",
    pitfallId,
    body: { count: 2 },
    nowMs,
  });

describe("recordProjectPitfallHit", () => {
  beforeEach(() => {
    vi.mocked(recordProjectPitfallHitRow).mockReset();
    vi.mocked(recordProjectPitfallHitRow).mockResolvedValue({
      pitfallId: "stale-next",
      hitCount: 4,
      lastSeenAt: "2026-10-05T12:00:00.000Z",
    });
    givenMember();
    givenParts();
  });

  it("bumps hitCount + lastSeenAt for a seed in this project", async () => {
    const result = await call("stale-next");
    expect(result).toMatchObject({ ok: true, hit: { hitCount: 4 } });
    expect(recordProjectPitfallHitRow).toHaveBeenCalledWith({
      projectId: "p1",
      pitfallId: "stale-next",
      hit: { count: 2, seenAt: "2026-10-05T12:00:00.000Z" },
    });
  });

  it("404s unknown ids and 403s outsiders without writing", async () => {
    expect(await call("unknown-one")).toEqual({ ok: false, code: "not_found" });
    givenOutsider();
    expect(await call("stale-next", "x")).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(recordProjectPitfallHitRow).not.toHaveBeenCalled();
  });
});

describe("listProjectPitfalls", () => {
  beforeEach(() => givenMember());

  it("hides retired overrides by default and shows them on request", async () => {
    givenParts([rec({ id: "stale-next", projectId: "p1", source: "retired" })]);
    const visible = await listProjectPitfalls({
      actorUserId: "u1",
      projectId: "p1",
    });
    expect(visible.ok && visible.pitfalls.map((v) => v.id)).toEqual([
      "arch-max-lines",
    ]);
    const all = await listProjectPitfalls({
      actorUserId: "u1",
      projectId: "p1",
      includeRetired: true,
    });
    expect(all.ok && all.pitfalls).toHaveLength(2);
  });

  it("denies non-members", async () => {
    givenOutsider();
    expect(
      await listProjectPitfalls({ actorUserId: "x", projectId: "p1" }),
    ).toEqual({
      ok: false,
      code: "forbidden",
    });
  });
});
