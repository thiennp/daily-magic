import { describe, expect, it } from "vitest";

import {
  isAgentRunLiveTerminalActive,
  registerAgentRunLiveTerminal,
} from "./registerAgentRunLiveTerminal";

describe("registerAgentRunLiveTerminal", () => {
  it("tracks active run ids until unregister", () => {
    expect(isAgentRunLiveTerminalActive("run-1")).toBe(false);

    const unregister = registerAgentRunLiveTerminal("run-1");
    expect(isAgentRunLiveTerminalActive("run-1")).toBe(true);

    unregister();
    expect(isAgentRunLiveTerminalActive("run-1")).toBe(false);
  });
});
