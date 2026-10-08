import { describe, expect, it } from "vitest";

import {
  linearPriorityForTask,
  linearStateTypeForStatus,
  priorityFromLinear,
  statusFromLinearState,
} from "@/lib/projects/taskSync/linearTaskMapping";

describe("linear task mapping", () => {
  it("maps AW status to a Linear state type", () => {
    expect(linearStateTypeForStatus("queued")).toBe("unstarted");
    expect(linearStateTypeForStatus("planned")).toBe("backlog");
    expect(linearStateTypeForStatus("blocked")).toBe("started");
    expect(linearStateTypeForStatus("done")).toBe("completed");
  });

  it("maps Linear state type back, honouring the Blocked label", () => {
    expect(statusFromLinearState("backlog", false)).toBe("planned");
    expect(statusFromLinearState("unstarted", false)).toBe("queued");
    expect(statusFromLinearState("triage", false)).toBe("queued");
    expect(statusFromLinearState("started", false)).toBe("in_progress");
    expect(statusFromLinearState("started", true)).toBe("blocked");
    expect(statusFromLinearState("completed", false)).toBe("done");
    expect(statusFromLinearState("canceled", false)).toBe("done");
  });

  it("maps priorities both ways", () => {
    expect(linearPriorityForTask(null)).toBe(0);
    expect(linearPriorityForTask("p0")).toBe(1);
    expect(linearPriorityForTask("p3")).toBe(4);
    expect(priorityFromLinear(0)).toBeNull();
    expect(priorityFromLinear(2)).toBe("p1");
    expect(priorityFromLinear(3)).toBe("p2");
    expect(priorityFromLinear("x")).toBeNull();
  });
});
