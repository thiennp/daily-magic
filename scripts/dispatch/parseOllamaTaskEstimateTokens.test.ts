import { describe, expect, it } from "vitest";

import { parseOllamaTaskEstimateTokens } from "./parseOllamaTaskEstimateTokens";
import { readActualTaskTokenCount } from "./readActualTaskTokenCount";

describe("parseOllamaTaskEstimateTokens", () => {
  it("reads the marker integer", () => {
    expect(
      parseOllamaTaskEstimateTokens("[[WORKING_TOKEN_ESTIMATE]]\n840"),
    ).toBe(840);
  });
});

describe("readActualTaskTokenCount", () => {
  it("prefers writer usage and otherwise sums a usage object in the output", () => {
    expect(
      readActualTaskTokenCount(
        {
          provider: "anthropic",
          model: "claude",
          inputTokens: 20,
          outputTokens: 30,
          totalTokens: 50,
          estimatedCostUsd: null,
          estimateIsApproximate: false,
        },
        "",
      ),
    ).toBe(50);
    expect(
      readActualTaskTokenCount(
        undefined,
        '{"usage":{"input_tokens":100,"output_tokens":40}}',
      ),
    ).toBe(140);
    expect(readActualTaskTokenCount(undefined, "no usage here")).toBeNull();
  });
});
