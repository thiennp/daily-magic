import { beforeEach, describe, expect, it, vi } from "vitest";

const activeMock = vi.hoisted(() => vi.fn());
const deviceMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/dispatch/deviceDispatchPolicyQueries", () => ({
  getActiveDeviceIdForUser: activeMock,
  getDeviceDispatchPolicy: deviceMock,
}));
vi.mock("@/lib/dispatch/groupUserDispatchPolicyQueries", () => ({
  getGroupDispatchPolicy: async () => "open",
  getUserAgentDispatchPolicy: async () => null,
}));
vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: () => false,
}));

import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";

describe("resolveDispatchPolicyForExecutor device", () => {
  beforeEach(() => {
    activeMock.mockResolvedValue("device-a");
    deviceMock.mockImplementation(async (id: string) =>
      id === "device-b" ? "approval" : "open",
    );
  });

  it("uses the policy of the computer the run goes to, not the most recently seen one", async () => {
    const policy = await resolveDispatchPolicyForExecutor({
      executorUserId: "u2",
      groupId: "g1",
      deviceId: "device-b",
    });
    expect(policy).toBe("approval");
    expect(activeMock).not.toHaveBeenCalled();
  });

  it("falls back to the active computer when none is given", async () => {
    expect(
      await resolveDispatchPolicyForExecutor({
        executorUserId: "u2",
        groupId: "g1",
      }),
    ).toBe("open");
  });
});
