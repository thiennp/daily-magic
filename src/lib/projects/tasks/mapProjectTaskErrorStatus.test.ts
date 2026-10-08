import { describe, expect, it } from "vitest";

import { mapProjectTaskErrorStatus } from "@/lib/projects/tasks/mapProjectTaskErrorStatus";

describe("mapProjectTaskErrorStatus", () => {
  it.each([
    ["viewer_read_only", 403],
    ["forbidden", 403],
    ["not_found", 404],
    ["task_not_found", 404],
    ["invalid_transition", 409],
    ["update_conflict", 409],
    ["invalid_arguments", 400],
    ["invalid_priority", 400],
    ["owner_not_member", 400],
    ["self_dependency", 400],
    ["depends_on_not_found", 400],
  ] as const)("%s -> %i", (code, status) => {
    expect(mapProjectTaskErrorStatus(code)).toBe(status);
  });
});
