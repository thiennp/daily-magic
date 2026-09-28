import { describe, expect, it } from "vitest";

import { parseOllamaTaskEstimateSeconds } from "./parseOllamaTaskEstimateSeconds";

describe("parseOllamaTaskEstimateSeconds", () => {
  it("reads the working-estimate marker", () => {
    expect(
      parseOllamaTaskEstimateSeconds("[[WORKING_ESTIMATE]]\n180\nLooks quick."),
    ).toBe(180);
  });

  it("reads a leading integer when the marker is missing", () => {
    expect(parseOllamaTaskEstimateSeconds("  90\nseconds")).toBe(90);
  });

  it("returns null for empty or non-positive text", () => {
    expect(parseOllamaTaskEstimateSeconds("")).toBeNull();
    expect(parseOllamaTaskEstimateSeconds("0")).toBeNull();
    expect(parseOllamaTaskEstimateSeconds("no idea")).toBeNull();
  });
});
