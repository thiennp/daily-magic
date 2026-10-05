import { describe, expect, it } from "vitest";

import { formatProjectPitfallsForBot } from "@/features/project-pitfalls/internal/core/formatProjectPitfallsForBot";
import { mergeProjectPitfalls } from "@/features/project-pitfalls/internal/core/mergeProjectPitfalls";
import { pitfallRecordFixture as rec } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";

const seeds = [
  rec({ id: "stale-next", severity: "warn" }),
  rec({ id: "arch-max-lines", severity: "block" }),
  rec({ id: "no-prs", severity: "warn" }),
];
const projectRows = [
  rec({
    id: "stale-next",
    projectId: "p1",
    source: "project",
    avoidance: "Mine",
  }),
  rec({ id: "no-prs", projectId: "p1", source: "retired" }),
  rec({ id: "own-one", projectId: "p1", source: "project", severity: "info" }),
];
const hits = [
  {
    pitfallId: "stale-next",
    hitCount: 3,
    lastSeenAt: "2026-10-05T11:00:00.000Z",
  },
];

describe("mergeProjectPitfalls", () => {
  it("merges seeds + project rows; override replaces the seed", () => {
    const merged = mergeProjectPitfalls({ seeds, projectRows, hits });
    expect(merged.map((view) => view.id)).toEqual([
      "arch-max-lines",
      "stale-next",
      "own-one",
    ]);
    const override = merged.find((view) => view.id === "stale-next");
    expect(override).toMatchObject({
      avoidance: "Mine",
      projectId: "p1",
      overridesSeed: true,
      hitCount: 3,
      lastSeenAt: "2026-10-05T11:00:00.000Z",
    });
    expect(merged.find((view) => view.id === "own-one")?.overridesSeed).toBe(
      false,
    );
    expect(merged[0]).toMatchObject({
      source: "seed",
      hitCount: 0,
      lastSeenAt: null,
    });
  });

  it("excludes retired by default and includes them on request", () => {
    expect(
      mergeProjectPitfalls({ seeds, projectRows, hits }).some(
        (v) => v.id === "no-prs",
      ),
    ).toBe(false);
    const all = mergeProjectPitfalls({
      seeds,
      projectRows,
      hits,
      includeRetired: true,
    });
    expect(all.find((view) => view.id === "no-prs")?.source).toBe("retired");
  });

  it("formats compact id|avoidance lines for bots", () => {
    const merged = mergeProjectPitfalls({
      seeds: [rec({ id: "a-one", avoidance: "Do this\n  then that" })],
      projectRows: [],
      hits: [],
    });
    expect(formatProjectPitfallsForBot(merged)).toBe("a-one|Do this then that");
  });
});
