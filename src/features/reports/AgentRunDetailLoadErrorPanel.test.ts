import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("AgentRunDetail load failure UX", () => {
  it("surfaces retry when agent-run detail fetch fails", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/reports/AgentRunDetailLoadErrorPanel.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("Could not load this run");
    expect(source).toContain("Try again");
  });
});
