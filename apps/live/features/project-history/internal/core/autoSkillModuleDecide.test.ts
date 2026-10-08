import { describe, expect, it } from "vitest";

import type {
  AutoSkillClusterState,
  AutoSkillModuleCluster,
} from "./autoSkillModule.types";
import {
  decideModuleCluster,
  pickClustersToAsk,
  reconcileClusterState,
} from "./autoSkillModuleDecide";

const cluster = (
  id: string,
  occurrences: number,
  state: AutoSkillClusterState = "watching",
  distinctPrompts = occurrences,
): AutoSkillModuleCluster => ({
  id,
  label: id,
  occurrences,
  distinctPrompts,
  state,
});

describe("decideModuleCluster", () => {
  it("does not ask for the first occurrence", () => {
    expect(
      decideModuleCluster({ cluster: cluster("a", 1), cloudPending: false }),
    ).toEqual({ action: "none", reason: "first" });
  });

  it("asks from the second occurrence", () => {
    expect(
      decideModuleCluster({ cluster: cluster("a", 2), cloudPending: false }),
    ).toEqual({ action: "ask" });
  });

  it("never asks twice while a question is pending", () => {
    expect(
      decideModuleCluster({
        cluster: cluster("a", 3, "asked"),
        cloudPending: true,
      }),
    ).toEqual({ action: "none", reason: "already_pending" });
  });

  it("re-asks after Not now (asked locally, no longer pending in the cloud)", () => {
    expect(
      decideModuleCluster({
        cluster: cluster("a", 3, "asked"),
        cloudPending: false,
      }),
    ).toEqual({ action: "ask" });
  });

  it.each([
    ["never", "never"],
    ["saved", "saved"],
  ] as const)("stays silent for %s clusters", (state, reason) => {
    expect(
      decideModuleCluster({
        cluster: cluster("a", 9, state),
        cloudPending: false,
      }),
    ).toEqual({ action: "none", reason });
  });
});

describe("reconcileClusterState", () => {
  it("lets the owner's cloud answers win; never beats saved", () => {
    expect(reconcileClusterState("asked", { saved: true, never: false })).toBe(
      "saved",
    );
    expect(reconcileClusterState("asked", { saved: true, never: true })).toBe(
      "never",
    );
    expect(reconcileClusterState("asked", { saved: false, never: false })).toBe(
      "asked",
    );
  });
});

describe("pickClustersToAsk", () => {
  it("keeps the two strongest clusters", () => {
    const out = pickClustersToAsk([
      cluster("weak", 2),
      cluster("strong", 5),
      cluster("mid", 3),
    ]);
    expect(out.map((c) => c.id)).toEqual(["strong", "mid"]);
  });
});
