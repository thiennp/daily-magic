import { describe, expect, it } from "vitest";

import { AGENT_RUN_USAGE, parseAgentRunArgs } from "./parseAgentRunArgs";

describe("parseAgentRunArgs", () => {
  it("parses flags and the CLI after --", () => {
    expect(
      parseAgentRunArgs(["--project", "p1", "--seat=m1", "--", "claude", "-c"]),
    ).toEqual({
      projectId: "p1",
      membershipId: "m1",
      command: "claude",
      args: ["-c"],
    });
  });

  it("requires project, seat and a command", () => {
    expect(parseAgentRunArgs(["--seat", "m1", "--", "claude"])).toBe(
      AGENT_RUN_USAGE,
    );
    expect(parseAgentRunArgs(["--project", "p1", "--seat", "m1"])).toBe(
      AGENT_RUN_USAGE,
    );
    expect(parseAgentRunArgs(["--project", "p1", "--seat", "m1", "--"])).toBe(
      AGENT_RUN_USAGE,
    );
  });

  it("rejects unsafe ids", () => {
    expect(
      parseAgentRunArgs(["--project", "../x", "--seat", "m1", "--", "claude"]),
    ).toContain("may only contain");
  });
});
