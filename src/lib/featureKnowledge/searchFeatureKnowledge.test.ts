import { describe, expect, it } from "vitest";

import { buildFeatureKnowledgeIndex } from "@/lib/featureKnowledge/buildFeatureKnowledgeIndex";
import { searchFeatureKnowledge } from "@/lib/featureKnowledge/searchFeatureKnowledge";

describe("searchFeatureKnowledge", () => {
  it("returns home known-issue context for dashboard gating queries", () => {
    const index = buildFeatureKnowledgeIndex(process.cwd());
    const result = searchFeatureKnowledge(
      index,
      "dashboard before mac paired",
      {
        featureSlug: "home",
        limit: 3,
      },
    );

    expect(result.hits.length).toBeGreaterThan(0);
    expect(result.context).toMatch(/HOME-003|dashboard/i);
  });
});
