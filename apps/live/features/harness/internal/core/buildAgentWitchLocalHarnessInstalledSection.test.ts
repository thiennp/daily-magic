import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalHarnessInstalledSection } from "./buildAgentWitchLocalHarnessInstalledSection";

describe("buildAgentWitchLocalHarnessInstalledSection", () => {
  it("lists installed sets without apply-to-project form", () => {
    const html = buildAgentWitchLocalHarnessInstalledSection({
      cloudAppOrigin: "https://www.agentwitch.com",
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
    expect(html).toContain("installed from AgentWitch Cloud");
    expect(html).not.toContain("from AgentWitch Local");
    expect(html).toContain("Browse playbooks in AgentWitch Cloud");
    expect(html).toContain('href="https://www.agentwitch.com/marketplace"');
    expect(html).not.toContain("Browse playbooks on AgentWitch Local");
  });

  it("points the empty state at Console marketplace", () => {
    const html = buildAgentWitchLocalHarnessInstalledSection({
      cloudAppOrigin: "https://www.agentwitch.com/",
      installed: { manifestUpdatedAt: null, sets: [] },
    });

    expect(html).toContain(
      "Install playbooks in AgentWitch Cloud — files land in your profile harness on this computer.",
    );
    expect(html).toContain("Browse playbooks in AgentWitch Cloud");
    expect(html).toContain('href="https://www.agentwitch.com/marketplace"');
    expect(html).not.toContain("AgentWitch Local");
  });
});
