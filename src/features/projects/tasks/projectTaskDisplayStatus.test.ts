import { describe, expect, it } from "vitest";

import { mapRunStatusToProjectTaskDisplayStatus as toDisplay } from "@/features/projects/tasks/projectTaskDisplayStatus";
import { projectTaskStatusChip } from "@/features/projects/tasks/projectTaskStatusTone";
import {
  buildProjectTaskTimelineSteps,
  projectTaskTimelineStepClass,
} from "@/features/projects/tasks/utils/projectTaskTimeline";
import { mapAgentRunToProjectTaskMeta } from "@/features/projects/tasks/utils/mapAgentRunToProjectTaskMeta";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

describe("DF-027 Tasks run status labels", () => {
  it("denied / expired / timed out keep their own label (never Queued)", () => {
    expect(toDisplay("denied")).toBe("denied");
    expect(toDisplay("expired")).toBe("timed_out");
    expect(toDisplay("timed_out")).toBe("timed_out");
    expect(toDisplay(" Timed-Out ")).toBe("timed_out");
    expect(projectTaskStatusChip("denied")).toEqual({ label: "Denied", tone: "muted" });
    expect(projectTaskStatusChip("timed_out")).toEqual({ label: "Timed out", tone: "err" });
  });

  it("other statuses unchanged", () => {
    const cases: readonly [string, string, string][] = [
      ["pending_approval", "Queued", "warn"],
      ["assigned", "Queued", "warn"],
      ["running", "Running", "info"],
      ["working", "Running", "info"],
      ["completed", "Done", "ok"],
      ["failed", "Failed", "err"],
      ["error", "Failed", "err"],
      ["canceled", "Cancelled", "muted"],
    ];
    for (const [raw, label, tone] of cases) {
      expect(projectTaskStatusChip(toDisplay(raw))).toEqual({ label, tone });
    }
  });

  it("unknown tokens fall back to Unknown, not Queued", () => {
    for (const raw of ["", "mystery", "constructor", "toString"]) {
      expect(toDisplay(raw)).toBe("unknown");
    }
    expect(projectTaskStatusChip("unknown")).toEqual({ label: "Unknown", tone: "muted" });
  });

  it("Reports feed rows carry the display status", () => {
    const run = { id: "r1", status: "expired", prompt: "Ship it" } as EnrichedAgentRunRecord;
    expect(mapAgentRunToProjectTaskMeta({ ...run, executorEmail: "" }, "p1").status).toBe(
      "timed_out",
    );
  });

  it("timeline: denied / timed out end after queued; existing flows unchanged", () => {
    expect(buildProjectTaskTimelineSteps("denied")).toEqual(["queued", "denied"]);
    expect(buildProjectTaskTimelineSteps("timed_out")).toEqual(["queued", "timed_out"]);
    expect(buildProjectTaskTimelineSteps("running")).toEqual(["queued", "running", "done"]);
    expect(buildProjectTaskTimelineSteps("unknown")).toEqual(["unknown"]);
    expect(projectTaskTimelineStepClass("queued", "denied")).toBe("ok");
    expect(projectTaskTimelineStepClass("denied", "denied")).toBe("end-cancelled");
    expect(projectTaskTimelineStepClass("timed_out", "timed_out")).toBe("end-failed");
    expect(projectTaskTimelineStepClass("done", "running")).toBe("pend");
    expect(projectTaskTimelineStepClass("queued", "running")).toBe("ok");
  });
});
