import { beforeEach, describe, expect, it, vi } from "vitest";

const findPlaceholder = vi.fn();
const revokePlaceholder = vi.fn();
const countOthers = vi.fn();
const listComputers = vi.fn();

vi.mock("@/lib/agentWitch/findAgentWitchPlaceholderByToken", () => ({
  findAgentWitchPlaceholderByToken: (...args: readonly unknown[]) =>
    findPlaceholder(...args),
  revokeAgentWitchPlaceholder: (...args: readonly unknown[]) =>
    revokePlaceholder(...args),
}));
vi.mock("@/lib/billing/countOtherActiveComputersForCheckIn", () => ({
  countOtherActiveComputersForCheckIn: (...args: readonly unknown[]) =>
    countOthers(...args),
}));
vi.mock("@/lib/billing/listActiveComputersForLimit", () => ({
  listActiveComputersForLimit: (...args: readonly unknown[]) =>
    listComputers(...args),
}));
vi.mock("@/lib/billing/loadBillingPlanForUser", () => ({
  loadBillingPlanForUser: async () => ({ plan: "pro" }),
}));
vi.mock("@/lib/billing/loadCostControlSnapshot", () => ({
  loadCostControlSnapshot: async () => ({ trialGate: "open" }),
}));
vi.mock("@/lib/billing/resolveBillingEntitlements", () => ({
  resolveBillingEntitlements: () => ({ maxComputers: 5 }),
}));

import { admitAgentWitchPlaceholderCheckIn } from "@/lib/agentWitch/admitAgentWitchPlaceholderCheckIn";

describe("admitAgentWitchPlaceholderCheckIn (6abb783e)", () => {
  beforeEach(() => {
    findPlaceholder.mockReset();
    revokePlaceholder.mockReset();
    countOthers.mockReset();
    listComputers.mockReset();
  });

  it("lets computers that already checked in through untouched", async () => {
    findPlaceholder.mockResolvedValue(null);

    await expect(
      admitAgentWitchPlaceholderCheckIn({
        pairingToken: "t",
        deviceLabel: "Mac#me",
      }),
    ).resolves.toEqual({ ok: true });
    expect(countOthers).not.toHaveBeenCalled();
    expect(revokePlaceholder).not.toHaveBeenCalled();
  });

  it("admits a placeholder while there is room", async () => {
    findPlaceholder.mockResolvedValue({ id: "p-1", userId: "u-1" });
    countOthers.mockResolvedValue(4);

    await expect(
      admitAgentWitchPlaceholderCheckIn({
        pairingToken: "t",
        deviceLabel: "Studio#me",
      }),
    ).resolves.toEqual({ ok: true });
    expect(countOthers).toHaveBeenCalledWith({
      userId: "u-1",
      deviceId: "p-1",
      sameComputerLabels: ["Studio#me", "Studio"],
    });
    expect(revokePlaceholder).not.toHaveBeenCalled();
  });

  it("refuses the 6th computer with the plain limit message and revokes the placeholder", async () => {
    findPlaceholder.mockResolvedValue({ id: "p-6", userId: "u-1" });
    countOthers.mockResolvedValue(5);
    listComputers.mockResolvedValue(
      ["A", "B", "C", "D", "E"].map((label) => ({ label, lastSeenAt: null })),
    );

    const result = await admitAgentWitchPlaceholderCheckIn({
      pairingToken: "t",
      deviceLabel: null,
    });

    expect(result.ok).toBe(false);
    expect(result.ok === false && result.code).toBe("computer_limit");
    expect(result.ok === false && result.errorMessage).toContain(
      "This plan allows up to 5 computers, and 5 are linked to your account",
    );
    expect(revokePlaceholder).toHaveBeenCalledWith("p-6");
    expect(countOthers).toHaveBeenCalledWith(
      expect.objectContaining({ sameComputerLabels: [] }),
    );
  });
});
