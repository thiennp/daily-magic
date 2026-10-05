import { describe, expect, it } from "vitest";

import buildProjectPitfallsPath from "@/lib/projects/pitfalls/buildProjectPitfallsPath";
import parseProjectPitfallList from "@/lib/projects/pitfalls/parseProjectPitfallList";

describe("parseProjectPitfallList", () => {
  it("parses NRG contract items and fills safe defaults", () => {
    expect(
      parseProjectPitfallList({
        ok: true,
        projectId: "proj-1",
        count: 2,
        syncedAt: "2026-10-05T12:00:00.000Z",
        pitfalls: [
          {
            id: "arch-max-lines",
            symptom: " Build breaks after rename ",
            avoidance: "Search old imports.",
            cause: "Old path left behind.",
            keywords: ["rename", 3],
            source: "seed",
            severity: "block",
            hitCount: 4.7,
            lastSeenAt: "2026-10-05T10:00:00.000Z",
            updatedAt: "2026-10-05T09:00:00.000Z",
            overridesSeed: false,
            check: { kind: "command", value: "npm run typecheck" },
          },
          { id: "", symptom: "dropped" },
          { id: "x", symptom: "Defaults", source: "nope", severity: "nope" },
        ],
      }),
    ).toEqual({
      syncedAt: "2026-10-05T12:00:00.000Z",
      items: [
        {
          id: "arch-max-lines",
          projectId: null,
          symptom: "Build breaks after rename",
          cause: "Old path left behind.",
          avoidance: "Search old imports.",
          check: { kind: "command", value: "npm run typecheck" },
          keywords: ["rename"],
          tags: [],
          source: "seed",
          overridesSeed: false,
          hitCount: 4,
          lastSeenAt: "2026-10-05T10:00:00.000Z",
          updatedAt: "2026-10-05T09:00:00.000Z",
          severity: "block",
        },
        {
          id: "x",
          projectId: null,
          symptom: "Defaults",
          cause: "",
          avoidance: "",
          check: { kind: "id", value: "x" },
          keywords: [],
          tags: [],
          source: "project",
          overridesSeed: false,
          hitCount: 0,
          lastSeenAt: null,
          updatedAt: "1970-01-01T00:00:00.000Z",
          severity: "warn",
        },
      ],
    });
  });

  it("returns null for non-list bodies", () => {
    expect(parseProjectPitfallList({ items: [] })).toBeNull();
    expect(parseProjectPitfallList("nope")).toBeNull();
  });
});

describe("buildProjectPitfallsPath", () => {
  it("targets the contract route", () => {
    expect(buildProjectPitfallsPath(" p 1 ")).toBe(
      "/api/agent-witch/projects/p%201/pitfalls?includeRetired=0",
    );
    expect(buildProjectPitfallsPath("p", { includeRetired: true })).toBe(
      "/api/agent-witch/projects/p/pitfalls?includeRetired=1",
    );
  });
});
