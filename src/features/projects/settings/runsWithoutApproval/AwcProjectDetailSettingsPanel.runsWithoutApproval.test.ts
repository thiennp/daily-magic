import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (rel: string): string =>
  readFileSync(path.join(process.cwd(), "src/features/projects", rel), "utf8");

describe("Settings panel S0-2 runs without approval", () => {
  it("shows the row to everyone; only the owner can change it", () => {
    const panel = read("AwcProjectDetailSettingsPanel.tsx");
    expect(panel).toMatch(
      /<AwcProjectSettingsRunsWithoutApprovalRow\s+projectId=\{project\.id\}\s+canEdit=\{isOwner\}\s+\/>/,
    );
    expect(panel).not.toMatch(
      /isOwner \? \(\s*<AwcProjectSettingsRunsWithoutApprovalRow/,
    );
  });

  it("confirms ON, saves OFF with no confirm, and never toggles for non-owners", () => {
    const row = read(
      "settings/runsWithoutApproval/AwcProjectSettingsRunsWithoutApprovalRow.tsx",
    );
    expect(row).toContain("resolveRunsWithoutApprovalToggle");
    expect(row).toContain("busy: !canEdit ||");
    expect(row).toContain("setting.save(true)");
    expect(row).toContain("AwcRunsWithoutApprovalConfirmModal");
  });
});
