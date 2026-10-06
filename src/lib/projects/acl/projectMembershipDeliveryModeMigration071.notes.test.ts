import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

const read = (...parts: string[]) =>
  fs.readFileSync(path.join(process.cwd(), ...parts), "utf8");

describe("071 project membership delivery_mode DDL", () => {
  it("backfills every existing seat to webhook and allows only webhook|poll", () => {
    const sql = read("db/migrations/071-project-membership-delivery-mode.sql");
    expect(sql).toContain(
      "ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook'",
    );
    expect(sql).toContain("CHECK (delivery_mode IN ('webhook', 'poll'))");
  });

  it("soft ensure is additive with the same webhook default", () => {
    const src = read(
      "src/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema.ts",
    );
    expect(src).toContain(
      "ADD COLUMN IF NOT EXISTS delivery_mode TEXT NOT NULL DEFAULT 'webhook'",
    );
  });
});

describe("resolveInitialProjectMembershipDeliveryMode", () => {
  it("wake link → webhook; no-wake choice or Copilot Studio → poll; else webhook", () => {
    expect(
      resolveInitialProjectMembershipDeliveryMode({
        platform: "copilot_studio",
        hasWakeLink: true,
      }),
    ).toBe("webhook");
    expect(
      resolveInitialProjectMembershipDeliveryMode({ noWakeChosen: true }),
    ).toBe("poll");
    expect(
      resolveInitialProjectMembershipDeliveryMode({
        platform: "Copilot_Studio",
      }),
    ).toBe("poll");
    expect(
      resolveInitialProjectMembershipDeliveryMode({ platform: "grok" }),
    ).toBe("webhook");
    expect(resolveInitialProjectMembershipDeliveryMode({})).toBe("webhook");
  });
});
