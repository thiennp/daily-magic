import { describe, expect, it } from "vitest";

import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  buildAgentLiveTerminalDisplay,
  buildAgentLiveTerminalLoadingLine,
  shouldShowAgentLiveTerminalLoadingIndicator,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";
import { AGENT_RUN_NEXT_ACTIONS_MARKER } from "@/lib/dispatch/agentRunNextActions.constant";

describe("buildAgentLiveTerminalDisplay", () => {
  it("shows only the bash prompt when idle", () => {
    expect(
      buildAgentLiveTerminalDisplay({
        output: "",
        status: "idle",
      }),
    ).toBe(AGENT_LIVE_BASH_PROMPT);
  });

  it("appends a fresh prompt after a finished run", () => {
    expect(
      buildAgentLiveTerminalDisplay({
        output: "hello\n",
        status: "finished",
      }),
    ).toBe(`hello\n${AGENT_LIVE_BASH_PROMPT}`);
  });

  it("shows the loading indicator while a run is active", () => {
    expect(shouldShowAgentLiveTerminalLoadingIndicator("streaming")).toBe(true);
    expect(shouldShowAgentLiveTerminalLoadingIndicator("finished")).toBe(false);
    expect(buildAgentLiveTerminalLoadingLine(2)).toBe("..");
    expect(buildAgentLiveTerminalLoadingLine(4)).toBe("...");
  });

  it("hides next-actions blocks from the terminal display", () => {
    expect(
      buildAgentLiveTerminalDisplay({
        output: `hello\n${AGENT_RUN_NEXT_ACTIONS_MARKER}\n1. Run lint`,
        status: "finished",
      }),
    ).toBe(`hello\n${AGENT_LIVE_BASH_PROMPT}`);
  });
});
