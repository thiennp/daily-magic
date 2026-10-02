import { describe, expect, it } from "vitest";

import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";

describe("live agent guide leave_project", () => {
  it("lists leave_project in tools and projectCowork", () => {
    const guide = buildAgentAccessLiveGuide();
    const names = guide.tools.map((tool) => tool.name);
    expect(names).toContain("leave_project");
    expect(guide.projectCowork.tools).toContain("leave_project");
  });
});
