import { beforeEach, describe, expect, it, vi } from "vitest";

import { pitfallRecordFixture as rec } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { upsertProjectPitfallRow } from "@/features/project-pitfalls/internal/infrastructure/db/upsertProjectPitfallRow";
import {
  givenMember,
  givenOutsider,
  givenOwner,
  givenParts,
} from "@/features/project-pitfalls/internal/infrastructure/orchestrators/projectPitfallOrchestrators.mocks";
import { setProjectRuleActive } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/setProjectRuleActive";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";

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
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: vi.fn(),
}));

const drop = (ruleId = "stale-next", actorUserId = "owner-1") =>
  setProjectRuleActive({ actorUserId, projectId: " p1 ", ruleId, active: false });

describe("setProjectRuleActive (drop)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(upsertProjectPitfallRow).mockImplementation(async (input) =>
      rec({ ...input.pitfall, projectId: input.projectId, updatedAt: "t2" }),
    );
    givenOwner();
    givenParts();
  });

  it("owner drops a global seed as a project retire override + one log line", async () => {
    expect(await drop()).toEqual({
      ok: true,
      projectId: "p1",
      changed: true,
      rule: {
        ruleId: "stale-next",
        title: "Seed symptom",
        source: "retired",
        active: false,
        hitCount: 2,
        lastHitAt: null,
      },
    });
    expect(vi.mocked(upsertProjectPitfallRow).mock.calls[0][0]).toMatchObject({
      projectId: "p1",
      actorUserId: "owner-1",
      pitfall: { id: "stale-next", symptom: "Seed symptom", source: "retired" },
    });
    expect(writeProjectActivityEvent).toHaveBeenCalledTimes(1);
    expect(writeProjectActivityEvent).toHaveBeenCalledWith({
      projectId: "p1",
      type: "rule.dropped",
      actor: { kind: "owner", userId: "owner-1" },
      detail: { ruleId: "stale-next", label: "Seed symptom" },
      sourceRef: "rule:p1:stale-next:dropped:2026-10-05T10:00:00.000Z",
    });
  });

  it("is idempotent: an already-dropped rule is ok, unchanged, not logged", async () => {
    givenParts([rec({ id: "stale-next", projectId: "p1", source: "retired" })]);
    expect(await drop()).toMatchObject({
      ok: true,
      changed: false,
      rule: { ruleId: "stale-next", active: false },
    });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
    expect(writeProjectActivityEvent).not.toHaveBeenCalled();
  });

  it("active member gets forbidden; outsider forbidden; nothing written", async () => {
    givenMember();
    expect(await drop("stale-next", "member-1")).toEqual({
      ok: false,
      code: "forbidden",
    });
    givenOutsider();
    expect(await drop("stale-next", "x")).toEqual({ ok: false, code: "forbidden" });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
    expect(writeProjectActivityEvent).not.toHaveBeenCalled();
  });

  it("unknown rule → not_found; malformed id → invalid_arguments", async () => {
    expect(await drop("no-such-rule")).toEqual({ ok: false, code: "not_found" });
    expect(await drop("Bad Id!")).toEqual({
      ok: false,
      code: "invalid_arguments",
      field: "ruleId",
    });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
  });
});
