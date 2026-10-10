import { describe, expect, it } from "vitest";

import {
  buildDeepScanChoices,
  DEEP_SCAN_MAX_COMMITS,
} from "./deepScanCommitChoices";

describe("buildDeepScanChoices", () => {
  it("offers presets deeper than the last scan, then the whole history", () => {
    expect(buildDeepScanChoices(800, 100)).toEqual({
      max: 800,
      presets: [250, 500, 800],
    });
  });

  it("caps the history at the scan ceiling", () => {
    expect(buildDeepScanChoices(50_000, 100)).toEqual({
      max: DEEP_SCAN_MAX_COMMITS,
      presets: [250, 500, 1_000, 2_000],
    });
  });

  it("offers nothing when the last scan already read everything", () => {
    expect(buildDeepScanChoices(100, 100).presets).toEqual([]);
  });
});
