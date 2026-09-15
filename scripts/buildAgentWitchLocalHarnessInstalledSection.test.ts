import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalHarnessInstalledSection } from "./buildAgentWitchLocalHarnessInstalledSection";

describe("buildAgentWitchLocalHarnessInstalledSection", () => {
  it("lists installed sets without apply-to-project form", () => {
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
    });

    expect(html).toContain("Demo");
    expect(html).not.toContain('action="/harness/apply-to-project"');
    expect(html).toContain('href="/projects"');
  });
});
