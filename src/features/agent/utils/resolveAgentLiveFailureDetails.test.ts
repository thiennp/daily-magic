import { describe, expect, it } from "vitest";

import { resolveAgentLiveFailureDetails } from "@/features/agent/utils/resolveAgentLiveFailureDetails";

/** B1 (69e669e2) raw log from Testi's eefc3380 run. */
const B1_OUTPUT = [
  'agent-witch@linux ~ $ agy --sandbox -p "Run workflow: Add vibe coding app feature"',
  "Preparing Antigravity for this session…",
  "\u001b[31mThe agent process was stopped unexpectedly (killed by SIGKILL).\u001b[0m",
].join("\n");

describe("resolveAgentLiveFailureDetails (73181622)", () => {
  it("keeps only the plain reason", () => {
    expect(resolveAgentLiveFailureDetails(B1_OUTPUT)).toBe(
      "The agent process was stopped unexpectedly (killed by SIGKILL).",
    );
  });

  it("is null when the run printed nothing useful", () => {
    expect(
      resolveAgentLiveFailureDetails("agent-witch@mac ~ % claude -p x\n"),
    ).toBeNull();
  });
});
