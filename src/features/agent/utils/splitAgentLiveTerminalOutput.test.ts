import { describe, expect, it } from "vitest";

import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  parseLatestAgentLiveTerminalNextActions,
  stripNextActionsFromTerminalOutput,
} from "@/features/agent/utils/splitAgentLiveTerminalOutput";
import { AGENT_RUN_NEXT_ACTIONS_MARKER } from "@/lib/dispatch/agentRunNextActions.constant";

describe("splitAgentLiveTerminalOutput", () => {
  it("strips a complete next-actions block from terminal output", () => {
    const output = `Done.\n${AGENT_RUN_NEXT_ACTIONS_MARKER}\n1. Run tests\n2. Open PR`;

    expect(stripNextActionsFromTerminalOutput(output)).toBe("Done.");
  });

  it("strips a partial marker while streaming", () => {
    expect(stripNextActionsFromTerminalOutput("Done.\n[[NEXT_ACT")).toBe(
      "Done.",
    );
  });

  it("parses next actions only from the latest response segment", () => {
    const output = [
      `${AGENT_LIVE_BASH_PROMPT}first task`,
      "old answer",
      AGENT_RUN_NEXT_ACTIONS_MARKER,
      "1. Old action",
      `${AGENT_LIVE_BASH_PROMPT}second task`,
      "new answer",
      AGENT_RUN_NEXT_ACTIONS_MARKER,
      "1. Run lint",
      "2. Commit changes",
    ].join("\n");

    expect(parseLatestAgentLiveTerminalNextActions(output)).toEqual([
      "Run lint",
      "Commit changes",
    ]);
  });

  it("returns no actions before the marker is complete", () => {
    const output = `${AGENT_LIVE_BASH_PROMPT}task\nWorking…\n[[NEXT_ACT`;

    expect(parseLatestAgentLiveTerminalNextActions(output)).toEqual([]);
  });
});
