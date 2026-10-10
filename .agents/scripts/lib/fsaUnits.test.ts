import { describe, expect, it } from "vitest";

import {
  type FsaFileGraph,
  type FsaState,
  pickNextUnit,
  resolveImport,
} from "./fsaUnits";

const emptyState: FsaState = { completed: [], blocked: {}, rounds: [] };
const f = (p: string) => `src/features/${p}`;

describe("resolveImport", () => {
  it("resolves alias and relative imports inside src/features only", () => {
    expect(resolveImport(f("a/x.ts"), "@/features/b/y")).toBe(f("b/y"));
    expect(resolveImport(f("a/sub/x.ts"), "../z")).toBe(f("a/z"));
    expect(resolveImport(f("a/x.ts"), "react")).toBeNull();
    expect(resolveImport(f("a/x.ts"), "@/lib/db")).toBeNull();
  });
});

describe("pickNextUnit", () => {
  const graph: FsaFileGraph = {
    files: [
      f("small/a.ts"),
      f("small/b.ts"),
      f("big/one/a.ts"),
      f("big/one/b.ts"),
      f("big/two/c.ts"),
      f("big/loose.ts"),
      f("consumer/c.ts"),
    ],
    edges: {
      [f("consumer/c.ts")]: [f("big/two/c.ts"), f("small/a.ts")],
      [f("big/one/a.ts")]: [f("big/one/b.ts")],
    },
    cycleCounts: {},
  };
  const limits = { maxFiles: 3, maxImporters: 5 };

  it("descends into a container whose total is over the limit and picks the lowest-risk leaf", () => {
    const wide: FsaFileGraph = {
      ...graph,
      files: [...graph.files, f("big/one/d.ts"), f("big/two/e.ts")],
    };
    const pick = pickNextUnit(wide, emptyState, {
      maxFiles: 4,
      maxImporters: 5,
    });
    expect(pick.kind).toBe("unit");
    if (pick.kind === "unit") expect(pick.metrics.unit).not.toBe(f("big"));
  });

  it("skips completed units and takes a container's loose files only after its sub-folders", () => {
    const state: FsaState = {
      completed: [f("small"), f("big/one"), f("big/two")],
      blocked: {},
      rounds: [],
    };
    const pick = pickNextUnit(graph, state, { maxFiles: 3, maxImporters: 5 });
    expect(pick.kind === "unit" && pick.metrics.unit).toBe(f("big#root"));
    const after: FsaState = {
      ...state,
      completed: [...state.completed, f("big#root")],
    };
    const last = pickNextUnit(graph, after, { maxFiles: 3, maxImporters: 5 });
    expect(last.kind === "unit" && last.metrics.unit).toBe(f("consumer"));
  });

  it("reports done when everything is complete or already has a public-api", () => {
    const done: FsaFileGraph = {
      files: [f("a/public-api/types.ts"), f("a/x.ts")],
      edges: {},
      cycleCounts: {},
    };
    expect(pickNextUnit(done, emptyState, limits).kind).toBe("done");
  });

  it("asks for a human when a unit is too big and cannot be split", () => {
    const flat: FsaFileGraph = {
      files: ["a", "b", "c", "d"].map((n) => f(`flat/${n}.ts`)),
      edges: {},
      cycleCounts: {},
    };
    expect(pickNextUnit(flat, emptyState, limits).kind).toBe("needs-human");
  });

  it("prefers the unit with fewer importers and cycles", () => {
    const risky: FsaFileGraph = {
      ...graph,
      cycleCounts: { [f("small/a.ts")]: 5 },
    };
    const pick = pickNextUnit(risky, emptyState, limits);
    expect(pick.kind === "unit" && pick.metrics.unit).not.toBe(f("small"));
  });
});
