import { describe, expect, it } from "vitest";

import {
  buildTermFrequency,
  cosineSimilarity,
  tokenizeFeatureText,
} from "@/lib/featureKnowledge/tokenizeFeatureText";

describe("tokenizeFeatureText", () => {
  it("tokenizes feature slugs and issue ids", () => {
    expect(tokenizeFeatureText("HOME-003 dashboard gating")).toEqual([
      "home-003",
      "dashboard",
      "gating",
    ]);
  });
});

describe("cosineSimilarity", () => {
  it("ranks overlapping terms higher", () => {
    const oauth = buildTermFrequency(
      tokenizeFeatureText("oauth redirect www agentwitch"),
    );
    const home = buildTermFrequency(
      tokenizeFeatureText("home dashboard mac connect"),
    );
    const mixed = buildTermFrequency(
      tokenizeFeatureText("home dashboard mac paired device"),
    );

    expect(cosineSimilarity(mixed, home)).toBeGreaterThan(
      cosineSimilarity(mixed, oauth),
    );
  });
});
