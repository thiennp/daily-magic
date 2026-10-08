import { describe, expect, it } from "vitest";

import { findProjectTaskStatusPath } from "@/lib/projects/tasks/findProjectTaskStatusPath";
import {
  PROJECT_TASK_STATUSES,
  PROJECT_TASK_TRANSITIONS,
} from "@/lib/projects/tasks/projectTaskTools.constant";

describe("findProjectTaskStatusPath", () => {
  it("returns [] for the same status and a direct move as one step", () => {
    expect(findProjectTaskStatusPath("queued", "queued")).toEqual([]);
    expect(findProjectTaskStatusPath("queued", "in_progress")).toEqual([
      "in_progress",
    ]);
  });

  it("walks through intermediate states", () => {
    expect(findProjectTaskStatusPath("queued", "done")).toEqual([
      "in_progress",
      "done",
    ]);
    expect(findProjectTaskStatusPath("done", "in_progress")).toEqual([
      "queued",
      "in_progress",
    ]);
  });

  it("every status reaches every other through valid moves", () => {
    for (const from of PROJECT_TASK_STATUSES) {
      for (const to of PROJECT_TASK_STATUSES) {
        const path = findProjectTaskStatusPath(from, to);
        expect(path).not.toBeNull();
        const chain = [from, ...(path ?? [])];
        chain.slice(1).forEach((s, i) => {
          expect(PROJECT_TASK_TRANSITIONS[chain[i]]).toContain(s);
        });
      }
    }
  });
});
