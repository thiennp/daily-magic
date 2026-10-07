import { describe, expect, it } from "vitest";

import { resolveBillingEntitlements } from "@/lib/billing/resolveBillingEntitlements";
import type { BillingPlanRow } from "@/lib/billing/types/BillingPlanRow.type";

const row = (partial: Partial<BillingPlanRow>): BillingPlanRow => ({
  plan: "trial",
  trialStartedAt: "2026-10-01T00:00:00.000Z",
  trialEndsAt: "2026-10-31T00:00:00.000Z",
  adminFree: false,
  seatCount: 1,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  ...partial,
});

describe("resolveBillingEntitlements", () => {
  it("gates cloud storage off for trial and admin_free", () => {
    expect(
      resolveBillingEntitlements({ row: row({ plan: "trial" }) })
        .cloudMessageStorage,
    ).toBe(false);
    expect(
      resolveBillingEntitlements({
        row: row({ plan: "admin_free", adminFree: true }),
      }).cloudMessageStorage,
    ).toBe(false);
  });

  it("enables cloud storage for paid plans and sets assistant limits", () => {
    const pro = resolveBillingEntitlements({ row: row({ plan: "pro" }) });
    expect(pro.cloudMessageStorage).toBe(true);
    expect(pro.maxComputers).toBe(2);
    expect(pro.maxAssistantConnects).toBe(3);
    const team = resolveBillingEntitlements({
      row: row({ plan: "team", seatCount: 3 }),
    });
    expect(team.maxAssistantConnects).toBe(10);
    expect(team.seats).toBe(3);
  });

  it("passes through trialGate without exposing euros", () => {
    const ents = resolveBillingEntitlements({
      row: row({ plan: "trial" }),
      trialGate: "closed",
      trialGateReason: "Trial capacity is full.",
    });
    expect(ents.trialGate).toBe("closed");
    expect(JSON.stringify(ents)).not.toMatch(/eur|margin|cogs/i);
  });

  it("gives closed-gate mint zero trial entitlements until checkout", () => {
    const ents = resolveBillingEntitlements({
      row: row({ plan: "trial", trialStartedAt: null, trialEndsAt: null }),
      trialGate: "closed",
    });
    expect(ents.maxComputers).toBe(0);
    expect(ents.maxAssistantConnects).toBe(0);
    expect(ents.cloudMessageStorage).toBe(false);
  });
});
