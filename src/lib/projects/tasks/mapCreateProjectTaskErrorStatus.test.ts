import { describe, expect, it } from "vitest";

import { mapCreateProjectTaskErrorStatus } from "@/lib/projects/tasks/mapCreateProjectTaskErrorStatus";

describe("mapCreateProjectTaskErrorStatus", () => {
  it("maps access, cap and rate errors; the rest is a 400", () => {
    expect(mapCreateProjectTaskErrorStatus("viewer_read_only")).toBe(403);
    expect(mapCreateProjectTaskErrorStatus("not_found")).toBe(404);
    expect(mapCreateProjectTaskErrorStatus("task_cap_reached")).toBe(409);
    expect(mapCreateProjectTaskErrorStatus("rate_limited")).toBe(429);
    expect(mapCreateProjectTaskErrorStatus("title_required")).toBe(400);
  });
});
