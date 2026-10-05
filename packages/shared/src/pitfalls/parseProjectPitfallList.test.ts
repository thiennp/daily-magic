import { describe, expect, it } from "vitest";

import { PROJECT_PITFALL_MAX_ACTIVE } from "./projectPitfall.constant";
import {
  countActiveProjectPitfalls,
  parseProjectPitfall,
  parseProjectPitfallList,
} from "./parseProjectPitfallList";

const sample = {
  id: "arch-max-lines",
  projectId: null,
  symptom: "File too long",
  cause: "Grew past limit",
  avoidance: "Split the file",
  check: { kind: "command" as const, value: "npm run ci:architecture" },
  keywords: ["arch"],
  tags: ["ci"],
  source: "seed" as const,
  overridesSeed: false,
  hitCount: 2,
  lastSeenAt: "2026-10-05T12:00:00.000Z",
  updatedAt: "2026-10-05T10:00:00.000Z",
  severity: "block" as const,
};

describe("parseProjectPitfallList", () => {
  it("parses { pitfalls, syncedAt } and keeps updatedAt", () => {
    const result = parseProjectPitfallList({
      ok: true,
      pitfalls: [sample],
      syncedAt: "2026-10-05T12:00:00.000Z",
    });
    expect(result).toEqual({
      items: [sample],
      syncedAt: "2026-10-05T12:00:00.000Z",
    });
  });

  it("returns null for shape errors (missing pitfalls)", () => {
    expect(parseProjectPitfallList({ items: [] })).toBeNull();
    expect(parseProjectPitfallList(null)).toBeNull();
    expect(parseProjectPitfallList("x")).toBeNull();
  });

  it("defaults missing updatedAt to null; unknown severity to warn", () => {
    const result = parseProjectPitfallList({
      pitfalls: [
        {
          id: "b",
          symptom: "Tests hang",
          source: "weird",
          severity: "loud",
          hitCount: -3,
          overridesSeed: true,
        },
      ],
    });
    expect(result?.items).toHaveLength(1);
    expect(result?.items[0]).toMatchObject({
      id: "b",
      projectId: null,
      source: "project",
      severity: "warn",
      hitCount: 0,
      lastSeenAt: null,
      updatedAt: null,
      overridesSeed: true,
      check: { kind: "id", value: "b" },
    });
    expect(result?.syncedAt).toBeNull();
  });

  it("drops rows without id or symptom (shape)", () => {
    const result = parseProjectPitfallList({
      pitfalls: [{ id: "", symptom: "x" }, { id: "a", symptom: "" }, sample],
    });
    expect(result?.items.map((item) => item.id)).toEqual(["arch-max-lines"]);
  });

  it("rejects non-object single items via parseProjectPitfall", () => {
    expect(parseProjectPitfall(null)).toBeNull();
    expect(parseProjectPitfall([])).toBeNull();
  });
});

describe("countActiveProjectPitfalls", () => {
  it("counts only non-retired items toward the active limit", () => {
    expect(PROJECT_PITFALL_MAX_ACTIVE).toBe(64);
    expect(
      countActiveProjectPitfalls([
        { ...sample, id: "a" },
        { ...sample, id: "b", source: "project", projectId: "p1" },
        { ...sample, id: "c", source: "retired" },
      ]),
    ).toBe(2);
  });
});
