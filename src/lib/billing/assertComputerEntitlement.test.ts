import { beforeEach, describe, expect, it, vi } from "vitest";

const loadBillingPlanForUser = vi.fn();
const loadCostControlSnapshot = vi.fn();
const countActiveComputersForUser = vi.fn();

vi.mock("@/lib/billing/loadBillingPlanForUser", () => ({
  loadBillingPlanForUser: (...args: readonly unknown[]) =>
    loadBillingPlanForUser(...args),
}));
vi.mock("@/lib/billing/loadCostControlSnapshot", () => ({
  loadCostControlSnapshot: (...args: readonly unknown[]) =>
    loadCostControlSnapshot(...args),
}));
vi.mock("@/lib/billing/countActiveComputersForUser", () => ({
  countActiveComputersForUser: (...args: readonly unknown[]) =>
    countActiveComputersForUser(...args),
}));

import { assertComputerEntitlement } from "@/lib/billing/assertComputerEntitlement";

const row = (plan: string) => ({
  plan,
  trialStartedAt: null,
  trialEndsAt: null,
  adminFree: false,
  seatCount: 1,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
});

describe("assertComputerEntitlement", () => {
  beforeEach(() => {
    loadBillingPlanForUser.mockReset();
    loadCostControlSnapshot.mockReset();
    countActiveComputersForUser.mockReset();
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "open" });
    countActiveComputersForUser.mockResolvedValue(0);
  });

  it("denies trial_closed for trial plan when infra gate is closed", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("trial"));
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "closed" });
    const result = await assertComputerEntitlement({ userId: "u1" });
    expect(result).toMatchObject({ ok: false, code: "trial_closed" });
  });

  it("still allows paid plan when trialGate is closed", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("pro"));
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "closed" });
    await expect(
      assertComputerEntitlement({ userId: "u1" }),
    ).resolves.toEqual({ ok: true });
  });

  it("denies computer_limit at cap", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("pro"));
    countActiveComputersForUser.mockResolvedValue(2);
    const result = await assertComputerEntitlement({ userId: "u1" });
    expect(result).toMatchObject({ ok: false, code: "computer_limit" });
  });
});
