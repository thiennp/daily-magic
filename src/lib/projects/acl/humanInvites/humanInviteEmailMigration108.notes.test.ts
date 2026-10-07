import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SQL = readFileSync(
  join(process.cwd(), "db/migrations/108-project-human-invite-email.sql"),
  "utf8",
);

describe("migration 108 human email invites (DF-025)", () => {
  it("extends project_human_invites additively and idempotently", () => {
    for (const column of [
      "status TEXT NOT NULL DEFAULT 'pending'",
      "delivery TEXT NOT NULL DEFAULT 'link'",
      "requires_approval BOOLEAN NOT NULL DEFAULT false",
      "email_sent_at TIMESTAMPTZ",
      "accepted_at TIMESTAMPTZ",
      "accepted_by_user_id TEXT",
      "accepted_display_name TEXT",
      "decided_at TIMESTAMPTZ",
      "decided_by_user_id TEXT",
      "updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()",
    ]) {
      expect(SQL).toContain(`ADD COLUMN IF NOT EXISTS ${column}`);
    }
    expect(SQL).not.toMatch(/DROP\s+(TABLE|COLUMN)/i);
    expect(SQL).not.toMatch(/CREATE TABLE/i);
  });

  it("stores metadata only — no token plaintext, link, or email body", () => {
    expect(SQL).not.toMatch(/\btoken\s+TEXT/i);
    expect(SQL).not.toMatch(/\b(url|link|body|subject|html)\s+TEXT/i);
  });

  it("constrains status, lowercase email, and dedupes open email invites", () => {
    expect(SQL).toContain(
      "CHECK (status IN ('pending', 'accepted', 'approved', 'revoked', 'expired'))",
    );
    expect(SQL).toContain("CHECK (email IS NULL OR email = lower(email))");
    expect(SQL).toMatch(
      /UNIQUE INDEX IF NOT EXISTS project_human_invites_open_email_unique_idx[\s\S]*WHERE delivery = 'email' AND status IN \('pending', 'accepted'\)/,
    );
    expect(SQL).toMatch(
      /UNIQUE INDEX IF NOT EXISTS project_human_invites_accepted_user_unique_idx/,
    );
  });

  it("existing link invites keep the one-click path (requires_approval default false)", () => {
    expect(SQL).toMatch(/requires_approval BOOLEAN NOT NULL DEFAULT false/);
  });
});
