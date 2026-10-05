import { describe, expect, it } from "vitest";

import {
  countActiveAgentWitchPitfalls,
  parseAgentWitchProjectPitfallList,
} from "./parseAgentWitchProjectPitfalls";
import { buildPitfallFixture } from "./projectPitfallFixtures.testUtil";

describe("parseAgentWitchProjectPitfallList", () => {
  it("parses the NRG { pitfalls, syncedAt } shape", () => {
    const result = parseAgentWitchProjectPitfallList({
      ok: true,
      projectId: "proj-1",
      count: 1,
      pitfalls: [buildPitfallFixture()],
      syncedAt: "2026-10-05T12:00:00.000Z",
    });
    expect(result).toEqual({
      items: [buildPitfallFixture()],
      syncedAt: "2026-10-05T12:00:00.000Z",
    });
  });

  it("returns null for a body without pitfalls", () => {
    expect(parseAgentWitchProjectPitfallList({ items: [] })).toBeNull();
    expect(parseAgentWitchProjectPitfallList(null)).toBeNull();
  });

  it("drops rows without id or symptom and defaults unknown enums", () => {
    const result = parseAgentWitchProjectPitfallList({
      pitfalls: [
        { id: "", symptom: "x" },
        { id: "a", symptom: "" },
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
      overridesSeed: true,
      check: { kind: "id", value: "b" },
      keywords: [],
    });
    expect(result?.syncedAt).toBeNull();
  });

  it("counts only non-retired items as active", () => {
    expect(
      countActiveAgentWitchPitfalls([
        buildPitfallFixture({ id: "a" }),
        buildPitfallFixture({
          id: "b",
          source: "project",
          projectId: "proj-1",
        }),
        buildPitfallFixture({ id: "c", source: "retired" }),
      ]),
    ).toBe(2);
  });
});
