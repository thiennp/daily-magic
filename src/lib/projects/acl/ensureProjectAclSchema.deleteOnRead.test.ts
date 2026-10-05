import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import {
  ensureProjectAclSchema,
  resetProjectAclSchemaEnsureForTests,
} from "@/lib/projects/acl/ensureProjectAclSchema";
import { resetProjectComputerHistorySchemaForTests } from "@/lib/projects/acl/ensureProjectComputerHistorySchema";
import { resetProjectMessagePurgeForTests } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

const ddl = (): string[] => sqlMock.mock.calls.map((call) => String(call[0]));

const count = (pattern: RegExp): number =>
  ddl().filter((query) => pattern.test(query)).length;

describe("ensureProjectAclSchema owns delete-on-read ensure", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    // History soft ensure only upgrades computer_acks when the table exists.
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("to_regclass")) {
        return [{ t: "project_message_computer_acks" }];
      }
      return [];
    });
    resetProjectAclSchemaEnsureForTests();
    resetProjectComputerHistorySchemaForTests();
    resetProjectMessagePurgeForTests();
  });

  it("creates outcomes and read_at; computer_acks CREATE stays with History", async () => {
    await ensureProjectAclSchema();
    expect(count(/CREATE TABLE IF NOT EXISTS project_message_outcomes/)).toBe(
      1,
    );
    expect(
      count(/CREATE TABLE IF NOT EXISTS project_message_computer_acks/),
    ).toBe(0);
    expect(count(/ADD COLUMN IF NOT EXISTS device_id/)).toBe(1);
    expect(count(/ADD COLUMN IF NOT EXISTS read_at/)).toBe(1);
    // Only ensureProjectMessageDeleteOnReadSchema creates this index.
    expect(count(/project_message_outcomes_project_idx/)).toBe(1);
  });

  it("runs delete-on-read DDL after project_messages exists", async () => {
    await ensureProjectAclSchema();
    const queries = ddl();
    const messages = queries.findIndex((q) =>
      q.includes("CREATE TABLE IF NOT EXISTS project_messages ("),
    );
    const outcomes = queries.findIndex((q) =>
      q.includes("CREATE TABLE IF NOT EXISTS project_message_outcomes"),
    );
    expect(messages).toBeGreaterThanOrEqual(0);
    expect(outcomes).toBeGreaterThan(messages);
  });

  it("reset re-runs delete-on-read DDL with the ACL ensure", async () => {
    await ensureProjectAclSchema();
    resetProjectAclSchemaEnsureForTests();
    resetProjectComputerHistorySchemaForTests();
    sqlMock.mockClear();
    await ensureProjectAclSchema();
    expect(count(/CREATE TABLE IF NOT EXISTS project_message_outcomes/)).toBe(
      1,
    );
  });
});
