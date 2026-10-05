import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (...parts: string[]) =>
  fs.readFileSync(path.join(process.cwd(), ...parts), "utf8");

describe("068 project membership computer DDL", () => {
  it("adds device_id, computer kind, and unique active device index", () => {
    const sql = read("db/migrations/068-project-membership-computer.sql");
    expect(sql).toContain("ADD COLUMN IF NOT EXISTS device_id TEXT");
    expect(sql).toContain("member_kind IN ('human', 'bot', 'computer')");
    expect(sql).toContain(
      "member_kind <> 'computer' OR device_id IS NOT NULL",
    );
    expect(sql).toContain("member_kind <> 'computer' OR role = 'member'");
    expect(sql).toContain("member_kind = 'computer' OR device_id IS NULL");
    expect(sql).toContain(
      "project_memberships_project_device_computer_active_idx",
    );
    expect(sql).toContain("member_kind IN ('human', 'bot')");
    expect(sql).toContain("DROP INDEX IF EXISTS project_memberships_project_user_active_idx");
  });

  it("soft ensure is additive only", () => {
    const src = read(
      "src/lib/projects/acl/ensureProjectComputerMembershipSchema.ts",
    );
    expect(src).toContain("ADD COLUMN IF NOT EXISTS device_id TEXT");
    expect(src).toContain(
      "project_memberships_project_device_computer_active_idx",
    );
    expect(src).not.toMatch(/CHECK \(member_kind/);
  });
});
