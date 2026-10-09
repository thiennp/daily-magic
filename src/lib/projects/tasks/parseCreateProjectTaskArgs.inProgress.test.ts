import { describe, expect, it } from "vitest";

import { parseCreateProjectTaskArgs } from "@/lib/projects/tasks/parseProjectTaskToolArgs";

const base = { projectId: "p1", title: "Do it" };

describe("create_project_task initial status", () => {
  it.each(["queued", "planned", "in_progress"])("accepts %s", (status) => {
    const parsed = parseCreateProjectTaskArgs({ ...base, status });
    expect(parsed.ok && parsed.value.status).toBe(status);
  });

  it.each(["done", "blocked", "cancelled"])("rejects %s", (status) => {
    expect(parseCreateProjectTaskArgs({ ...base, status })).toEqual({
      ok: false,
      code: "invalid_status",
    });
  });
});
