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
    expect(sqlMock.mock.calls.length).toBeGreaterThanOrEqual(5);
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

  it("creates computer_acks in the History 060 shape", async () => {
    await ensureProjectMessageDeleteOnReadSchema();
    const create = sqlMock.mock.calls
      .map((c) => String(c[0]))
      .find((q) =>
        q.includes("CREATE TABLE IF NOT EXISTS project_message_computer_acks"),
      );
    expect(create).toMatch(/device_id TEXT NOT NULL/);
    expect(create).toMatch(/PRIMARY KEY \(project_id, message_id\)/);
    expect(create).not.toMatch(/\bid TEXT PRIMARY KEY/);
  });

  it("only adds device_id as nullable on a live 056 table", async () => {
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
});
