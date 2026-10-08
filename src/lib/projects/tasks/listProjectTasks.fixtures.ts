/** project_task_records row (+ owner join + cursor_at) for list_project_tasks tests. */
export const listProjectTaskRow = (
  id: string,
  over: Record<string, unknown> = {},
): Record<string, unknown> => ({
  id,
  project_id: "p1",
  title: `Task ${id}`,
  description: "short",
  status: "in_progress",
  priority: "p1",
  stage: "build",
  tip_sha: "abc1234",
  depends_on: ["task-0"],
  owner_membership_id: "seat-bot",
  owner_display_name: "Kai",
  created_by_user_id: "bot-user",
  created_by_membership_id: "seat-bot",
  plan_item_id: null,
  started_at: new Date("2026-10-07T10:05:00Z"),
  blocked_at: null,
  done_at: null,
  stage_times: { build: "2026-10-07T10:01:00Z" },
  created_at: new Date("2026-10-07T10:00:00Z"),
  updated_at: new Date("2026-10-07T10:05:00Z"),
  cursor_at: "2026-10-07T10:05:00.123456Z",
  ...over,
});

/** Tagged-template sql stub recording each call; returns `rows()`. */
export const recordingSql =
  (
    calls: { text: string; values: unknown[] }[],
    rows: () => Record<string, unknown>[],
  ) =>
  () =>
  (strings: TemplateStringsArray, ...values: unknown[]) => {
    calls.push({ text: strings.join("?"), values });
    return Promise.resolve(rows());
  };
