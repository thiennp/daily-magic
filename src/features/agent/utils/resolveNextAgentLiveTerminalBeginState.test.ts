import { describe, expect, it } from "vitest";

import { resolveNextAgentLiveTerminalBeginState } from "@/features/agent/utils/resolveNextAgentLiveTerminalBeginState";
import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";

const failedRun: AgentLiveTerminalState = {
  activeRunId: "b8cde711",
  output:
    'agent-witch@mac ~ % agy --sandbox -p "Run workflow"\nerror: Individual quota reached.\n',
  status: "error",
  pendingInput: null,
  pendingCommandLine: null,
  sessionWriterAgent: "antigravity",
  sessionDeviceId: "linux-1",
  sessionWriterSessionId: null,
};

describe("resolveNextAgentLiveTerminalBeginState", () => {
  it("fresh Start replaces the previous run's terminal (FAIL1: no stale 429 first)", () => {
    const next = resolveNextAgentLiveTerminalBeginState(
      failedRun,
      'agy --sandbox -p "Run workflow"',
      "antigravity",
      "linux-1",
      { fresh: true },
    );

    expect(next.output).not.toContain("quota");
    expect(next.status).toBe("starting");
    expect(next.sessionDeviceId).toBe("linux-1");
  });

  it("a follow-up still continues the open thread", () => {
    const next = resolveNextAgentLiveTerminalBeginState(
      failedRun,
      'agy --continue --sandbox -p "more"',
      "antigravity",
      "linux-1",
    );

    expect(next.output).toContain("quota");
  });

  it("a different writer starts fresh instead of continuing (37874fdc)", () => {
    const next = resolveNextAgentLiveTerminalBeginState(
      { ...failedRun, sessionWriterAgent: "codex" },
      'agy --sandbox -p "Run workflow"',
      "antigravity",
      "linux-1",
    );

    expect(next.sessionWriterAgent).toBe("antigravity");
    expect(next.output).not.toContain("quota");
  });

  it("a different computer starts fresh instead of continuing (ed42d8ce)", () => {
    const next = resolveNextAgentLiveTerminalBeginState(
      failedRun,
      'agy --sandbox -p "Run workflow"',
      "antigravity",
      "linux-2",
    );

    expect(next.output).not.toContain("quota");
    expect(next.sessionDeviceId).toBe("linux-2");
  });
});
