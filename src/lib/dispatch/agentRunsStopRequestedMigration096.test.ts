import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SQL = readFileSync(
  join(process.cwd(), "db/migrations/096-agent-runs-stop-requested.sql"),
  "utf8",
);

describe("migration 096 agent_runs stop request (S0-7)", () => {
  it("is additive and idempotent", () => {
    expect(SQL).toMatch(
      /ADD COLUMN IF NOT EXISTS stop_requested_at TIMESTAMPTZ/,
    );
    expect(SQL).toMatch(
      /ADD COLUMN IF NOT EXISTS stop_requested_by_user_id TEXT/,
    );
    expect(SQL).not.toMatch(/DROP\s|ALTER COLUMN|NOT NULL/);
  });
});
