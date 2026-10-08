import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { indexSkill, removeSkill } from "./indexSkill";
import { reindexProject } from "./reindexProject";
import { countIndexedSkills, getSkillRow, listSkillRows } from "./skillIndexDb";
import {
  FIXTURE_SKILLS,
  conceptEmbedder,
  openTestDb,
} from "./skillFixtures.testutil";
import { ensureSkillIndexSchema } from "./skillIndexSchema";
import { parseSkillText } from "./skillText";

const roots: string[] = [];
const makeRoot = (): string => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "skills-"));
  roots.push(root);
  return root;
};
afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const writeSkill = (
  root: string,
  id: string,
  version: number,
  body: string,
) => {
  const dir = path.join(root, "p1", "skills", id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({ version }));
  fs.writeFileSync(
    path.join(dir, `v${String(version).padStart(4, "0")}.md`),
    body,
  );
};

const BODY = (name: string) =>
  `---\nname: ${name}\ndescription: Does ${name}\nkeywords: [alpha, beta]\n---\n# ${name}\n\n## When to use\nWhen ${name} is needed.\n`;

describe("index add / update / remove", () => {
  it("adds, updates in place and removes a skill; schema bootstrap is idempotent", async () => {
    const db = openTestDb();
    ensureSkillIndexSchema(db);
    const skill = FIXTURE_SKILLS[0]!;
    expect((await indexSkill(db, skill, conceptEmbedder)).embedded).toBe(true);
    await indexSkill(db, { ...skill, version: 2, name: "Renamed" });
    const row = getSkillRow(db, "p1", skill.skillId);
    expect(row).toMatchObject({ name: "Renamed", version: 2, vector: null });
    expect(countIndexedSkills(db, "p1")).toBe(1);
    removeSkill(db, "p1", skill.skillId);
    expect(countIndexedSkills(db, "p1")).toBe(0);
  });
});

describe("reindexProject", () => {
  it("indexes the mirror, skips unchanged, re-indexes new versions, drops removed", async () => {
    const root = makeRoot();
    const db = openTestDb();
    writeSkill(root, "one", 1, BODY("one"));
    writeSkill(root, "two", 1, BODY("two"));
    const embed = vi.fn(conceptEmbedder);
    const first = await reindexProject({
      db,
      projectDataDir: root,
      projectId: "p1",
      embed,
    });
    expect(first).toMatchObject({ indexed: 2, removed: 0, unchanged: 0 });
    const again = await reindexProject({
      db,
      projectDataDir: root,
      projectId: "p1",
      embed,
    });
    expect(again).toMatchObject({ indexed: 0, unchanged: 2 });
    writeSkill(root, "one", 2, BODY("one v2"));
    fs.rmSync(path.join(root, "p1", "skills", "two"), { recursive: true });
    const third = await reindexProject({
      db,
      projectDataDir: root,
      projectId: "p1",
      embed,
    });
    expect(third).toMatchObject({ indexed: 1, removed: 1 });
    expect(listSkillRows(db, "p1").map((r) => [r.skillId, r.version])).toEqual([
      ["one", 2],
    ]);
  });

  it("indexes keyword-only when Ollama is down and adds vectors once it is back", async () => {
    const root = makeRoot();
    const db = openTestDb();
    writeSkill(root, "one", 1, BODY("one"));
    await reindexProject({
      db,
      projectDataDir: root,
      projectId: "p1",
      embed: async () => null,
    });
    expect(getSkillRow(db, "p1", "one")?.vector).toBeNull();
    const retry = await reindexProject({
      db,
      projectDataDir: root,
      projectId: "p1",
      embed: async () => null,
    });
    expect(retry.indexed).toBe(0);
    await reindexProject({
      db,
      projectDataDir: root,
      projectId: "p1",
      embed: conceptEmbedder,
    });
    expect(getSkillRow(db, "p1", "one")?.vector).not.toBeNull();
  });

  it("ignores drafts, tombstones and unsafe project ids", async () => {
    const root = makeRoot();
    const db = openTestDb();
    writeSkill(root, "_drafts", 1, BODY("draft"));
    const result = await reindexProject({
      db,
      projectDataDir: root,
      projectId: "../x",
      embed: conceptEmbedder,
    });
    expect(result.indexed).toBe(0);
    expect(
      (await reindexProject({ db, projectDataDir: root, projectId: "p1" }))
        .indexed,
    ).toBe(0);
  });
});

describe("parseSkillText", () => {
  it("reads frontmatter, keywords and the When to use section", () => {
    expect(parseSkillText(BODY("x"), "fallback")).toEqual({
      name: "x",
      description: "Does x",
      whenToUse: "When x is needed.",
      keywords: "alpha beta",
    });
    expect(parseSkillText("plain text", "fallback").name).toBe("fallback");
  });
});
