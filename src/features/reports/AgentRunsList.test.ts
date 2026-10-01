import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("AgentRunsList load failure UX", () => {
  it("surfaces retry when agent-runs fetch fails", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/reports/AgentRunsListLoadErrorPanel.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("Could not load your reports");
    expect(source).toContain("Try again");
  });
});
