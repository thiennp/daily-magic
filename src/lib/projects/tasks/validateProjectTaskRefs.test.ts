import { beforeEach, describe, expect, it, vi } from "vitest";

import { validateProjectTaskRefs } from "@/lib/projects/tasks/validateProjectTaskRefs";

const h = vi.hoisted(() => ({ seat: vi.fn(), count: vi.fn() }));

vi.mock("@/lib/projects/tasks/projectTaskRecordReadQueries", () => ({
  isActiveProjectTaskOwnerSeat: h.seat,
  countProjectTaskRecordsIn: h.count,
}));

const base = { projectId: "p1", taskId: "t1" };

describe("validateProjectTaskRefs (DF-024)", () => {
  beforeEach(() => {
    h.seat.mockResolvedValue(true);
    h.count.mockImplementation(async (i: { ids: string[] }) => i.ids.length);
  });

  it("owner seat must be an active non-viewer seat of the project", async () => {
    h.seat.mockResolvedValueOnce(false);
    expect(
      await validateProjectTaskRefs({ ...base, ownerMembershipId: "s9" }),
    ).toEqual({
      ok: false,
      code: "owner_not_member",
    });
    expect(
      await validateProjectTaskRefs({ ...base, ownerMembershipId: null }),
    ).toEqual({ ok: true });
  });

  it("dependsOn: same project only, never self", async () => {
    expect(
      await validateProjectTaskRefs({ ...base, dependsOn: ["t1"] }),
    ).toEqual({
      ok: false,
      code: "self_dependency",
    });
    h.count.mockResolvedValueOnce(1);
    expect(
      await validateProjectTaskRefs({
        ...base,
        dependsOn: ["a", "other-project"],
      }),
    ).toEqual({
      ok: false,
      code: "depends_on_not_found",
    });
    expect(
      await validateProjectTaskRefs({ ...base, dependsOn: ["a", "b"] }),
    ).toEqual({ ok: true });
  });

  it("planItemId must be a task of the same project", async () => {
    h.count.mockResolvedValueOnce(0);
    expect(await validateProjectTaskRefs({ ...base, planItemId: "x" })).toEqual(
      {
        ok: false,
        code: "plan_item_not_found",
      },
    );
    expect(
      await validateProjectTaskRefs({ ...base, planItemId: "plan-1" }),
    ).toEqual({ ok: true });
  });
});
