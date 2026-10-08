import { beforeEach, describe, expect, it } from "vitest";

import { clearSkillCorpusCacheForTests, findSkills } from "./findSkills";
import { fuseRankings } from "./rrf";
import {
  conceptEmbedder,
  openTestDb,
  seedFixtureIndex,
} from "./skillFixtures.testutil";
import { rerankSkillHits } from "./skillRerank";

beforeEach(clearSkillCorpusCacheForTests);

describe("fuseRankings", () => {
  it("rewards ids that both retrievers rank high", () => {
    const fused = fuseRankings([
      ["a", "b"],
      ["b", "c"],
    ]);
    expect(fused.map((f) => f.id)).toEqual(["b", "a", "c"]);
  });
});

describe("findSkills hybrid", () => {
  it("ranks the relevant skill first for a paraphrased query", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db, conceptEmbedder);
    const hits = await findSkills({
      db,
      projectId: "p1",
      query: "ship the new version live",
      embed: conceptEmbedder,
    });
    expect(hits[0]?.skillId).toBe("release-deploy");
    const sql = await findSkills({
      db,
      projectId: "p1",
      query: "alter the table and migrate",
      embed: conceptEmbedder,
    });
    expect(sql[0]?.skillId).toBe("db-migration");
  });

  it("returns names and scores only, never bodies", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db, conceptEmbedder);
    const [hit] = await findSkills({
      db,
      projectId: "p1",
      query: "flaky spec",
      embed: conceptEmbedder,
    });
    expect(Object.keys(hit!).sort()).toEqual([
      "description",
      "name",
      "score",
      "skillId",
    ]);
  });

  it("falls back to keywords when embeddings are unavailable", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db);
    const hits = await findSkills({
      db,
      projectId: "p1",
      query: "flaky vitest spec",
      embed: async () => null,
    });
    expect(hits[0]?.skillId).toBe("fix-flaky-test");
  });

  it("returns nothing for an unrelated query, other projects and empty input", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db);
    expect(await findSkills({ db, projectId: "p1", query: "zebra" })).toEqual(
      [],
    );
    expect(
      await findSkills({ db, projectId: "other", query: "deploy" }),
    ).toEqual([]);
    expect(await findSkills({ db, projectId: "p1", query: "  " })).toEqual([]);
  });

  it("honours k and sees newly indexed skills (cache invalidation)", async () => {
    const db = openTestDb();
    await seedFixtureIndex(db);
    const one = await findSkills({
      db,
      projectId: "p1",
      query: "release test",
      k: 1,
    });
    expect(one).toHaveLength(1);
    db.prepare(
      "DELETE FROM skill_index WHERE skill_id = 'release-deploy'",
    ).run();
    const after = await findSkills({
      db,
      projectId: "p1",
      query: "release deploy",
    });
    expect(after.map((h) => h.skillId)).not.toContain("release-deploy");
  });
});

describe("rerankSkillHits", () => {
  const hits = [
    { skillId: "a", name: "A", description: "", score: 1 },
    { skillId: "b", name: "B", description: "", score: 0.5 },
  ];

  it("applies the model order and ignores unknown ids", async () => {
    const out = await rerankSkillHits("q", hits, async () =>
      JSON.stringify({ order: ["b", "zzz", "a"] }),
    );
    expect(out.map((h) => h.skillId)).toEqual(["b", "a"]);
  });

  it("keeps the fused order on failure", async () => {
    expect(await rerankSkillHits("q", hits, async () => null)).toEqual(hits);
    expect(await rerankSkillHits("q", hits, async () => "nope")).toEqual(hits);
  });
});
