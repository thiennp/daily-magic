import { describe, expect, it } from "vitest";

import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  buildAgentLiveTerminalDisplay,
  buildAgentLiveTerminalLoadingLine,
  shouldShowAgentLiveTerminalLoadingIndicator,
} from "@/features/agent/utils/buildAgentLiveTerminalDisplay";

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
});
