import { describe, expect, it } from "vitest";

import {
  activeOneWindowMentionQuery,
  applyOneWindowMention,
  filterOneWindowMentionOptions,
  parseOneWindowMentions,
} from "@/features/projects/messenger/oneWindow/oneWindowMentions";

const A = [
  { membershipId: "b1", displayName: "Scout" },
  { membershipId: "b2", displayName: "Forge" },
  { membershipId: "b3", displayName: "Ink Well" },
];

describe("P1-S4b mentions", () => {
  it("finds @assistants by name, in order, unique", () => {
    expect(
      parseOneWindowMentions("@forge then @Scout, and @Forge again", A),
    ).toEqual(["b2", "b1"]);
    expect(parseOneWindowMentions("ask @Ink Well please", A)).toEqual(["b3"]);
    expect(
      parseOneWindowMentions("mail me at x@Scout.com or @Scouting", A),
    ).toEqual([]);
    const many = Array.from({ length: 7 }, (_, i) => ({
      membershipId: `m${i}`,
      displayName: `A${i}`,
    }));
    expect(
      parseOneWindowMentions(
        many.map((m) => `@${m.displayName}`).join(" "),
        many,
      ),
    ).toHaveLength(7);
  });

  it("picker query, filtering and inserting the picked name", () => {
    expect(activeOneWindowMentionQuery("hi @sc", 6)).toBe("sc");
    expect(activeOneWindowMentionQuery("hi @", 4)).toBe("");
    expect(activeOneWindowMentionQuery("hi there", 8)).toBeNull();
    expect(
      filterOneWindowMentionOptions(A, "f").map((a) => a.displayName),
    ).toEqual(["Forge"]);
    expect(applyOneWindowMention("hi @sc tail", 6, "Scout")).toEqual({
      text: "hi @Scout  tail",
      caret: 10,
    });
  });
});
