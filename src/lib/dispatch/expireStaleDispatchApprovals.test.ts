import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const updateStatus = vi.fn();
const remove = vi.fn();
const listAll = vi.fn();
const notify = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  updateAgentRunStatus: (...a: unknown[]) => updateStatus(...a),
}));
vi.mock("@/lib/dispatch/dispatchApprovalRegistry", () => ({
  dispatchApprovalRegistry: {
    remove: (id: string) => remove(id),
    listAll: () => listAll(),
  },
}));
vi.mock(
  "@/lib/projects/acl/runApprovals/notifyComputerRunApprovalTimedOut",
  () => ({ notifyComputerRunApprovalTimedOut: (r: unknown) => notify(r) }),
);

import { expireStaleDispatchApprovals } from "@/lib/dispatch/expireStaleDispatchApprovals";

describe("expireStaleDispatchApprovals (timed_out push)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listAll.mockReturnValue([]);
    updateStatus.mockResolvedValue({
      id: "run-1",
      status: "expired",
      executorUserId: "owner-1",
      requesterUserId: "bot-1",
      projectId: "proj-1",
      denialReason: "Dispatch approval expired.",
    });
  });

  it("marks expired and pushes timed_out on the live approval channel", async () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    sqlMock.mockResolvedValue([
      { id: "run-1", approval_expires_at: past },
    ]);
    await expect(expireStaleDispatchApprovals()).resolves.toBe(1);
    expect(updateStatus).toHaveBeenCalledWith("run-1", "expired", {
      denialReason: "Dispatch approval expired.",
    });
    expect(remove).toHaveBeenCalledWith("run-1");
    expect(notify).toHaveBeenCalledWith(
      expect.objectContaining({ id: "run-1", status: "expired" }),
    );
  });
});
