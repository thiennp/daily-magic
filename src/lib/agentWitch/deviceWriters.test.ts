import { describe, expect, it } from "vitest";

import {
  buildComputerAgents,
  parseHeartbeatWriters,
} from "@/lib/agentWitch/deviceWriters";

describe("device writers", () => {
  it("parses valid heartbeat entries and drops junk", () => {
    expect(
      parseHeartbeatWriters([
        { writerAgent: "codex", ready: true },
        { writerAgent: "cursor", ready: "yes" },
        { nope: 1 },
        "x",
      ]),
    ).toEqual([
      { writerAgent: "codex", ready: true, loggedIn: null },
      { writerAgent: "cursor", ready: false, loggedIn: null },
    ]);
    expect(parseHeartbeatWriters(undefined)).toBeNull();
  });

  it("a signed-out tool is never ready, even from an older host (77e29f7a)", () => {
    expect(
      parseHeartbeatWriters([
        { writerAgent: "codex", ready: true, loggedIn: false },
      ]),
    ).toEqual([{ writerAgent: "codex", ready: false, loggedIn: false }]);
  });

  it("makes every agent offline when the computer is offline", () => {
    const writers = [
      { writerAgent: "codex", ready: true },
      { writerAgent: "claude-cli", ready: true },
      { writerAgent: "cursor", ready: false },
    ];
    expect(buildComputerAgents(writers, false).map((a) => a.isOnline)).toEqual([
      false,
      false,
    ]);
    expect(buildComputerAgents(writers, true)).toEqual([
      {
        writerAgent: "codex",
        label: "Codex",
        isOnline: true,
        needsSignIn: false,
      },
      {
        writerAgent: "claude-cli",
        label: "Claude Code",
        isOnline: true,
        needsSignIn: false,
      },
    ]);
  });

  it("flags a tool that reported it is signed out", () => {
    const agents = buildComputerAgents(
      [{ writerAgent: "codex", ready: false, loggedIn: false }],
      true,
    );
    expect(agents[0]?.needsSignIn).toBe(true);
  });
});
