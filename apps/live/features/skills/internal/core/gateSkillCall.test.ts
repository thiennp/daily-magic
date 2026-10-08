import { describe, expect, it } from "vitest";

import { gateSkillCall } from "./gateSkillCall";
import { computeSkillMissRate, insertFindLog } from "./skillCallLog";
import {
  FIXTURE_SKILLS,
  openTestDb,
  seedFixtureIndex,
} from "./skillFixtures.testutil";
import { indexSkill } from "./indexSkill";

const request = (db: ReturnType<typeof openTestDb>, over = {}) => ({
  db,
  projectId: "p1",
  skillId: "release-deploy",
  tool: "skills_run",
  chosenBy: "agent" as const,
  runId: "run-1",
  execute: () => "BODY",
  ...over,
});

const calls = (db: ReturnType<typeof openTestDb>) =>
  db.prepare("SELECT * FROM skill_call ORDER BY created_at").all() as Record<
    string,
    unknown
  >[];

describe("gateSkillCall", () => {
  it("logs a successful call with timing, null savings and holdout 0", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db);
    const result = await gateSkillCall(request(db));
    expect(result).toEqual({ ok: true, output: "BODY" });
    const [row] = calls(db);
    expect(row).toMatchObject({
      skill_id: "release-deploy",
      project_id: "p1",
      run_id: "run-1",
      chosen_by: "agent",
      tool: "skills_run",
      ok: 1,
      holdout: 0,
      tokens_actual: null,
      baseline_tokens: null,
      saved_tokens: null,
    });
    expect(Number(row?.duration_ms)).toBeGreaterThanOrEqual(0);
  });

  it("refuses unknown skills and unsafe ids, and still logs the attempt", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db);
    expect(await gateSkillCall(request(db, { skillId: "nope" }))).toEqual({
      ok: false,
      error: "skill_not_installed",
    });
    expect(await gateSkillCall(request(db, { skillId: "../etc" }))).toEqual({
      ok: false,
      error: "invalid_skill_id",
    });
    expect(calls(db).map((r) => r.ok)).toEqual([0, 0]);
  });

  it("times out and reports a failed call; thrown errors are structured", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db);
    const slow = await gateSkillCall(
      request(db, {
        timeoutMs: 10,
        execute: () => new Promise<string>(() => undefined),
      }),
    );
    expect(slow).toEqual({ ok: false, error: "timeout" });
    const boom = await gateSkillCall(
      request(db, {
        execute: () => {
          throw new Error("skill_body_missing");
        },
      }),
    );
    expect(boom).toEqual({ ok: false, error: "skill_body_missing" });
  });
});

describe("MISS metric", () => {
  it("counts finds where a skill was returned but none chosen", async () => {
    const db = openTestDb();
    await indexSkill(db, FIXTURE_SKILLS[0]!);
    const find = (query: string) =>
      insertFindLog(db, {
        projectId: "p1",
        query,
        returnedIds: ["release-deploy"],
        runId: null,
      });
    find("a");
    find("b");
    insertFindLog(db, {
      projectId: "p1",
      query: "c",
      returnedIds: [],
      runId: null,
    });
    await gateSkillCall(request(db));
    expect(computeSkillMissRate(db, "p1")).toEqual({
      finds: 2,
      misses: 1,
      rate: 0.5,
    });
  });
});
