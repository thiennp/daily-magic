import { beforeEach, describe, expect, it, vi } from "vitest";

const loadBillingPlanForUser = vi.fn();
const loadCostControlSnapshot = vi.fn();
const countActiveComputersForUser = vi.fn();
const listActiveComputersForLimit = vi.fn();

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

vi.mock("@/lib/billing/listActiveComputersForLimit", () => ({
  listActiveComputersForLimit: (...args: readonly unknown[]) =>
    listActiveComputersForLimit(...args),
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
    loadBillingPlanForUser.mockResolvedValue({
      ...row("trial"),
      trialStartedAt: "2026-10-01T00:00:00.000Z",
      trialEndsAt: "2026-11-01T00:00:00.000Z",
    });
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "closed" });
    const result = await assertComputerEntitlement({ userId: "u1" });
    expect(result).toMatchObject({ ok: false, code: "trial_closed" });
  });

  it("still allows paid plan when trialGate is closed", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("pro"));
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "closed" });
    await expect(assertComputerEntitlement({ userId: "u1" })).resolves.toEqual({
      ok: true,
    });
  });

  it("denies computer_limit at cap", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("pro"));
    countActiveComputersForUser.mockResolvedValue(5);
    listActiveComputersForLimit.mockResolvedValue([
      ...["A", "B", "C"].map((label) => ({
        label,
        lastSeenAt: new Date().toISOString(),
      })),
      { label: "Your computer", lastSeenAt: null },
      { label: "Grey - Study", lastSeenAt: "2026-10-01T00:00:00.000Z" },
    ]);
    const result = await assertComputerEntitlement({ userId: "u1" });
    expect(result).toMatchObject({ ok: false, code: "computer_limit" });
    expect(result.ok ? "" : result.errorMessage).toContain(
      "5 are linked to your account (3 online, 2 offline: Your computer, Grey - Study)",
    );
  });

  it("denies trial_closed for closed-gate mint without trial dates", async () => {
    loadBillingPlanForUser.mockResolvedValue({
      plan: "trial",
      trialStartedAt: null,
      trialEndsAt: null,
      adminFree: false,
      seatCount: 1,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
    });
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "open" });
    countActiveComputersForUser.mockResolvedValue(0);
    const result = await assertComputerEntitlement({ userId: "u1" });
    expect(result).toMatchObject({ ok: false, code: "trial_closed" });
  });
});
