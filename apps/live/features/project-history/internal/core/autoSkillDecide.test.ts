import { describe, expect, it } from "vitest";

import { decideAutoSkillRepeat } from "./autoSkillDecide";
import type { AutoSkillCluster, AutoSkillVerdict } from "./autoSkill.types";

const v = (
  id: string,
  verdict: AutoSkillVerdict["verdict"],
  clusterId = "release-notes",
): AutoSkillVerdict => ({ candidateId: id, verdict, reason: "r", clusterId });

const cluster = (
  clusterId: string,
  patch: Partial<AutoSkillCluster>,
): Record<string, AutoSkillCluster> => ({
  [clusterId]: {
    clusterId,
    status: "open",
    runIds: [],
    pendingQuestion: false,
    ...patch,
  },
});

describe("decideAutoSkillRepeat", () => {
  it("never asks for the 1st occurrence", () => {
    expect(
      decideAutoSkillRepeat({
        newRunId: "n",
        verdicts: [v("a", "DIFFERENT")],
        runClusterIds: {},
        clusters: {},
      }),
    ).toEqual({ action: "none", reason: "first" });
  });

  it("asks on the 2nd occurrence with N = 2", () => {
    const d = decideAutoSkillRepeat({
      newRunId: "n",
      verdicts: [v("a", "SIMILAR")],
      runClusterIds: {},
      clusters: {},
    });
    expect(d).toMatchObject({
      action: "ask",
      occurrences: 2,
      clusterId: "release-notes",
    });
  });

  it("counts SAME and SIMILAR matches toward N", () => {
    const d = decideAutoSkillRepeat({
      newRunId: "n",
      verdicts: [v("a", "SAME"), v("b", "SIMILAR"), v("c", "DIFFERENT")],
      runClusterIds: {},
      clusters: {},
    });
    expect(d).toMatchObject({
      action: "ask",
      occurrences: 3,
      matchedRunIds: ["a", "b"],
    });
  });

  it("stops asking once the owner chose never for the cluster", () => {
    expect(
      decideAutoSkillRepeat({
        newRunId: "n",
        verdicts: [v("a", "SAME", "other-name")],
        runClusterIds: { a: "release-notes" },
        clusters: cluster("release-notes", { status: "never" }),
      }),
    ).toEqual({ action: "none", reason: "never" });
  });

  it("does not ask again while a question is pending or after saving", () => {
    const base = {
      newRunId: "n",
      verdicts: [v("a", "SAME")],
      runClusterIds: { a: "release-notes" },
    };
    expect(
      decideAutoSkillRepeat({
        ...base,
        clusters: cluster("release-notes", { pendingQuestion: true }),
      }),
    ).toEqual({ action: "none", reason: "already_pending" });
    expect(
      decideAutoSkillRepeat({
        ...base,
        clusters: cluster("release-notes", { status: "saved" }),
      }),
    ).toEqual({ action: "none", reason: "saved" });
  });

  it("asks again at the next repeat after Not now (cluster back to open)", () => {
    const d = decideAutoSkillRepeat({
      newRunId: "n",
      verdicts: [v("a", "SAME"), v("b", "SAME")],
      runClusterIds: { a: "release-notes", b: "release-notes" },
      clusters: {},
    });
    expect(d).toMatchObject({
      action: "ask",
      occurrences: 3,
      clusterId: "release-notes",
    });
  });

  it("falls back to a stable id when the judge names no cluster", () => {
    const d = decideAutoSkillRepeat({
      newRunId: "n",
      verdicts: [v("abcdef123456", "SAME", "")],
      runClusterIds: {},
      clusters: {},
    });
    expect(d).toMatchObject({ action: "ask", clusterId: "task-abcdef12" });
  });
});
