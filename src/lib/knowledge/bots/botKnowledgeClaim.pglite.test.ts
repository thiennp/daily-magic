import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/knowledge/bots/ensureProjectBotKnowledgeSchema", () => ({
  ensureProjectBotKnowledgeSchema: async () => undefined,
}));

import {
  claimTask,
  createBotKnowledgeDb,
  eventRows,
  logLookup,
  resetBotKnowledgeDb,
} from "@/lib/knowledge/bots/botKnowledgePglite.fixtures";

describe("bot knowledge claims (PGlite, real migration SQL)", () => {
  const state: { db?: PGlite } = {};
  beforeAll(async () => {
    const made = await createBotKnowledgeDb();
    state.db = made.db;
    holder.sql = made.sql as never;
  });
  beforeEach(async () => {
    await resetBotKnowledgeDb(state.db as PGlite);
  });

  it("marks a claim as 'with lookup' only after a lookup that returned results", async () => {
    const db = state.db as PGlite;
    await claimTask("t-none");
    await logLookup(db, 0);
    await claimTask("t-empty");
    await logLookup(db, 2);
    await claimTask("t-with");
    await claimTask("t-with");
    const rows = await eventRows(db);
    expect(rows).toHaveLength(3);
    expect(
      Object.fromEntries(rows.map((r) => [String(r.task_id), r.had_lookup])),
    ).toEqual({
      "t-none": false,
      "t-empty": false,
      "t-with": true,
    });
  });
});
