import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const detailPanelSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailPanel.tsx"),
  "utf8",
);

const detailPageSource = readFileSync(
  path.join(process.cwd(), "src/app/(app)/projects/[projectId]/page.tsx"),
  "utf8",
);

const headerSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailHeader.tsx"),
  "utf8",
);

describe("AwcProjectDetailPanel layout S1 shell", () => {
  it("uses shell header + tab bar (no purple proposal banner)", () => {
    expect(detailPanelSource).toContain("AwcProjectDetailHeader");
    expect(detailPanelSource).toContain("AwcProjectDetailTabBar");
    expect(detailPanelSource).toContain("AwcProjectDetailTabPanels");
    expect(detailPanelSource).not.toMatch(/proposal|Bản thiết kế|đề xuất/i);
    expect(detailPageSource).not.toMatch(/proposal|Bản thiết kế|đề xuất/i);
  });

  it("keeps wide AppShell and drops the old page title chrome", () => {
    expect(detailPageSource).toMatch(/<AppShell>/);
    expect(detailPageSource).not.toMatch(/APP_SHELL_NARROW_CONTENT_CLASS/);
    expect(detailPageSource).not.toContain("AppPageHeader");
  });

  it("header path area uses min-w-0 for mobile overflow", () => {
    expect(headerSource).toContain("min-w-0");
    expect(headerSource).toContain("AwcProjectPathDisplay");
    expect(headerSource).not.toMatch(/direction\s*:\s*rtl/);
  });
});
