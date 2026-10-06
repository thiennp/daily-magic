import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (rel: string): string =>
  readFileSync(path.join(process.cwd(), "src/features/projects", rel), "utf8");

describe("Settings panel S0-2 runs without approval", () => {
  it("renders the switch for the owner only", () => {
    const panel = read("AwcProjectDetailSettingsPanel.tsx");
    expect(panel).toMatch(
      /\{isOwner \? \(\s*<AwcProjectSettingsRunsWithoutApprovalRow projectId=\{project\.id\} \/>\s*\) : null\}/,
    );
  });

  it("confirms ON with the same verb and saves OFF with no confirm", () => {
    const row = read(
      "settings/runsWithoutApproval/AwcProjectSettingsRunsWithoutApprovalRow.tsx",
    );
    expect(row).toContain("resolveRunsWithoutApprovalToggle");
    expect(row).toContain("setting.save(true)");
    expect(row).toContain("AwcRunsWithoutApprovalConfirmModal");
  });
});
