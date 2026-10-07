import { beforeEach, describe, expect, it, vi } from "vitest";

const loadCostControlSnapshot = vi.fn();

vi.mock("@/lib/billing/loadCostControlSnapshot", () => ({
  loadCostControlSnapshot: (...args: readonly unknown[]) =>
    loadCostControlSnapshot(...args),
}));

import { assertTrialGateOpen } from "@/lib/billing/assertTrialGateOpen";

describe("assertTrialGateOpen", () => {
  beforeEach(() => {
    loadCostControlSnapshot.mockReset();
  });

  it("allows signup when trialGate is open", async () => {
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "open" });
    await expect(assertTrialGateOpen()).resolves.toEqual({ ok: true });
  });

  it("denies with trial_closed when trialGate is closed", async () => {
    loadCostControlSnapshot.mockResolvedValue({ trialGate: "closed" });
    const result = await assertTrialGateOpen();
    expect(result).toMatchObject({
      ok: false,
      code: "trial_closed",
    });
  });
});
