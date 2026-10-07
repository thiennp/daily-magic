import { describe, expect, it } from "vitest";

import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
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

describe("isTrialEntitlementGranted", () => {
  it("is true for paid and admin_free", () => {
    expect(isTrialEntitlementGranted(row({ plan: "pro" }))).toBe(true);
    expect(
      isTrialEntitlementGranted(row({ plan: "admin_free", adminFree: true })),
    ).toBe(true);
  });

  it("is true for trial with both dates", () => {
    expect(isTrialEntitlementGranted(row({ plan: "trial" }))).toBe(true);
  });

  it("is false for closed-gate mint (null trial dates)", () => {
    expect(
      isTrialEntitlementGranted(
        row({ plan: "trial", trialStartedAt: null, trialEndsAt: null }),
      ),
    ).toBe(false);
  });
});
