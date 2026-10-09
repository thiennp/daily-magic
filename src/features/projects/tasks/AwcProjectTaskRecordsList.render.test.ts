import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectTaskRecordsList from "@/features/projects/tasks/AwcProjectTaskRecordsList";
import { parseProjectTaskRecordsPayload } from "@/features/projects/tasks/utils/parseProjectTaskRecordsPayload";
import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

const render = (
  records: Parameters<typeof AwcProjectTaskRecordsList>[0]["records"],
  loadFailed = false,
) =>
  renderToStaticMarkup(
    createElement(AwcProjectTaskRecordsList, {
      projectId: "p1",
      records,
      loadFailed,
      reload: () => undefined,
      initialView: "list" as const,
    }),
  );

describe("AwcProjectTaskRecordsList (DF-024 Tasks tab rows)", () => {
  it("renders compact rows: status chip, owner, priority, stage, tip, waits-on", () => {
    const html = render([
      projectTaskRecordFixture({
        status: "in_progress",
        priority: "p0",
        stage: "build",
        tipSha: "52c4fe42abcdef",
        dependsOn: ["t0"],
        description: "Needs migration 109",
      }),
    ]);
    expect(html).toContain("Planned work");
    expect(html).toContain("Ship DF-024");
    expect(html).toContain("In progress");
    expect(html).toContain("Kai");
    expect(html).toContain("Urgent");
    expect(html).toContain("Build");
    expect(html).toContain("52c4fe42");
    expect(html).not.toContain("52c4fe42abcdef");
    expect(html).toContain("Waits on 1 task");
    expect(html).toContain("Needs migration 109");
    expect(html).not.toMatch(/purple|violet|#[0-9a-f]{6}/i);
  });

  it("hides when empty; shows the error line when the load failed", () => {
    expect(render([])).toBe("");
    expect(render([], true)).toContain("Could not load planned work.");
  });

  it("Tasks tab mounts the records list next to the runs panel", async () => {
    const { readFileSync } = await import("node:fs");
    const tab = readFileSync(
      "src/features/projects/tasks/AwcProjectTasksPanelWithRecords.tsx",
      "utf8",
    );
    expect(tab).toContain("useProjectTaskRecords(project.id)");
    expect(tab).toContain("<AwcProjectTaskRecordsList");
    expect(tab).toContain("<AwcProjectTasksPanel");
    const body = readFileSync(
      "src/features/projects/AwcProjectDetailTabPanelBody.tsx",
      "utf8",
    );
    expect(body).toContain(
      "<AwcProjectTasksPanelWithRecords project={project} />",
    );
  });
});

describe("parseProjectTaskRecordsPayload", () => {
  it("keeps valid rows, drops junk, non-ok → null", () => {
    const good = projectTaskRecordFixture();
    expect(
      parseProjectTaskRecordsPayload({ ok: true, tasks: [good, { id: 1 }] }),
    ).toEqual([good]);
    expect(parseProjectTaskRecordsPayload({ ok: false })).toBeNull();
  });
});
