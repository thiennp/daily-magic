import { DatabaseSync } from "node:sqlite";

import { describe, expect, it, vi } from "vitest";

import type { AutoSkillJudge } from "./autoSkill.types";
import { refreshCluster } from "./autoSkillModuleClusterDb";
import { listRecentModules } from "./autoSkillModuleDb";
import { ensureAutoSkillModuleSchema } from "./autoSkillModuleSchema";
import { matchModule, type ModuleMatchDeps } from "./autoSkillModuleMatch";
import { buildAutoSkillModule } from "./autoSkillModuleNormalize";

const mod = (text: string) => {
  const m = buildAutoSkillModule(text, 0);
  if (m === null) {
    throw new Error("trivial");
  }
  return m;
};

const verdictJudge = (
  verdict: "SAME" | "SIMILAR" | "DIFFERENT",
): AutoSkillJudge =>
  vi.fn<AutoSkillJudge>(async ({ candidates }) => ({
    ok: true as const,
    verdicts: candidates.map((c) => ({
      candidateId: c.id,
      verdict,
      reason: "r",
      clusterId: "",
    })),
  }));

const setup = (over: Partial<ModuleMatchDeps> = {}) => {
  const db = new DatabaseSync(":memory:");
  ensureAutoSkillModuleSchema(db);
  const deps: ModuleMatchDeps = {
    db,
    projectId: "p",
    runId: "r1",
    judge: verdictJudge("SIMILAR"),
    embed: async () => null,
    historyOn: true,
    ...over,
  };
  return { db, deps };
};

describe("matchModule", () => {
  it("matches by hash without embedding or judging", async () => {
    const judge = verdictJudge("SAME");
    const embed = vi.fn(async () => null);
    const { deps } = setup({ judge, embed });
    const first = await matchModule(
      mod("Run lint check on src/a.ts"),
      {},
      deps,
    );
    expect(first.via).toBe("new");
    const second = await matchModule(
      mod("Run lint check on lib/b.ts"),
      {},
      deps,
    );
    expect(second).toMatchObject({
      via: "hash",
      clusterId: first.clusterId,
      moduleId: first.moduleId,
    });
    expect(judge).not.toHaveBeenCalled();
    expect(embed).toHaveBeenCalledTimes(1);
  });

  it("uses Jaccard neighbours when embeddings are unavailable, then the judge", async () => {
    const judge = verdictJudge("SIMILAR");
    const { deps } = setup({ judge });
    const a = await matchModule(mod("Run lint check on src/a.ts"), {}, deps);
    const b = await matchModule(
      mod("Please run the lint check for src/b.ts"),
      { prev: "fix login bug", next: "write notes summary" },
      deps,
    );
    expect(b).toMatchObject({ via: "judge", clusterId: a.clusterId });
    const call = vi.mocked(judge).mock.calls[0]?.[0];
    expect(call?.newPrompt).toContain("previous step: fix login bug");
    expect(call?.newPrompt).toContain("next step: write notes summary");
    expect(call?.candidates).toEqual([
      { id: a.clusterId, prompt: "run lint check on <param>" },
    ]);
  });

  it("uses embedding cosine neighbours when vectors exist", async () => {
    const vectors: Record<string, Float32Array> = {
      "run lint check on <param>": new Float32Array([1, 0, 0]),
      "static analysis of <param> sources": new Float32Array([0.9, 0.1, 0]),
      "write release notes summary": new Float32Array([0, 1, 0]),
    };
    const judge = verdictJudge("SAME");
    const { deps } = setup({
      judge,
      embed: async (t) => vectors[t] ?? null,
    });
    const lint = await matchModule(mod("Run lint check on src/a.ts"), {}, deps);
    await matchModule(mod("Write release notes summary"), {}, deps);
    expect(vi.mocked(judge)).not.toHaveBeenCalled();
    const similar = await matchModule(
      mod("Static analysis of src/x.ts sources"),
      {},
      deps,
    );
    expect(similar.clusterId).toBe(lint.clusterId);
    expect(vi.mocked(judge).mock.calls[0]?.[0].candidates).toHaveLength(1);
  });

  it("starts a new cluster on DIFFERENT", async () => {
    const { deps } = setup({ judge: verdictJudge("DIFFERENT") });
    const a = await matchModule(mod("Run lint check on src/a.ts"), {}, deps);
    const b = await matchModule(
      mod("Run the lint check again for b.ts"),
      {},
      deps,
    );
    expect(b.via).toBe("new");
    expect(b.clusterId).not.toBe(a.clusterId);
  });

  it("flags a failed judge and still stores the module", async () => {
    const judge: AutoSkillJudge = async () => ({ ok: false, reason: "down" });
    const { deps, db } = setup({ judge });
    await matchModule(mod("Run lint check on src/a.ts"), {}, deps);
    const b = await matchModule(
      mod("Please run the lint check for src/b.ts"),
      {},
      deps,
    );
    expect(b.judgeFailed).toBe(true);
    expect(listRecentModules(db, "p", 10)).toHaveLength(2);
  });

  it("stores only a preview and no vector when history is OFF", async () => {
    const long = `Run lint check ${"alpha beta gamma ".repeat(30)}on src/a.ts`;
    const { deps, db } = setup({
      historyOn: false,
      embed: async () => new Float32Array([1, 2, 3]),
    });
    const m = mod(long);
    const res = await matchModule(m, {}, deps);
    const [stored] = listRecentModules(db, "p", 5);
    expect(stored?.text.length).toBeLessThanOrEqual(200);
    expect(stored?.vector).toBeNull();
    expect(stored?.hash).toBe(m.hash);
    expect(refreshCluster(db, res.clusterId)?.label.length).toBeLessThanOrEqual(
      200,
    );
  });
});
