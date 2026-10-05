import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (...parts: string[]) =>
  fs.readFileSync(path.join(process.cwd(), ...parts), "utf8");

/**
 * computer_acks DDL split:
 * - CREATE only in migration 056 (already applied; left as shipped)
 * - Full device_id data path (UPDATE / DELETE nulls / SET NOT NULL) only in 060
 * - Soft History ensure: additive ADD COLUMN + CREATE INDEX only (to_regclass)
 * - DOR / ACL soft ensures have zero computer_acks statements
 */
describe("project_message_computer_acks DDL ownership", () => {
  it("056 has the only CREATE", () => {
    const sql = read("db/migrations/056-project-message-delete-on-read.sql");
    expect(sql).toMatch(
      /CREATE TABLE IF NOT EXISTS project_message_computer_acks/,
    );
  });

  it("060 has ALTERs, data path, and indexes but no CREATE", () => {
    const sql = read("db/migrations/060-project-message-computer-acks.sql");
    expect(sql).not.toMatch(
      /CREATE TABLE IF NOT EXISTS project_message_computer_acks/,
    );
    expect(sql).toContain("ADD COLUMN IF NOT EXISTS device_id TEXT");
    expect(sql).toContain("UPDATE project_message_computer_acks");
    expect(sql).toContain("DELETE FROM project_message_computer_acks");
    expect(sql).toContain("WHERE device_id IS NULL");
    expect(sql).toContain("ALTER COLUMN device_id SET NOT NULL");
    expect(sql).toContain("project_message_computer_acks_acked_idx");
    expect(sql).toContain("project_message_computer_acks_message_idx");
  });

  it("History ensure is additive only: ADD + indexes; no data path", () => {
    const src = read(
      "src/lib/projects/acl/ensureProjectComputerHistorySchema.ts",
    );
    expect(src).not.toMatch(
      /CREATE TABLE IF NOT EXISTS project_message_computer_acks/,
    );
    expect(src).toContain("to_regclass('public.project_message_computer_acks')");
    expect(src).toContain("ADD COLUMN IF NOT EXISTS device_id");
    expect(src).toContain("project_message_computer_acks_acked_idx");
    expect(src).toContain("project_message_computer_acks_message_idx");
    expect(src).not.toMatch(/UPDATE\s+project_message_computer_acks/);
    expect(src).not.toMatch(
      /DELETE FROM project_message_computer_acks/,
    );
    expect(src).not.toMatch(/ALTER COLUMN device_id SET NOT NULL/);
  });

  it("DOR soft ensure has no computer_acks DDL", () => {
    const src = read(
      "src/lib/projects/acl/messaging/ensureProjectMessageDeleteOnReadSchema.ts",
    );
    expect(src).not.toMatch(/project_message_computer_acks/);
  });
});
