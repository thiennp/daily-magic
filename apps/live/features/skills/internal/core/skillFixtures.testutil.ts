import { DatabaseSync } from "node:sqlite";

import { indexSkill } from "./indexSkill";
import type {
  SkillDescriptor,
  SkillEmbedder,
  SkillIndexDb,
} from "./skillIndex.types";
import { ensureSkillIndexSchema } from "./skillIndexSchema";

const base = {
  projectId: "p1",
  version: 1,
  hasScripts: false,
} as const;

export const FIXTURE_SKILLS: readonly SkillDescriptor[] = [
  {
    ...base,
    skillId: "release-deploy",
    name: "Release deploy",
    description: "Publish a new build to production and verify it is live",
    whenToUse: "Shipping a version to prod after the tests are green",
    keywords: "deploy release publish production",
  },
  {
    ...base,
    skillId: "db-migration",
    name: "Database migration",
    description: "Add a column and migrate the schema safely",
    whenToUse: "Changing tables or the SQL schema",
    keywords: "database schema sql migrate column",
  },
  {
    ...base,
    skillId: "fix-flaky-test",
    name: "Fix a flaky test",
    description: "Find why a spec fails sometimes and make it stable",
    whenToUse: "A test passes and fails without code changes",
    keywords: "test flaky spec vitest",
  },
  {
    ...base,
    skillId: "changelog-entry",
    name: "Changelog entry",
    description: "Write the release notes line for a merged change",
    whenToUse: "After merging a user visible change",
    keywords: "changelog notes docs",
  },
];

/** Concept axes: words of one concept share a dimension (a fake nomic). */
const CONCEPTS: readonly (readonly string[])[] = [
  ["deploy", "release", "ship", "publish", "production", "prod", "live"],
  ["database", "schema", "sql", "migrate", "migration", "column", "table"],
  ["test", "spec", "flaky", "unstable", "vitest", "stable"],
  ["changelog", "notes", "docs", "document"],
];

export const conceptEmbedder: SkillEmbedder = async (text) => {
  const words = text.toLowerCase().split(/[^a-z]+/);
  const vector = new Float32Array(CONCEPTS.length + 1);
  CONCEPTS.forEach((concept, i) => {
    vector[i] = words.filter((w) => concept.includes(w)).length;
  });
  vector[CONCEPTS.length] = 0.01;
  return vector;
};

export const openTestDb = (): SkillIndexDb => {
  const db = new DatabaseSync(":memory:");
  ensureSkillIndexSchema(db);
  return db;
};

export const seedFixtureIndex = async (
  db: SkillIndexDb,
  embed?: SkillEmbedder,
): Promise<void> => {
  for (const skill of FIXTURE_SKILLS) {
    await indexSkill(db, skill, embed);
  }
};
