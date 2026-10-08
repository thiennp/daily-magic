import { describe, expect, it } from "vitest";

import { computeSkillSavings } from "./computeSkillSavings";
import { gateSkillCall } from "./gateSkillCall";
import { settleSkillCallsForRun } from "./settleSkillCalls";
import { indexSkill } from "./indexSkill";
import { FIXTURE_SKILLS, openTestDb } from "./skillFixtures.testutil";
import { insertFindLog } from "./skillCallLog";
import { median, shouldHoldout } from "./skillSavings";

const SKILL = "release-deploy";

const call = (db: ReturnType<typeof openTestDb>, runId: string, every = 4) =>
  gateSkillCall({
    db,
    projectId: "p1",
    skillId: SKILL,
    tool: "skills_run",
    chosenBy: "agent",
    runId,
    holdoutEvery: every,
    execute: () => "BODY",
  });

const seeded = async () => {
  const db = openTestDb();
  await indexSkill(db, FIXTURE_SKILLS[0]!);
  return db;
};

describe("holdout selection", () => {
  it("is deterministic, needs a baseline and a prior call, and hits 1 in N", () => {
    const pick = (n: number, hasBaseline = true) =>
      shouldHoldout({ skillId: SKILL, priorCalls: n, hasBaseline, every: 10 });
    expect(pick(0)).toBe(false);
    expect(pick(5, false)).toBe(false);
    const hits = Array.from({ length: 100 }, (_, n) => n).filter((n) =>
      pick(n),
    );
    expect(hits).toHaveLength(10);
    expect(hits.map((n) => n % 10)).toEqual(Array(10).fill(hits[0]! % 10));
    expect(Array.from({ length: 100 }, (_, n) => pick(n))).toEqual(
      Array.from({ length: 100 }, (_, n) => pick(n)),
    );
  });

  it("the gate answers holdout and logs holdout=1 without running", async () => {
    const db = await seeded();
    let ran = 0;
    const results: string[] = [];
    for (let i = 0; i < 8; i += 1) {
      const result = await gateSkillCall({
        db,
        projectId: "p1",
        skillId: SKILL,
        tool: "skills_run",
        chosenBy: "agent",
        runId: `r${i}`,
        holdoutEvery: 4,
        execute: () => {
          ran += 1;
          return "BODY";
        },
      });
      results.push(result.ok ? "run" : result.error);
      settleSkillCallsForRun(db, {
        runId: `r${i}`,
        tokens: 1000,
        estimate: false,
      });
    }
    expect(results.filter((r) => r === "holdout")).toHaveLength(2);
    expect(ran).toBe(6);
    const held = db
      .prepare("SELECT COUNT(*) AS n FROM skill_call WHERE holdout = 1")
      .get() as { n: number };
    expect(held.n).toBe(2);
  });
});

describe("baseline and savings", () => {
  it("first call sets the baseline; later calls save baseline - actual", async () => {
    const db = await seeded();
    await call(db, "r1");
    settleSkillCallsForRun(db, { runId: "r1", tokens: 1000, estimate: false });
    await call(db, "r2");
    settleSkillCallsForRun(db, { runId: "r2", tokens: 400, estimate: false });
    const rows = db
      .prepare(
        "SELECT baseline_tokens, saved_tokens FROM skill_call ORDER BY created_at, rowid",
      )
      .all();
    expect(rows).toEqual([
      { baseline_tokens: 1000, saved_tokens: 0 },
      { baseline_tokens: 1000, saved_tokens: 600 },
    ]);
  });

  it("never reports negative savings and splits a run's tokens across its calls", async () => {
    const db = await seeded();
    await call(db, "r1");
    settleSkillCallsForRun(db, { runId: "r1", tokens: 100, estimate: false });
    await call(db, "r2");
    await call(db, "r2");
    settleSkillCallsForRun(db, { runId: "r2", tokens: 1000, estimate: false });
    const saved = db
      .prepare("SELECT saved_tokens AS s FROM skill_call WHERE run_id = 'r2'")
      .all();
    expect(saved).toEqual([{ s: 0 }, { s: 0 }]);
  });

  it("holdout samples refresh the baseline as a running median", async () => {
    const db = await seeded();
    for (const [run, tokens] of [
      ["r1", 1000],
      ["r2", 300],
    ] as const) {
      await call(db, run, 0);
      settleSkillCallsForRun(db, { runId: run, tokens, estimate: false });
    }
    db.prepare(
      "INSERT INTO skill_call (id, skill_id, project_id, run_id, chosen_by, tool, ok, duration_ms, created_at, holdout) VALUES ('h','release-deploy','p1','rh','agent','skills_run',1,1,'2026-01-01',1)",
    ).run();
    settleSkillCallsForRun(db, { runId: "rh", tokens: 2000, estimate: false });
    expect(median([1000, 2000])).toBe(1500);
    const [s] = computeSkillSavings(db, "p1");
    expect(s).toMatchObject({
      skillId: SKILL,
      samples: 2,
      holdouts: 1,
      calls: 2,
    });
  });

  it("marks savings as an estimate under 3 samples and when tokens were estimated", async () => {
    const db = await seeded();
    await call(db, "r1", 0);
    settleSkillCallsForRun(db, { runId: "r1", tokens: 800, estimate: false });
    expect(computeSkillSavings(db, "p1")[0]?.estimate).toBe(true);
    for (const n of [2, 3]) {
      db.prepare(
        "INSERT INTO skill_call (id, skill_id, project_id, run_id, chosen_by, tool, ok, duration_ms, created_at, holdout) VALUES (?,?,?,?,?,?,?,?,?,1)",
      ).run(
        `h${n}`,
        SKILL,
        "p1",
        `rh${n}`,
        "agent",
        "skills_run",
        1,
        1,
        "2026-01-01",
      );
      settleSkillCallsForRun(db, {
        runId: `rh${n}`,
        tokens: 900,
        estimate: false,
      });
    }
    expect(computeSkillSavings(db, "p1")[0]).toMatchObject({
      samples: 3,
      estimate: false,
    });
  });

  it("reports the miss rate: finds that returned the skill but did not choose it", async () => {
    const db = await seeded();
    const find = () =>
      insertFindLog(db, {
        projectId: "p1",
        query: "q",
        returnedIds: [SKILL],
        runId: null,
      });
    find();
    find();
    await call(db, "r1", 0);
    expect(computeSkillSavings(db, "p1")[0]?.missRate).toBe(0.5);
  });
});
