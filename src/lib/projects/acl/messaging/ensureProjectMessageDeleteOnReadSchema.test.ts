import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

import {
  ensureProjectMessageDeleteOnReadSchema,
  resetProjectMessageDeleteOnReadSchemaForTests,
} from "@/lib/projects/acl/messaging/ensureProjectMessageDeleteOnReadSchema";

describe("ensureProjectMessageDeleteOnReadSchema", () => {
  beforeEach(() => {
    resetProjectMessageDeleteOnReadSchemaForTests();
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([]);
  });

  it("runs DDL once then no-ops", async () => {
    await ensureProjectMessageDeleteOnReadSchema();
    await ensureProjectMessageDeleteOnReadSchema();
    expect(sqlMock.mock.calls.length).toBeGreaterThanOrEqual(4);
    const first = sqlMock.mock.calls.length;
    await ensureProjectMessageDeleteOnReadSchema();
    expect(sqlMock.mock.calls.length).toBe(first);
  });

  it("creates outcomes before write path can insert", async () => {
    await ensureProjectMessageDeleteOnReadSchema();
    const joined = sqlMock.mock.calls.map((c) => String(c[0])).join("\n");
    expect(joined).toMatch(/project_message_outcomes/);
    expect(joined).toMatch(/read_at/);
  });

  it("does not CREATE computer_acks (History mig 060 owns that)", async () => {
    await ensureProjectMessageDeleteOnReadSchema();
    const queries = sqlMock.mock.calls.map((c) => String(c[0]));
    expect(
      queries.some((q) =>
        q.includes("CREATE TABLE IF NOT EXISTS project_message_computer_acks"),
      ),
    ).toBe(false);
  });

  it("only adds device_id as nullable when computer_acks already exists", async () => {
    await ensureProjectMessageDeleteOnReadSchema();
    const queries = sqlMock.mock.calls.map((c) => String(c[0]));
    const add = queries.find((q) =>
      /ALTER TABLE project_message_computer_acks\s+ADD COLUMN IF NOT EXISTS device_id TEXT\s*$/.test(
        q.trim(),
      ),
    );
    expect(add).toBeDefined();
    expect(
      queries.some((q) => /SET NOT NULL|DROP CONSTRAINT|DROP COLUMN/.test(q)),
    ).toBe(false);
    expect(queries.join("\n")).toMatch(
      /project_message_computer_acks_acked_idx/,
    );
  });

  it("skips computer_acks alters when the table is missing", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings[0] ?? "");
      if (q.includes("project_message_computer_acks")) {
        const err = Object.assign(new Error('relation "project_message_computer_acks" does not exist'), {
          code: "42P01",
        });
        throw err;
      }
      return [];
    });
    await expect(ensureProjectMessageDeleteOnReadSchema()).resolves.toBeUndefined();
    const queries = sqlMock.mock.calls.map((c) => String(c[0]));
    expect(queries.some((q) => q.includes("project_message_outcomes"))).toBe(
      true,
    );
  });
});
