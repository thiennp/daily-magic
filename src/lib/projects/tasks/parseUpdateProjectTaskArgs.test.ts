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
});
