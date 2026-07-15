import { describe, expect, it } from "vitest";

import {
  AGENT_LIVE_BASH_PROMPT,
  appendAgentLiveTerminalCommand,
  formatAgentLiveTerminalCommandLine,
} from "@/features/agent/utils/agentLiveTerminalPrompt.constant";

describe("appendAgentLiveTerminalCommand", () => {
  it("builds the first command entry from an empty terminal", () => {
    const commandLine = formatAgentLiveTerminalCommandLine("run lint");
    expect(appendAgentLiveTerminalCommand("", commandLine)).toBe(
      `${AGENT_LIVE_BASH_PROMPT}${commandLine}\n`,
    );
  });

  it("appends after the idle prompt without duplicating it", () => {
    const firstCommand = formatAgentLiveTerminalCommandLine("run lint");
    const finishedOutput = `${AGENT_LIVE_BASH_PROMPT}${firstCommand}\nall good\n${AGENT_LIVE_BASH_PROMPT}`;
    const secondCommand = formatAgentLiveTerminalCommandLine("run test");

    expect(appendAgentLiveTerminalCommand(finishedOutput, secondCommand)).toBe(
      `${finishedOutput}${secondCommand}\n`,
    );
  });
});
