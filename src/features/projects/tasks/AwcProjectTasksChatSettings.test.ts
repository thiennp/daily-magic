import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("Tasks chat settings — screen E", () => {
  it("offers Show in chat / Tasks tab only / Compact; default lean Tasks tab", () => {
    const settings = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/tasks/AwcProjectTasksChatSettings.tsx",
      ),
      "utf8",
    );
    const vis = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/tasks/projectTasksChatVisibility.ts",
      ),
      "utf8",
    );
    const row = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/messenger/AwcMessengerAiSessionRow.tsx",
      ),
      "utf8",
    );
    expect(settings).toContain("show_in_chat");
    expect(settings).toContain("tasks_tab_only");
    expect(settings).toContain("compact_chips");
    expect(vis).toContain('PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT');
    expect(vis).toContain('"tasks_tab_only"');
    expect(row).toContain('chatVisibility === "tasks_tab_only"');
    expect(row).toContain("return null");
  });
});
