import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: vi.fn(() => false),
}));

vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  removeAgentRunSession: vi.fn(),
}));

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
  getSql: () => sqlMock,
}));

import { removeAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { deleteActiveAgentRunsForRevokedDevice } from "@/lib/dispatch/deleteActiveAgentRunsForRevokedDevice";
describe("deleteActiveAgentRunsForRevokedDevice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sqlMock.mockReset();
  });

  it("removes in-flight runs for the revoked device and clears session cache", async () => {
    sqlMock.mockResolvedValue([{ id: "run-1" }, { id: "run-2" }]);

    const deletedRunIds = await deleteActiveAgentRunsForRevokedDevice({
      deviceId: "device-1",
      userId: "user-1",
    });

    expect(deletedRunIds).toEqual(["run-1", "run-2"]);
    expect(removeAgentRunSession).toHaveBeenCalledWith("run-1");
    expect(removeAgentRunSession).toHaveBeenCalledWith("run-2");
  });
});
