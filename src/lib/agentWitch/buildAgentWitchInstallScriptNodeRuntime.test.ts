import { describe, expect, it } from "vitest";

import { AGENT_WITCH_MIN_NODE_MAJOR } from "@/lib/agentWitch/agentWitchNodeRuntime.constant";
import { buildAgentWitchInstallScriptNodeRuntime } from "@/lib/agentWitch/buildAgentWitchInstallScriptNodeRuntime";

describe("buildAgentWitchInstallScriptNodeRuntime", () => {
  it("AGENT-065: prompts before Homebrew install when Node is missing or too old", () => {
    const block = buildAgentWitchInstallScriptNodeRuntime();

    expect(block).toContain(`major < ${AGENT_WITCH_MIN_NODE_MAJOR}`);
    expect(block).toContain("agent_witch_read_yes_no");
    expect(block).toContain("Install Node.js now using Homebrew?");
    expect(block).toContain("Upgrade Node.js now using Homebrew?");
    expect(block).toContain("Upgrade declined.");
    expect(block).toContain("Install cancelled.");
    expect(block).toContain("nodejs.org");
  });
});
