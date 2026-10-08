import { beforeEach, describe, expect, it, vi } from "vitest";

import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

const push = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/taskSync/pushTaskToLinear", () => ({
  pushTaskToLinear: push,
}));

import { afterProjectTaskWrite } from "@/lib/projects/tasks/afterProjectTaskWrite";

describe("afterProjectTaskWrite origin guard", () => {
  beforeEach(() => push.mockReset());

  it("pushes local writes", async () => {
    const task = projectTaskRecordFixture({});
    await afterProjectTaskWrite({ task, origin: "local" });
    expect(push).toHaveBeenCalledWith(task);
  });

  it("never pushes writes that came from Linear", async () => {
    await afterProjectTaskWrite({
      task: projectTaskRecordFixture({}),
      origin: "linear",
    });
    expect(push).not.toHaveBeenCalled();
  });
});
