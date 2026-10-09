import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectTaskRecordsList from "@/features/projects/tasks/AwcProjectTaskRecordsList";
import { projectTaskRecordFixture as task } from "@/lib/projects/tasks/projectTask.fixtures";

const records = [
  task({
    id: "a",
    title: "Old queued",
    status: "queued",
    updatedAt: "2026-10-08T08:00:00Z",
  }),
  task({
    id: "b",
    title: "Active work",
    status: "in_progress",
    updatedAt: "2026-10-08T09:00:00Z",
  }),
  task({
    id: "c",
    title: "Finished",
    status: "done",
    updatedAt: "2026-10-08T07:00:00Z",
  }),
];
const render = () =>
  renderToStaticMarkup(
    createElement(AwcProjectTaskRecordsList, {
      projectId: "p1",
      records,
      loadFailed: false,
      reload: () => undefined,
      initialView: "list" as const,
    }),
  );

describe("AwcProjectTaskRecordsList tabs + sort", () => {
  it("renders a status tablist with counts, In progress selected by default", () => {
    const html = render();
    expect(html).toContain('role="tablist"');
    for (const t of [
      "all",
      "in_progress",
      "blocked",
      "queued",
      "planned",
      "done",
      "cancelled",
    ]) {
      expect(html).toContain(`data-task-record-tab="${t}"`);
    }
    expect(html).toMatch(/data-task-record-tab="all"[^>]*>All<span[^>]*>3</);
    expect(html).toMatch(
      /aria-selected="true"[^>]*data-task-record-tab="in_progress"/,
    );
    expect(html).toMatch(
      /data-task-record-tab="blocked"[^>]*>Blocked<span[^>]*>0</,
    );
  });

  it("lists only in-progress work by default and offers every sort key", () => {
    const html = render();
    expect(html).toContain("Active work");
    expect(html).not.toContain("Old queued");
    expect(html).not.toContain("Finished");
    for (const label of [
      "Last updated",
      "Date created",
      "Priority",
      "Status",
      "Title",
    ]) {
      expect(html).toContain(`>${label}</option>`);
    }
    expect(html).toContain('data-sort-dir="desc"');
  });
});
