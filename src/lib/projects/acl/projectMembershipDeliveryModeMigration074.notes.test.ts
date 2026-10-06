import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { AGENT_ACCESS_EMAIL_DOMAIN } from "@/lib/agentAccess/agentAccess.constant";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

const read = (...parts: string[]) =>
  fs.readFileSync(path.join(process.cwd(), ...parts), "utf8");

const MIG = "db/migrations/074-project-membership-delivery-mode.sql";

describe("074 project membership delivery_mode DDL", () => {
  it("adds the column (default webhook) and allows only webhook|poll", () => {
    const sql = read(MIG);
    expect(sql).toContain(
      "ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook'",
    );
    expect(sql).toContain("CHECK (delivery_mode IN ('webhook', 'poll'))");
  });

  it("backfills poll only for active assistant seats with no stored wake link", () => {
    const sql = read(MIG);
    const update = sql.slice(sql.indexOf("UPDATE project_memberships m"));
    expect(update).toContain("SET delivery_mode = 'poll'");
    expect(update).toContain(`u.email LIKE '%@${AGENT_ACCESS_EMAIL_DOMAIN}'`);
    expect(update).toContain("m.status = 'active'");
    expect(update).toContain("m.role = 'member'");
    expect(update).toContain("m.member_kind = 'bot'");
    expect(update).toContain("m.delivery_mode = 'webhook'");
    // Either wake link kind keeps the seat on webhook.
    expect(update).toMatch(
      /NOT EXISTS \(\s*SELECT 1 FROM project_membership_grok_routine_webhooks g/,
    );
    expect(update).toMatch(
      /NOT EXISTS \(\s*SELECT 1 FROM project_membership_webhooks w[\s\S]*w\.enabled = TRUE/,
    );
    // Never reads secrets.
    expect(update).not.toMatch(/bearer_retained|secret_retained|secret_hash/);
  });

  it("adds project_invites.platform for the join-time mode", () => {
    expect(read(MIG)).toContain(
      "ALTER TABLE project_invites\n  ADD COLUMN IF NOT EXISTS platform TEXT;",
    );
  });

  it("soft ensure is additive with the same webhook default + invite platform", () => {
    const src = read(
      "src/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema.ts",
    );
    expect(src).toContain(
      "ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook'",
    );
    expect(src).toContain("ADD COLUMN IF NOT EXISTS platform TEXT");
  });
});

describe("resolveInitialProjectMembershipDeliveryMode", () => {
  it("wake link → webhook; no-wake → poll; grok/unknown → webhook; other platforms → poll", () => {
    const r = resolveInitialProjectMembershipDeliveryMode;
    expect(r({ platform: "copilot_studio", hasWakeLink: true })).toBe(
      "webhook",
    );
    expect(r({ platform: "muse", hasWakeLink: true })).toBe("webhook");
    expect(r({ noWakeChosen: true })).toBe("poll");
    expect(r({ platform: "grok", noWakeChosen: true })).toBe("poll");
    expect(r({ platform: "Copilot_Studio" })).toBe("poll");
    expect(r({ platform: "muse" })).toBe("poll");
    expect(r({ platform: "grok" })).toBe("webhook");
    expect(r({ platform: " GROK " })).toBe("webhook");
    expect(r({ platform: null })).toBe("webhook");
    expect(r({})).toBe("webhook");
  });
});
