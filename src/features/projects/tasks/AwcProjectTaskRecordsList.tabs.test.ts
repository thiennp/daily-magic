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
    }),
  );

describe("AwcProjectTaskRecordsList tabs + sort", () => {
  it("renders a status tablist with counts, All selected by default", () => {
    const html = render();
    expect(html).toContain('role="tablist"');
    for (const t of [
      "all",
      "in_progress",
      "blocked",
      "queued",
      "planned",
      "done",
    ]) {
      expect(html).toContain(`data-task-record-tab="${t}"`);
    }
    expect(html).toMatch(/data-task-record-tab="all"[^>]*>All<span[^>]*>3</);
    expect(html).toMatch(/aria-selected="true"[^>]*data-task-record-tab="all"/);
    expect(html).toMatch(
      /data-task-record-tab="blocked"[^>]*>Blocked<span[^>]*>0</,
    );
  });

  it("lists newest-updated first by default and offers every sort key", () => {
    const html = render();
    expect(html.indexOf("Active work")).toBeLessThan(
      html.indexOf("Old queued"),
    );
    expect(html.indexOf("Old queued")).toBeLessThan(html.indexOf("Finished"));
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
