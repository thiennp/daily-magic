import { describe, expect, it } from "vitest";

import { wrapPromptWithSidecarAgentRunEstimate } from "./wrapPromptWithSidecarAgentRunEstimate";

describe("wrapPromptWithSidecarAgentRunEstimate", () => {
  it("tells the writer to start while Ollama estimates", () => {
    const wrapped = wrapPromptWithSidecarAgentRunEstimate("run tests");

    expect(wrapped).toContain("run tests");
    expect(wrapped).toContain("Ollama sidecar");
    expect(wrapped).toContain("Proceed with the task immediately.");
    expect(wrapped).toContain(
      "Do not emit [[WORKING_ESTIMATE]] before you start.",
    );
    expect(wrapped).toContain("Do not use [[AWAITING_INPUT]]");
  });
});
