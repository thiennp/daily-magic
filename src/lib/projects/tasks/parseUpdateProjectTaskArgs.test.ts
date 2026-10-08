import { describe, expect, it } from "vitest";

import { parseUpdateProjectTaskArgs } from "@/lib/projects/tasks/parseProjectTaskToolArgs";

describe("parseUpdateProjectTaskArgs (DF-024)", () => {
  it("needs taskId and at least one change; null clears", () => {
    expect(parseUpdateProjectTaskArgs({ projectId: "p1" })).toEqual({
      ok: false,
      code: "task_id_required",
    });
    expect(
      parseUpdateProjectTaskArgs({ projectId: "p1", taskId: "t1" }),
    ).toEqual({
      ok: false,
      code: "nothing_to_update",
    });
    expect(
      parseUpdateProjectTaskArgs({
        projectId: "p1",
        taskId: "t1",
        stage: null,
      }),
    ).toEqual({
      ok: true,
      value: {
        projectId: "p1",
        taskId: "t1",
        status: null,
        fields: { stage: null },
      },
    });
    expect(
      parseUpdateProjectTaskArgs({
        projectId: "p1",
        taskId: "t1",
        status: "running",
      }),
    ).toEqual({ ok: false, code: "invalid_status" });
  });

  it("S3 / S9: bounded ids and a string description", () => {
    const code = (args: Record<string, unknown>) => {
      const r = parseUpdateProjectTaskArgs({
        projectId: "p1",
        taskId: "t1",
        ...args,
      });
      return r.ok ? null : r.code;
    };
    const long = "x".repeat(65);
    expect(code({ taskId: long, stage: null })).toBe("invalid_task_id");
    expect(code({ taskId: "  ", stage: null })).toBe("task_id_required");
    expect(code({ description: 42 })).toBe("invalid_description");
    expect(code({ dependsOn: [long] })).toBe("invalid_depends_on");
    expect(code({ ownerMembershipId: long })).toBe("invalid_owner");
    expect(code({ planItemId: long })).toBe("invalid_plan_item");
    expect(code({ description: "short note" })).toBeNull();
  });
});
