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
    expect(joined).not.toMatch(/project_message_computer_acks/);
  });

  it("runs no computer_acks DDL (History owns ALTER/indexes)", async () => {
    await ensureProjectMessageDeleteOnReadSchema();
    const queries = sqlMock.mock.calls.map((c) => String(c[0]));
    expect(
      queries.some((q) => q.includes("project_message_computer_acks")),
    ).toBe(false);
  });
});
