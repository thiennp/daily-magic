import { describe, expect, it } from "vitest";

import { buildOneWindowQuickChips } from "@/features/projects/messenger/oneWindow/oneWindowQuickChips";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const task = (over: Partial<ProjectTaskRecord>): ProjectTaskRecord =>
  ({
    id: "t",
    title: "T",
    status: "queued",
    updatedAt: "2026-01-01",
    ...over,
  }) as ProjectTaskRecord;

describe("buildOneWindowQuickChips", () => {
  it("offers the two newest unstarted tickets, then the shortcuts", () => {
    const chips = buildOneWindowQuickChips([
      task({ id: "a", title: "ENG-1 Old", updatedAt: "2026-01-01" }),
      task({ id: "b", title: "ENG-2 New", updatedAt: "2026-03-01" }),
      task({ id: "c", title: "ENG-3 Mid", updatedAt: "2026-02-01" }),
      task({ id: "d", title: "Started", status: "in_progress" }),
    ]);
    expect(chips.map((c) => c.label)).toEqual([
      "Work on ENG-2 New",
      "Work on ENG-3 Mid",
      "Summarize progress",
      "What is blocked?",
    ]);
  });
  it("clips long titles in the label only", () => {
    const [chip] = buildOneWindowQuickChips([task({ title: "x".repeat(60) })]);
    expect(chip.label.length).toBeLessThan(45);
    expect(chip.text).toBe(`Work on ${"x".repeat(60)}`);
  });
});
