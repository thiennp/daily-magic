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
