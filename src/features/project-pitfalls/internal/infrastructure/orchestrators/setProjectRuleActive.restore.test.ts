import { beforeEach, describe, expect, it, vi } from "vitest";

import { pitfallRecordFixture as rec } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { resolveProjectPitfallAccess } from "@/features/project-pitfalls/internal/infrastructure/db/resolveProjectPitfallAccess";
import { upsertProjectPitfallRow } from "@/features/project-pitfalls/internal/infrastructure/db/upsertProjectPitfallRow";
import {
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

const retired = rec({
  id: "stale-next",
  projectId: "p1",
  symptom: "Stale .next cache",
  source: "retired",
  updatedAt: "t1",
});
const restore = (ruleId = "stale-next") =>
  setProjectRuleActive({ actorUserId: "owner-1", projectId: "p1", ruleId, active: true });

describe("setProjectRuleActive (restore / Undo)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(upsertProjectPitfallRow).mockImplementation(async (input) =>
      rec({ ...input.pitfall, projectId: input.projectId, updatedAt: "t2" }),
    );
    givenOwner();
    givenParts([retired]);
  });

  it("owner restores a dropped rule as source project + one log line", async () => {
    expect(await restore()).toMatchObject({
      ok: true,
      changed: true,
      rule: { ruleId: "stale-next", source: "project", active: true },
    });
    expect(vi.mocked(upsertProjectPitfallRow).mock.calls[0][0].pitfall).toMatchObject({
      id: "stale-next",
      source: "project",
    });
    expect(writeProjectActivityEvent).toHaveBeenCalledTimes(1);
    expect(vi.mocked(writeProjectActivityEvent).mock.calls[0][0]).toMatchObject({
      type: "rule.restored",
      detail: { ruleId: "stale-next", label: "Stale .next cache" },
      sourceRef: "rule:p1:stale-next:restored:t1",
    });
  });

  it("is idempotent: restoring an active rule is ok, unchanged, not logged", async () => {
    givenParts();
    expect(await restore()).toMatchObject({ ok: true, changed: false, rule: { active: true } });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
    expect(writeProjectActivityEvent).not.toHaveBeenCalled();
  });

  it("respects the 64-active cap: limit_exceeded, nothing written or logged", async () => {
    const own = Array.from({ length: 62 }, (_, i) =>
      rec({ id: `own-${i}`, projectId: "p1", source: "project" }),
    );
    givenParts([...own, rec({ id: "dropped-one", projectId: "p1", source: "retired" })]);
    expect(await restore("dropped-one")).toEqual({ ok: false, code: "limit_exceeded" });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
    expect(writeProjectActivityEvent).not.toHaveBeenCalled();
  });

  it("unknown project → not_found before any read", async () => {
    vi.mocked(resolveProjectPitfallAccess).mockResolvedValue({ ok: false, code: "not_found" });
    expect(await restore()).toEqual({ ok: false, code: "not_found" });
    expect(upsertProjectPitfallRow).not.toHaveBeenCalled();
  });
});
