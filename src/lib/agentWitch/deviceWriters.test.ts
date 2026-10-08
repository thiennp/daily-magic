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
      { writerAgent: "codex", ready: true },
      { writerAgent: "cursor", ready: false },
    ]);
    expect(parseHeartbeatWriters(undefined)).toBeNull();
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
      { writerAgent: "codex", label: "Codex", isOnline: true },
      { writerAgent: "claude-cli", label: "Claude Code", isOnline: true },
    ]);
  });
});
