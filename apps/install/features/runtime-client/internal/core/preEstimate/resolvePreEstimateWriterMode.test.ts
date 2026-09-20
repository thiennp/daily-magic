import { describe, expect, it } from "vitest";

import {
  PRE_ESTIMATE_WRITER_MODES,
  resolvePreEstimateWriterMode,
} from "./resolvePreEstimateWriterMode";

describe("resolvePreEstimateWriterMode", () => {
  it("defaults to same", () => {
    expect(resolvePreEstimateWriterMode(undefined)).toBe(
      PRE_ESTIMATE_WRITER_MODES.SAME,
    );
    expect(resolvePreEstimateWriterMode("invalid")).toBe(
      PRE_ESTIMATE_WRITER_MODES.SAME,
    );
  });

  it("accepts fast-api", () => {
    expect(resolvePreEstimateWriterMode("fast-api")).toBe(
      PRE_ESTIMATE_WRITER_MODES.FAST_API,
    );
  });
});
