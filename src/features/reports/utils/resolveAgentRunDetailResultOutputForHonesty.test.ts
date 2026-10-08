import { describe, expect, it, vi } from "vitest";

import { resolveAgentRunDetailResultOutputForHonesty } from "@/features/reports/utils/resolveAgentRunDetailResultOutputForHonesty";
import * as storeModule from "@/features/agent/utils/agentRunTerminalOutputStore";

vi.mock("@/features/agent/utils/agentRunTerminalOutputStore", () => ({
  loadAgentRunTerminalOutput: vi.fn(),
}));

describe("resolveAgentRunDetailResultOutputForHonesty", () => {
  it("prefers persisted resultOutput over injected terminal output when not a short meta", () => {
    vi.mocked(storeModule.loadAgentRunTerminalOutput).mockReturnValue("");
    const longOutput = "from-db".repeat(50); // longer than 120
    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s2",
        longOutput,
        "cached-only".repeat(50),
      ),
    ).toBe(longOutput);
  });

  it("uses injected terminal output when resultOutput is empty", () => {
    vi.mocked(storeModule.loadAgentRunTerminalOutput).mockReturnValue("");
    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s2",
        null,
        "spawn claude ENOENT",
      ),
    ).toBe("spawn claude ENOENT");
  });

  it("prefers browser output if resultOutput is Neon meta and browser output is longer", () => {
    const shortResult = "short neon meta"; // length < 120
    const longBrowserOutput = "browser-terminal".repeat(10); // length > shortResult.length

    vi.mocked(storeModule.loadAgentRunTerminalOutput).mockReturnValue(
      longBrowserOutput,
    );

    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s3",
        shortResult,
        null, // injected is null, uses loadAgentRunTerminalOutput
      ),
    ).toBe(longBrowserOutput);

    // Also with injected output
    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s4",
        shortResult,
        longBrowserOutput,
      ),
    ).toBe(longBrowserOutput);
  });

  it("does not prefer browser output if it is shorter than the result output even if result output is short", () => {
    const shortResult = "a bit longer than browser";
    const shorterBrowser = "short";

    vi.mocked(storeModule.loadAgentRunTerminalOutput).mockReturnValue(
      shorterBrowser,
    );

    expect(
      resolveAgentRunDetailResultOutputForHonesty(
        "run-s5",
        shortResult,
        shorterBrowser,
      ),
    ).toBe(shortResult);
  });
});
