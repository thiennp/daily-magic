import { describe, expect, it } from "vitest";

import { mapRecordOutcomeToPitfallHit } from "./mapRecordOutcomeToPitfallHit";

describe("mapRecordOutcomeToPitfallHit", () => {
  it("maps a successful pitfall outcome to the cloud hit path", () => {
    expect(
      mapRecordOutcomeToPitfallHit({
        projectId: "proj-1",
        kind: "pitfall",
        pitfallId: "arch-max-lines",
        ok: true,
      }),
    ).toEqual({
      projectId: "proj-1",
      pitfallId: "arch-max-lines",
      path: "/api/agent-witch/projects/proj-1/pitfalls/arch-max-lines/hit",
    });
  });

  it("returns null for non-pitfall or unsuccessful outcomes", () => {
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
  });
});
