import { describe, expect, it } from "vitest";

import { HOME_POPULAR_PRESET_IDS } from "@/features/home/constants/homePopularPresetIds.constant";
import resolveHomePopularPresets from "@/features/home/utils/resolveHomePopularPresets";

describe("resolveHomePopularPresets", () => {
  it("maps curated ids to catalog summaries", () => {
    const presets = resolveHomePopularPresets();

    expect(presets).toHaveLength(HOME_POPULAR_PRESET_IDS.length);
    expect(presets.map((preset) => preset.id)).toEqual([
      ...HOME_POPULAR_PRESET_IDS,
    ]);
    expect(presets.every((preset) => preset.name.length > 0)).toBe(true);
    expect(presets.every((preset) => preset.description.length > 0)).toBe(true);
  });
});
