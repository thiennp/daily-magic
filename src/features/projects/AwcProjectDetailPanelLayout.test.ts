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

describe("AwcProjectDetailPanel layout", () => {
  it("places Project Access in a page-level right column on xl wide screens", () => {
    expect(detailPanelSource).toMatch(
      /xl:grid-cols-\[minmax\(0,1fr\)_minmax\(18rem,22rem\)\]/,
    );
    expect(detailPanelSource).toMatch(/<aside[\s\S]*AwcProjectAccessPanel/);
    expect(detailPanelSource).toMatch(
      /AwcProjectDeleteControl[\s\S]*variant="detail"/,
    );
    // Access must sit outside the main AppPanel (page-level column), not nested
    // only as the right side of a middle-column card.
    expect(detailPanelSource).toMatch(
      /<\/AppPanel>[\s\S]*<aside[\s\S]*AwcProjectAccessPanel/,
    );
    expect(detailPanelSource).not.toMatch(
      /AwcProjectRepoUrlsSection[\s\S]*AwcProjectAccessPanel[\s\S]*AwcProjectDeleteControl/,
    );
  });

  it("uses wide AppShell so Access can reach the outermost page right column", () => {
    expect(detailPageSource).toMatch(/<AppShell>/);
    expect(detailPageSource).not.toMatch(/APP_SHELL_NARROW_CONTENT_CLASS/);
  });
});
