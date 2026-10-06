import { beforeEach, describe, expect, it, vi } from "vitest";

const policyMock = vi.fn();
const flagMock = vi.fn();

vi.mock("@/lib/dispatch/resolveDispatchPolicyForExecutor", () => ({
  resolveDispatchPolicyForExecutor: (input: unknown) => policyMock(input),
}));
vi.mock(
  "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval",
  () => ({
    readProjectRunsWithoutApproval: (projectId: string) => flagMock(projectId),
  }),
);

import { DISPATCH_APPROVAL_TTL_MS } from "@/lib/dispatch/dispatchApprovalTtl.constant";
import { resolveComputerRunApprovalGate } from "@/lib/projects/acl/messaging/resolveComputerRunApprovalGate";

const gateFor = (requesterUserId: string) =>
  resolveComputerRunApprovalGate({
    projectId: "proj-1",
    requesterUserId,
    executorUserId: "user-owner",
  });

describe("resolveComputerRunApprovalGate (S0-1 / S0-2)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    policyMock.mockResolvedValue("approval");
    flagMock.mockResolvedValue(false);
  });

  it("computer owner's own assign runs (never OPEN, flag not read)", async () => {
    expect(await gateFor("user-owner")).toEqual({
      dispatchPolicy: "approval",
      approvalExpiresAt: null,
    });
    expect(flagMock).not.toHaveBeenCalled();
  });

  it("bot with the setting OFF (default): pending approval for 15 minutes", async () => {
    const before = Date.now();
    const gate = await gateFor("bot-user-1");
    expect(gate.dispatchPolicy).toBe("approval");
    const ttl = Date.parse(gate.approvalExpiresAt ?? "") - before;
    expect(ttl).toBeGreaterThanOrEqual(DISPATCH_APPROVAL_TTL_MS - 1000);
    expect(ttl).toBeLessThanOrEqual(DISPATCH_APPROVAL_TTL_MS + 1000);
    expect(policyMock).toHaveBeenCalledWith({ executorUserId: "user-owner" });
    expect(flagMock).toHaveBeenCalledWith("proj-1");
  });

  it("human member also needs approval", async () => {
    expect((await gateFor("user-member")).approvalExpiresAt).not.toBeNull();
  });

  it("setting ON: bot skips approval (OPEN for this project only)", async () => {
    flagMock.mockResolvedValue(true);
    expect(await gateFor("bot-user-1")).toEqual({
      dispatchPolicy: "open",
      approvalExpiresAt: null,
    });
  });
});
