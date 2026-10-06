import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("dashboard terminal subscribe ACL", () => {
  it("stays requester/executor-strict (no project-member widening)", () => {
    const source = readFileSync(
      path.join(
        process.cwd(),
        "src/lib/dispatch/handleDashboardTerminalSubscribeMessageAsync.ts",
      ),
      "utf8",
    );
    expect(source).toContain("getAgentRunForStrictParticipant");
    expect(source).not.toContain(
      'from "@/lib/dispatch/getAgentRunForParticipant"',
    );
  });
});
