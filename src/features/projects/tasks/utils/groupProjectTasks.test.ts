import { describe, expect, it } from "vitest";

import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import {
  countOpenProjectTasks,
  groupProjectTasksByAssistant,
} from "@/features/projects/tasks/utils/groupProjectTasks";

const task = (
  id: string,
  status: ProjectTaskMeta["status"],
  assistantName: string | null,
): ProjectTaskMeta => ({ id, status, assistantName }) as ProjectTaskMeta;

describe("countOpenProjectTasks", () => {
  it("counts queued, running and stalled only", () => {
    expect(
      countOpenProjectTasks([
        task("1", "queued", "A"),
        task("2", "running", "A"),
        task("3", "stalled", "B"),
        task("4", "done", "B"),
        task("5", "failed", "B"),
        task("6", "cancelled", "B"),
      ]),
    ).toBe(3);
  });
});

describe("groupProjectTasksByAssistant", () => {
  it("groups by assistant name in order of first appearance", () => {
    const groups = groupProjectTasksByAssistant([
      task("1", "done", "Magi"),
      task("2", "done", "Claude"),
      task("3", "queued", "Magi"),
    ]);
    expect(groups.map((g) => [g.name, g.tasks.map((t) => t.id)])).toEqual([
      ["Magi", ["1", "3"]],
      ["Claude", ["2"]],
    ]);
  });

  it("puts tasks without an assistant name under Assistant", () => {
    const groups = groupProjectTasksByAssistant([
      task("1", "done", null),
      task("2", "done", "  "),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0]?.name).toBe("Assistant");
  });
});
