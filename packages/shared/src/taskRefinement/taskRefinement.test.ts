import { describe, expect, it } from "vitest";

import { decideEffortTier, escalateEffortTier } from "./decideEffortTier";
import { dedupeSubtasks } from "./dedupeSubtasks";
import { deriveParentStatus } from "./deriveParentStatus";

describe("dedupeSubtasks", () => {
  it("drops repeats by title and by skill+params, and against existing keys", () => {
    const { kept, dropped } = dedupeSubtasks([
      { title: "Run the build!" },
      { title: "run  the build" },
      { title: "a", skillId: "s", skillParams: { x: 1, y: 2 } },
      { title: "b", skillId: "s", skillParams: { y: 2, x: 1 } },
      { title: "c", skillId: "s", skillParams: { x: 9 } },
    ]);
    expect(kept.map((t) => t.title)).toEqual(["Run the build!", "a", "c"]);
    expect(dropped).toHaveLength(2);
    const again = dedupeSubtasks(
      [{ title: "Run the build" }],
      new Set(["title:run the build"]),
    );
    expect(again.kept).toEqual([]);
  });
});

describe("decideEffortTier / escalateEffortTier", () => {
  it("picks the cheapest tier that fits and climbs one step", () => {
    expect(decideEffortTier({ title: "anything", hasSkillScript: true })).toBe(
      "script",
    );
    expect(
      decideEffortTier({ title: "rename the label", hasSkillScript: false }),
    ).toBe("low");
    expect(
      decideEffortTier({ title: "add a settings page", hasSkillScript: false }),
    ).toBe("medium");
    expect(
      decideEffortTier({
        title: "debug the flaky sync",
        hasSkillScript: false,
      }),
    ).toBe("high");
    expect(escalateEffortTier("script")).toBe("low");
    expect(escalateEffortTier("high")).toBe("high");
  });
});

describe("deriveParentStatus", () => {
  it.each([
    [[], null],
    [["cancelled", "cancelled"], "cancelled"],
    [["done", "cancelled"], "done"],
    [["queued", "queued"], "queued"],
    [["in_progress", "blocked"], "in_progress"],
    [["done", "queued"], "in_progress"],
    [["blocked", "queued"], "in_progress"],
    [["blocked", "done"], "blocked"],
    [["blocked", "blocked"], "blocked"],
  ])("%j -> %s", (children, expected) => {
    expect(deriveParentStatus(children)).toBe(expected);
  });
});
