import { describe, expect, it } from "vitest";

import { decideLinearPull } from "@/lib/projects/taskSync/decideLinearPull";
import { hashTaskSyncFields } from "@/lib/projects/taskSync/hashTaskSyncFields";
import type { TaskSyncFields } from "@/lib/projects/taskSync/taskSync.types";
import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

const fields: TaskSyncFields = {
  title: "A",
  status: "in_progress",
  priority: "p1",
  description: null,
};

describe("decideLinearPull (loop guard)", () => {
  const current = projectTaskRecordFixture({ status: "in_progress" });

  it("ignores an echo of our own push (same hash)", () => {
    const result = decideLinearPull({
      pulled: fields,
      labelsKnown: true,
      current,
      lastSyncedHash: hashTaskSyncFields(fields),
    });
    expect(result.apply).toBe(false);
  });

  it("applies a real change", () => {
    const result = decideLinearPull({
      pulled: { ...fields, title: "B" },
      labelsKnown: true,
      current,
      lastSyncedHash: hashTaskSyncFields(fields),
    });
    expect(result.apply).toBe(true);
  });

  it("keeps blocked when labels are unknown", () => {
    const blocked = { ...fields, status: "blocked" as const };
    const result = decideLinearPull({
      pulled: fields,
      labelsKnown: false,
      current: projectTaskRecordFixture({ status: "blocked" }),
      lastSyncedHash: hashTaskSyncFields(blocked),
    });
    expect(result.apply).toBe(false);
  });
});
