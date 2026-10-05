import { describe, expect, it } from "vitest";

import { resolveAgentRunHonestyCompletedTerminalOutcome } from "@/lib/dispatch/resolveAgentRunHonestyCompletedTerminalOutcome";
import { tryResolveAgentRunWriterPrepareFailureTerminalOutcome } from "@/lib/dispatch/tryResolveAgentRunWriterPrepareFailureTerminalOutcome";

describe("tryResolveAgentRunWriterPrepareFailureTerminalOutcome", () => {
  it("returns Failed for non-auth prepare errors", () => {
    const output = "Failed to prepare codex: disk full";

    const outcome =
      tryResolveAgentRunWriterPrepareFailureTerminalOutcome(output);

    expect(outcome?.kind).toBe("failed");
    expect(outcome?.chipLabel).toBe("Failed");
    expect(outcome?.summaryLines[0]).toContain("Failed to prepare codex");
  });

  it("blocks Success fallthrough for completed runs with prepare failures", () => {
    const output = "Failed to prepare codex: disk full";

    const outcome = resolveAgentRunHonestyCompletedTerminalOutcome(output);

    expect(outcome.kind).toBe("failed");
    expect(outcome.chipLabel).toBe("Failed");
  });
});
