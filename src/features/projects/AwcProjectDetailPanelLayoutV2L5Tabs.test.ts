import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const P = "src/features/projects";

describe("project layout v2 L5 tab panels", () => {
  it("Reports/Library are L6 panels (stubs gone); no L3 Activity redesign", () => {
    const body = readFileSync(
      path.join(process.cwd(), `${P}/AwcProjectDetailTabPanelBody.tsx`),
      "utf8",
    );
    expect(body).not.toContain("AwcProjectTabStub");
    expect(body).not.toContain("STUB_TABS");
    expect(body).toContain("AwcProjectDetailSettingsPanel");
    expect(body).not.toContain("AwcProjectActivity");
    expect(body).not.toMatch(/0fd0078b|layout-v2-l3/i);
  });
});
