import { describe, expect, it } from "vitest";

import { mapRecordOutcomeToPitfallHit } from "./mapRecordOutcomeToPitfallHit";

describe("mapRecordOutcomeToPitfallHit", () => {
  it("maps a successful pitfall outcome to the encoded cloud hit path", () => {
    expect(
      mapRecordOutcomeToPitfallHit({
        projectId: "proj 1",
        kind: "pitfall",
        pitfallId: "arch-max-lines",
        ok: true,
      }),
    ).toEqual({
      projectId: "proj 1",
      pitfallId: "arch-max-lines",
      path: "/api/agent-witch/projects/proj%201/pitfalls/arch-max-lines/hit",
    });
  });

  it("returns null for non-pitfall, unsuccessful, or unsafe ids", () => {
    expect(
      mapRecordOutcomeToPitfallHit({
        projectId: "proj-1",
        kind: "preflight",
        preflightId: "pf.smoke",
        ok: true,
      }),
    ).toBeNull();
    expect(
      mapRecordOutcomeToPitfallHit({
        projectId: "proj-1",
        kind: "pitfall",
        pitfallId: "arch-max-lines",
        ok: false,
      }),
    ).toBeNull();
    expect(
      mapRecordOutcomeToPitfallHit({
        projectId: "proj/../x",
        kind: "pitfall",
        pitfallId: "arch-max-lines",
        ok: true,
      }),
    ).toBeNull();
  });
});
