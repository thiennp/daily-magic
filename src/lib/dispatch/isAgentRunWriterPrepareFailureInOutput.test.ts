import { describe, expect, it } from "vitest";

import { isAgentRunWriterPrepareFailureInOutput } from "@/lib/dispatch/isAgentRunWriterPrepareFailureInOutput";

describe("isAgentRunWriterPrepareFailureInOutput", () => {
  it("detects Failed to prepare writer output", () => {
    expect(
      isAgentRunWriterPrepareFailureInOutput(
        "Failed to prepare claude-cli: ensure-writer.sh timed out after 120s",
      ),
    ).toBe(true);
  });

  it("returns false for normal CLI output", () => {
    expect(isAgentRunWriterPrepareFailureInOutput("Implemented README.")).toBe(
      false,
    );
  });
});
