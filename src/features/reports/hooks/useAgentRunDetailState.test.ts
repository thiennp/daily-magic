import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("useAgentRunDetailState loading behavior (REPORTS-010)", () => {
  it("clears load error on not_found during poll refresh", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/reports/hooks/useAgentRunDetailState.ts",
      ),
      "utf8",
    );

    expect(source).toContain('outcome.status === "not_found"');
    expect(source).toContain("setLoadError(false)");
  });

  it("only toggles loading for explicit retry, not background poll", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/reports/hooks/useAgentRunDetailState.ts",
      ),
      "utf8",
    );

    expect(source).toContain("reloadRun({ showLoading: false })");
    expect(source).toContain("showLoading === true");
    expect(source).not.toMatch(
      /setInterval\([^)]*\)[\s\S]*showLoading:\s*true/,
    );
  });
});
