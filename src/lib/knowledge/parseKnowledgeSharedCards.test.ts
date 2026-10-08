import { describe, expect, it } from "vitest";

import {
  parseKnowledgeSharedCards,
  parseShareOffProjectIds,
} from "@/lib/knowledge/parseKnowledgeSharedCards";

const card = {
  projectId: "p1",
  cardId: "c1",
  kind: "mistake",
  takeaway: "Avoid X",
  files: ["a.ts", 5],
  outcome: "failed",
  commitSha: null,
  hits: 2,
  occurrences: 3,
  updatedAt: "2026-10-08T00:00:00.000Z",
};

describe("parseKnowledgeSharedCards", () => {
  it("keeps valid cards and clamps text and files", () => {
    const parsed = parseKnowledgeSharedCards([
      { ...card, takeaway: "x".repeat(900) },
    ]);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.takeaway.length).toBe(400);
    expect(parsed[0]?.files).toEqual(["a.ts"]);
  });

  it("drops cards with bad kind, date or counters", () => {
    expect(
      parseKnowledgeSharedCards([
        { ...card, kind: "secret" },
        { ...card, updatedAt: "nope" },
        { ...card, hits: -1 },
        card,
      ]),
    ).toHaveLength(1);
    expect(parseKnowledgeSharedCards("x")).toEqual([]);
  });

  it("filters share-off ids to strings", () => {
    expect(parseShareOffProjectIds(["p1", 3, "p2"])).toEqual(["p1", "p2"]);
  });
});
