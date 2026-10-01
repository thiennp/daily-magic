import { describe, expect, it } from "vitest";

import { readPromptSdlcRewriteStop } from "@/lib/promptOptimizer/readPromptSdlcRewriteStop";

describe("readPromptSdlcRewriteStop", () => {
  it("early-stops when scores are flat using earlyStopFlatRounds", () => {
    const stop = readPromptSdlcRewriteStop({
      scores: [80, 80, 79],
      reasons: ["a", "b", "c"],
      round: 2,
      maxRounds: 10,
      earlyStopFlat: 2,
    });
    expect(stop?.type).toBe("stopped");
    expect(stop?.errorMessage).toMatch(/score stopped rising/i);
  });
});
