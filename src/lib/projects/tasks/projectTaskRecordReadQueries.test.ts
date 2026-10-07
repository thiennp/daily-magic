import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectTaskRecords } from "@/lib/projects/tasks/projectTaskRecordReadQueries";

const h = vi.hoisted(() => ({
  calls: [] as { text: string; values: unknown[] }[],
  rows: [] as Record<string, unknown>[],
}));

vi.mock("@/lib/db", () => ({
  getSql:
    () =>
    (strings: TemplateStringsArray, ...values: unknown[]) => {
      h.calls.push({ text: strings.join("?"), values });
      return Promise.resolve(h.rows);
    },
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/tasks/ensureProjectTaskRecordsSchema", () => ({
  ensureProjectTaskRecordsSchema: vi.fn(async () => undefined),
}));

describe("listProjectTaskRecords — Tasks tab list query (DF-024)", () => {
  beforeEach(() => {
    h.calls.length = 0;
    h.rows = [];
  });

  it("returns created records newest first, scoped to the project, meta only", async () => {
    h.rows = [
      {
        id: "task-2",
        project_id: "p1",
        title: "Review EN",
        description: "short",
        status: "in_progress",
        priority: "p1",
        stage: "en",
        tip_sha: "abc1234",
        depends_on: ["task-1"],
        owner_membership_id: "seat-bot",
        owner_display_name: "Kai",
        created_by_user_id: "bot-user",
        created_by_membership_id: "seat-bot",
        plan_item_id: null,
        started_at: new Date("2026-10-07T10:05:00Z"),
        blocked_at: null,
        done_at: null,
        stage_times: { en: "2026-10-07T10:01:00Z", bogus: "x" },
        created_at: new Date("2026-10-07T10:00:00Z"),
        updated_at: new Date("2026-10-07T10:05:00Z"),
      },
    ];
    const tasks = await listProjectTaskRecords("p1");
    expect(tasks).toEqual([
      expect.objectContaining({
        id: "task-2",
        status: "in_progress",
        priority: "p1",
        ownerDisplayName: "Kai",
        dependsOn: ["task-1"],
        startedAt: "2026-10-07T10:05:00.000Z",
        stageTimes: { en: "2026-10-07T10:01:00Z" },
      }),
    ]);
    const call = h.calls[0];
    expect(call?.values).toContain("p1");
    expect(call?.text).toContain("FROM project_task_records");
    expect(call?.text).toContain("ORDER BY t.created_at DESC, t.id DESC");
  });
});
