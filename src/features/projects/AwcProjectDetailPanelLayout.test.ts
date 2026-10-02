import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const detailPanelSource = readFileSync(
  path.join(process.cwd(), "src/features/projects/AwcProjectDetailPanel.tsx"),
  "utf8",
);

describe("AwcProjectDetailPanel layout", () => {
  it("places Project Access in a right column on xl wide screens", () => {
    expect(detailPanelSource).toMatch(
      /xl:grid-cols-\[minmax\(0,1fr\)_minmax\(18rem,22rem\)\]/,
    );
    expect(detailPanelSource).toMatch(/<aside[\s\S]*AwcProjectAccessPanel/);
    expect(detailPanelSource).not.toMatch(
      /AwcProjectRepoUrlsSection[\s\S]*AwcProjectAccessPanel[\s\S]*AwcProjectDeleteControl/,
    );
  });
});
