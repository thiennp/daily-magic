import { describe, expect, it } from "vitest";

import { resolveOwnerLlmDraftWriterMode } from "./ownerLlmDraftWriter.port";

describe("resolveOwnerLlmDraftWriterMode", () => {
  it("uses one write call under the input cap", () => {
    expect(
      resolveOwnerLlmDraftWriterMode({
        estimatedInputTokens: 1000,
        inputTokenCap: 12_000,
      }),
    ).toBe("write");
  });

  it("splits into reflect_then_write over the input cap", () => {
    expect(
      resolveOwnerLlmDraftWriterMode({
        estimatedInputTokens: 12_001,
        inputTokenCap: 12_000,
      }),
    ).toBe("reflect_then_write");
  });
});
