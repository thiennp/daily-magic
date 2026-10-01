import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useAgentRunsRemoteSync loading behavior (REPORTS-009)", () => {
  it("does not mark loading on background poll refreshes", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/reports/hooks/useAgentRunsRemoteSync.ts",
      ),
      "utf8",
    );

    expect(source).toContain("void loadRuns({ showLoading: true })");
    expect(source).toContain("void loadRuns({ showLoading: false })");
    expect(source).not.toMatch(
      /setInterval\([^)]*\)[\s\S]*showLoading:\s*true/,
    );
  });
});
