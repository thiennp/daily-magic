import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalHarnessInstalledSection } from "./buildAgentWitchLocalHarnessInstalledSection";

describe("buildAgentWitchLocalHarnessInstalledSection", () => {
  it("renders apply form when sets are installed", () => {
    const html = buildAgentWitchLocalHarnessInstalledSection({
      installed: {
        manifestUpdatedAt: "2026-01-01T00:00:00.000Z",
        sets: [
          {
            slug: "demo",
            name: "Demo",
            itemCount: 2,
            updatedAt: "2026-01-01T00:00:00.000Z",
          },
        ],
      },
      defaultProjectFolder: "/Users/me/repo",
    });

    expect(html).toContain('action="/harness/apply-to-project"');
    expect(html).toContain('name="applySet"');
    expect(html).toContain("Apply to project");
  });
});
