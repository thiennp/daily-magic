import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (rel: string): string =>
  readFileSync(
    path.join(process.cwd(), "src/features/projects/tasks", rel),
    "utf8",
  );

describe("Tasks tab parity r1 — design EN + product rules", () => {
  it("offline EN has no trailing period; back is ← Tasks; Status heading", () => {
    const copy = read("projectPageTasksCopy.constant.ts");
    expect(copy).toContain(
      'offline: "Connection to the project computer was lost"',
    );
    expect(copy).not.toContain(
      'offline: "Connection to the project computer was lost."',
    );
    expect(copy).toContain('backToList: "← Tasks"');
    expect(copy).toContain('statusTimeline: "Status"');
    expect(copy).toContain('empty: "No tasks yet"');
    expect(copy).toContain('emptyFiltered: "No matching tasks"');
  });

  it("Load older is not rendered on Tasks detail (stays in Chat)", () => {
    const detail = read("AwcProjectTaskDetail.tsx");
    expect(detail).not.toContain("C.loadOlder");
    expect(detail).not.toContain("onLoadOlder");
    expect(detail).toContain("C.backToList");
    // Open history / Open report live in the actions block.
    const actions = read("AwcProjectTaskDetailActions.tsx");
    expect(actions).toContain("C.openHistory");
    expect(actions).toContain("C.openReport");
  });

  it("list rows order title · status · relative time; empty uses design copy", () => {
    const list = read("AwcProjectTasksList.tsx");
    const row = read("AwcProjectTaskListRow.tsx");
    expect(row).toContain("formatRelativeTimeAgo");
    expect(row).toContain("AwcProjectTaskStatusChip");
    expect(list).toContain("C.emptyFiltered");
    expect(list).toContain("C.clearFilters");
  });

  it("Tasks panel does not embed Screen E (Settings hosts it); no Load older wiring", () => {
    const panel = read("AwcProjectTasksPanel.tsx");
    expect(panel).not.toContain("AwcProjectTasksChatSettings");
    expect(panel).not.toContain("onLoadOlder");
    expect(panel).toContain("hasActiveFilters");
  });

  it("chat settings keep show_in_chat / tasks_tab_only / compact_chips values", () => {
    const settings = read("AwcProjectTasksChatSettings.tsx");
    expect(settings).toContain("show_in_chat");
    expect(settings).toContain("tasks_tab_only");
    expect(settings).toContain("compact_chips");
    expect(settings).toContain("C.showInChat");
    expect(settings).toContain("C.tasksTabOnly");
    expect(settings).toContain("C.compactChips");
  });
});
