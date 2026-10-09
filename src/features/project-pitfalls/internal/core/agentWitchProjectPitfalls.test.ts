import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  AGENTWITCH_PROJECT_ID,
  AGENTWITCH_PROJECT_PITFALLS,
} from "@/features/project-pitfalls/internal/core/agentWitchProjectPitfalls.constant";
import { PROJECT_PITFALL_SEEDS } from "@/features/project-pitfalls/internal/core/projectPitfallSeeds.constant";
import { validateProjectPitfallUpsert } from "@/features/project-pitfalls/internal/core/validateProjectPitfallUpsert";

const readMigration = (name: string): string =>
  fs.readFileSync(path.join(process.cwd(), "db/migrations", name), "utf8");
const sql099 = readMigration("099-project-pitfall-seeds-project-scoped.sql");
const sql067 = readMigration("067-project-pitfalls.sql");
// 129 rewords three seeds; the text is then in 099 (old) or 129 (new).
const sql099Or129 = `${sql099}\n${readMigration("129-pitfall-text-product-name.sql")}`;
const quoted = (text: string): string => `'${text.replace(/'/g, "''")}'`;
const MOVED_IDS = [
  "arch-max-lines",
  "symlink-node-modules",
  "install-bundle-clobber",
  "stale-next",
  "main-moved-rebase",
  "health-lag",
  "local-suite-gate",
  "no-prs",
  "dirty-home-checkout",
  "box-no-gh-auth",
];

describe("AGENTWITCH_PROJECT_PITFALLS (former AgentWitch seeds)", () => {
  it("moves the 10 agentwitch seeds; with the generic seed they cover 067", () => {
    const ids = AGENTWITCH_PROJECT_PITFALLS.map((pitfall) => pitfall.id);
    expect(ids).toEqual(MOVED_IDS);
    const all = [...ids, ...PROJECT_PITFALL_SEEDS.map((seed) => seed.id)];
    expect(new Set(all).size).toBe(11);
    all.forEach((id) => {
      expect(sql067).toContain(`(NULL, ${quoted(id)},`);
    });
  });

  it("every moved rule is a valid project upsert", () => {
    AGENTWITCH_PROJECT_PITFALLS.forEach((pitfall) => {
      expect(
        validateProjectPitfallUpsert({ ...pitfall, source: "project" }).ok,
      ).toBe(true);
    });
  });

  it("099 copies the same text onto the AgentWitch project as source project", () => {
    expect(sql099).toContain(`ON p.id = ${quoted(AGENTWITCH_PROJECT_ID)}`);
    expect(sql099).toContain("'project', v.severity");
    expect(sql099).toContain("DO NOTHING");
    AGENTWITCH_PROJECT_PITFALLS.forEach((pitfall) => {
      [
        pitfall.id,
        pitfall.symptom,
        pitfall.cause,
        pitfall.avoidance,
        pitfall.check.value,
        pitfall.severity,
      ].forEach((text) => {
        expect(sql099Or129).toContain(quoted(text));
      });
    });
  });

  it("099 only deletes the global seed rows it moved", () => {
    const code = sql099.replace(/--.*$/gm, "");
    const deletes = code.match(/DELETE FROM[\s\S]*?;/g) ?? [];
    expect(deletes).toHaveLength(1);
    expect(deletes[0]).toContain("project_id IS NULL");
    expect(deletes[0]).toContain("source = 'seed'");
    expect(deletes[0]).toContain(
      `pitfall_id IN (${MOVED_IDS.map(quoted).join(", ")})`,
    );
    const statements = code.replace(/'(?:[^']|'')*'/g, "''");
    expect(statements).not.toMatch(/\bUPDATE\b|\bTRUNCATE\b|\bDROP\b/i);
  });
});
