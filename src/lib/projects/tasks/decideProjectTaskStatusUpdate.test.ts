import { describe, expect, it } from "vitest";

import { decideProjectTaskStatusUpdate as decide } from "@/lib/projects/tasks/decideProjectTaskStatusUpdate";
import {
  PROJECT_TASK_STATUSES,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

const ALLOWED: readonly (readonly [ProjectTaskStatus, ProjectTaskStatus])[] = [
  ["queued", "planned"],
  ["queued", "in_progress"],
  ["planned", "queued"],
  ["planned", "in_progress"],
  ["in_progress", "blocked"],
  ["in_progress", "done"],
  ["blocked", "in_progress"],
  ["in_progress", "queued"],
  ["blocked", "queued"],
  ["done", "queued"],
];

describe("decideProjectTaskStatusUpdate (DF-024 FSM)", () => {
  it("allows exactly the listed moves", () => {
    for (const from of PROJECT_TASK_STATUSES) {
      for (const to of PROJECT_TASK_STATUSES) {
        if (from === to) continue;
        const allowed = ALLOWED.some(([a, b]) => a === from && b === to);
        const r = decide({ currentStatus: from, nextStatus: to });
        expect({ from, to, ok: r.ok }).toEqual({ from, to, ok: allowed });
      }
    }
  });

  it("same status is a no-op; done can only be reopened to To do; skips are invalid", () => {
    expect(decide({ currentStatus: "blocked", nextStatus: "blocked" })).toEqual(
      {
        ok: true,
        status: "blocked",
        changed: false,
      },
    );
    expect(
      decide({ currentStatus: "done", nextStatus: "in_progress" }),
    ).toEqual({ ok: false, code: "invalid_transition" });
    expect(decide({ currentStatus: "done", nextStatus: "queued" })).toEqual({
      ok: true,
      status: "queued",
      changed: true,
    });
    expect(decide({ currentStatus: "queued", nextStatus: "done" })).toEqual({
      ok: false,
      code: "invalid_transition",
    });
    expect(decide({ currentStatus: "blocked", nextStatus: "done" })).toEqual({
      ok: false,
      code: "invalid_transition",
    });
  });
});
