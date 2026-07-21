import { describe, expect, it } from "vitest";

import { isAgentPtyRunAlive } from "./agentWitchShellSession";

describe("isAgentPtyRunAlive", () => {
  it("returns false when no agent PTY session exists for the run (AGENT-055)", () => {
    expect(isAgentPtyRunAlive("missing-run")).toBe(false);
  });
});
