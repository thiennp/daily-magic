import { describe, expect, it } from "vitest";

import { REGISTER_ACCOUNT_TOOL } from "@/lib/agentAccess/registerAccountTool.constant";

describe("register_account tool description", () => {
  it("writes AgentWitch as one word", () => {
    expect(REGISTER_ACCOUNT_TOOL.description).toMatch(
      /^Create an AgentWitch account for this AI\./,
    );
    expect(REGISTER_ACCOUNT_TOOL.description).not.toContain("Agent Witch");
  });
});
