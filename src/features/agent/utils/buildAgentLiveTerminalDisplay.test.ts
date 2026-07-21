import { describe, expect, it } from "vitest";

import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import {
  AGENT_LIVE_TERMINAL_PLEASE_ANSWER_LINE,
  buildAgentLiveTerminalActivityLine,
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

  it("AGENT-049: shows please answer instead of dots while awaiting input", () => {
    expect(
      buildAgentLiveTerminalActivityLine({
        awaitingUserAnswer: true,
        loadingDotCount: 2,
      }),
    ).toBe(AGENT_LIVE_TERMINAL_PLEASE_ANSWER_LINE);
    expect(
      buildAgentLiveTerminalActivityLine({
        awaitingUserAnswer: false,
        loadingDotCount: 2,
      }),
    ).toBe("..");
  });

  it("shows the pending command while a writer session is starting", () => {
    expect(
      buildAgentLiveTerminalDisplay({
        output: "",
        status: "starting",
        pendingCommandLine: "cursor agent",
      }),
    ).toBe(`${AGENT_LIVE_BASH_PROMPT}cursor agent\n`);
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
