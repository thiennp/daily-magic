import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const MIG = "db/migrations/101-billing-cost-control.sql";

const read = (): string =>
  fs.readFileSync(path.join(process.cwd(), MIG), "utf8");

describe("101 billing cost-control DDL", () => {
  it("adds plan/trial/admin_free/seat/stripe columns on users", () => {
    const sql = read();
    expect(sql).toContain("ADD COLUMN IF NOT EXISTS plan TEXT");
    expect(sql).toContain("trial_started_at");
    expect(sql).toContain("trial_ends_at");
    expect(sql).toContain("admin_free");
    expect(sql).toContain("seat_count");
    expect(sql).toContain("stripe_customer_id");
    expect(sql).toMatch(
      /CHECK \(plan IN \('trial', 'pro', 'team', 'admin_free'\)\)/,
    );
  });

  it("creates infra spend month meter with open|closed trial_gate", () => {
    const sql = read();
    expect(sql).toContain("billing_infra_spend_months");
    expect(sql).toContain("railway_spend_eur");
    expect(sql).toContain("neon_spend_eur");
    expect(sql).toContain("related_infra_spend_eur");
    expect(sql).toContain("CHECK (trial_gate IN ('open', 'closed'))");
  });
});
