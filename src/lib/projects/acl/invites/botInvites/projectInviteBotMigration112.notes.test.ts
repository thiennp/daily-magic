import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const DIR = path.join(process.cwd(), "db/migrations");
const SUFFIX = "-project-invite-bot-same-owner.sql";

const readDdl = (): string => {
  const [file] = fs.readdirSync(DIR).filter((name) => name.endsWith(SUFFIX));
  return fs
    .readFileSync(path.join(DIR, file ?? ""), "utf8")
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");
};

describe("DF-038 bot-made invite migration (112)", () => {
  it("exists exactly once", () => {
    expect(fs.readdirSync(DIR).filter((name) => name.endsWith(SUFFIX))).toHaveLength(1);
  });

  it("is additive and idempotent", () => {
    const ddl = readDdl();
    expect(ddl).toMatch(/ADD COLUMN IF NOT EXISTS created_by_membership_id TEXT/);
    expect(ddl).toMatch(/ADD COLUMN IF NOT EXISTS bound_owner_user_id TEXT/);
    expect(ddl).toMatch(/DROP CONSTRAINT IF EXISTS project_invites_bot_made_guard_check;\s+ALTER TABLE project_invites\s+ADD CONSTRAINT project_invites_bot_made_guard_check/);
    expect(ddl).toMatch(/CREATE INDEX IF NOT EXISTS project_invites_created_by_membership_idx/);
    expect(ddl).not.toMatch(/DROP COLUMN|DROP TABLE|TEXT NOT NULL|SET NOT NULL/);
  });

  it("pins single-use, no auto-approve checkbox and a bound owner for bot-made rows", () => {
    expect(readDdl()).toMatch(
      /created_by_membership_id IS NULL\s+OR \(\s+max_uses = 1\s+AND auto_approve = FALSE\s+AND bound_owner_user_id IS NOT NULL\s+\)/,
    );
  });
});
