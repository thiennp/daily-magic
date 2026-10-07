import { describe, expect, it } from "vitest";

import {
  PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT,
  parseProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTasksChatVisibility";

describe("projectTasksChatVisibility — chat stays clean by default", () => {
  it("defaults to tasks_tab_only", () => {
    expect(PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT).toBe("tasks_tab_only");
    expect(parseProjectTasksChatVisibility(null)).toBe("tasks_tab_only");
    expect(parseProjectTasksChatVisibility("nope")).toBe("tasks_tab_only");
  });

  it("accepts the three EN PASS options", () => {
    expect(parseProjectTasksChatVisibility("show_in_chat")).toBe("show_in_chat");
    expect(parseProjectTasksChatVisibility("tasks_tab_only")).toBe(
      "tasks_tab_only",
    );
    expect(parseProjectTasksChatVisibility("compact_chips")).toBe(
      "compact_chips",
    );
  });
});
