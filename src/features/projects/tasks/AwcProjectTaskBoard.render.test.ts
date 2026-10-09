import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectTaskRecordsList from "@/features/projects/tasks/AwcProjectTaskRecordsList";
import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

const html = renderToStaticMarkup(
  createElement(AwcProjectTaskRecordsList, {
    projectId: "p1",
    records: [
      projectTaskRecordFixture({
        id: "a",
        title: "Ship board",
        status: "in_progress",
      }),
      projectTaskRecordFixture({
        id: "b",
        title: "Write docs",
        status: "done",
      }),
    ],
    loadFailed: false,
    reload: () => undefined,
  }),
);

describe("Tasks board (default view)", () => {
  it("shows a column per status with draggable cards", () => {
    for (const status of [
      "queued",
      "planned",
      "in_progress",
      "blocked",
      "done",
      "cancelled",
    ]) {
      expect(html).toContain(`data-board-column="${status}"`);
    }
    expect(html).toContain('draggable="true"');
    expect(html).toContain("Ship board");
    expect(html).toContain("Drag a card to another column");
  });
});

describe("Tasks board paging", () => {
  it("shows 10 cards per column and a Show 10 more button for the rest", () => {
    const many = Array.from({ length: 25 }, (_, i) =>
      projectTaskRecordFixture({
        id: `t${i}`,
        title: `Task ${i}`,
        status: "queued",
        updatedAt: `2026-01-${String(i + 1).padStart(2, "0")}`,
      }),
    );
    const page = renderToStaticMarkup(
      createElement(AwcProjectTaskRecordsList, {
        projectId: "p1",
        records: many,
        loadFailed: false,
        reload: () => undefined,
      }),
    );
    expect(page.match(/data-task-record-id=/g)).toHaveLength(10);
    expect(page).toContain("Show 10 more (15 left)");
  });
});
