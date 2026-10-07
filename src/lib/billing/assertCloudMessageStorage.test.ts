import { beforeEach, describe, expect, it, vi } from "vitest";

const loadBillingPlanForUser = vi.fn();

vi.mock("@/lib/billing/loadBillingPlanForUser", () => ({
  loadBillingPlanForUser: (...args: readonly unknown[]) =>
    loadBillingPlanForUser(...args),
}));

import { assertCloudMessageStorage } from "@/lib/billing/assertCloudMessageStorage";

const row = (plan: string) => ({
  plan,
  trialStartedAt: null,
  trialEndsAt: null,
  adminFree: plan === "admin_free",
  seatCount: 1,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
});

describe("assertCloudMessageStorage", () => {
  beforeEach(() => {
    loadBillingPlanForUser.mockReset();
  });

  it("allows paid plans", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("pro"));
    await expect(
      assertCloudMessageStorage({ userId: "u1" }),
    ).resolves.toEqual({ ok: true });
  });

  it("denies trial and admin_free", async () => {
    loadBillingPlanForUser.mockResolvedValue(row("trial"));
    const trial = await assertCloudMessageStorage({ userId: "u1" });
    expect(trial).toMatchObject({
      ok: false,
      code: "cloud_message_storage_off",
    });

    loadBillingPlanForUser.mockResolvedValue(row("admin_free"));
    const free = await assertCloudMessageStorage({ userId: "u1" });
    expect(free).toMatchObject({
      ok: false,
      code: "cloud_message_storage_off",
    });
  });
});
