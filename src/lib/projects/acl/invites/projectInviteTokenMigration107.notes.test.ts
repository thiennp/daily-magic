import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const MIG = "db/migrations/107-project-invite-token-ciphertext.sql";

describe("107 project invite token ciphertext DDL", () => {
  it("adds nullable token_ciphertext + token_iv on project_invites only", () => {
    const sql = fs.readFileSync(path.join(process.cwd(), MIG), "utf8");
    const ddl = sql
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n");
    expect(ddl).toMatch(
      /ALTER TABLE project_invites\s+ADD COLUMN IF NOT EXISTS token_ciphertext TEXT;/,
    );
    expect(ddl).toMatch(
      /ALTER TABLE project_invites\s+ADD COLUMN IF NOT EXISTS token_iv TEXT;/,
    );
    expect(ddl).not.toMatch(/NOT NULL|DROP|token_hash/);
  });

  it("is the only 107 migration (108 reserved elsewhere)", () => {
    const files = fs
      .readdirSync(path.join(process.cwd(), "db/migrations"))
      .filter((name) => name.startsWith("107-"));
    expect(files).toEqual(["107-project-invite-token-ciphertext.sql"]);
  });
});
