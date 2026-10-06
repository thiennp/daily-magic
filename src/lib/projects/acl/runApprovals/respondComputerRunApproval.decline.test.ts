import { beforeEach, describe, expect, it, vi } from "vitest";

const getRun = vi.fn();
const expire = vi.fn();
const hydrate = vi.fn();
const resolvePending = vi.fn();
const claim = vi.fn();
const deny = vi.fn();

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: (id: string) => getRun(id),
}));
vi.mock("@/lib/dispatch/expireStaleDispatchApprovals", () => ({
  expireStaleDispatchApprovals: () => expire(),
}));
vi.mock("@/lib/dispatch/restoreDispatchApprovalRegistry", () => ({
  ensureDispatchApprovalsHydrated: () => hydrate(),
}));
vi.mock("@/lib/dispatch/resolvePendingDispatchApproval", () => ({
  resolvePendingDispatchApproval: (...a: unknown[]) => resolvePending(...a),
}));
vi.mock("@/lib/dispatch/claimPendingDispatchApprovalDecision", () => ({
  claimPendingDispatchApprovalDecision: (i: unknown) => claim(i),
  releaseDispatchApprovalClaim: vi.fn(),
}));
vi.mock("@/lib/dispatch/approveDispatchApproval", () => ({
  approveDispatchApproval: vi.fn(),
  denyDispatchApproval: (...a: unknown[]) => deny(...a),
}));
vi.mock("@/lib/dispatch/dispatchApprovalRegistry", () => ({
  dispatchApprovalRegistry: { remove: vi.fn() },
}));
vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));
vi.mock("@/lib/agentWitch/types/AgentWitchMessageType.constant", () => ({
  AGENT_WITCH_MESSAGE_TYPES: {
    SYSTEM_ACK: "system.ack",
    SYSTEM_ERROR: "system.error",
  },
}));

import { respondComputerRunApproval } from "@/lib/projects/acl/runApprovals/respondComputerRunApproval";

const pendingRun = {
  id: "run-1",
  projectId: "proj-1",
  executorUserId: "owner-1",
  status: "pending_approval",
};

describe("respondComputerRunApproval (decline / errors)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    expire.mockResolvedValue(0);
    hydrate.mockResolvedValue(undefined);
    getRun.mockResolvedValue(pendingRun);
    resolvePending.mockResolvedValue({
      runId: "run-1",
      requesterUserId: "bot-1",
      executorUserId: "owner-1",
      prompt: "x",
      groupId: null,
      writerAgent: "claude-cli",
      deviceId: "dev-1",
    });
    claim.mockResolvedValue(true);
    deny.mockResolvedValue({ type: "system.ack", payload: {} });
  });

  it("declines pending; forbidden when actor is not the executor", async () => {
    await expect(
      respondComputerRunApproval({
        projectId: "proj-1",
        runId: "run-1",
        actorUserId: "owner-1",
        decision: "decline",
      }),
    ).resolves.toEqual({ ok: true, state: "declined", runId: "run-1" });
    expect(deny).toHaveBeenCalled();
    await expect(
      respondComputerRunApproval({
        projectId: "proj-1",
        runId: "run-1",
        actorUserId: "other",
        decision: "approve",
      }),
    ).resolves.toEqual({ ok: false, code: "forbidden" });
  });

  it("404 when run is missing or on another project", async () => {
    getRun.mockResolvedValue(null);
    await expect(
      respondComputerRunApproval({
        projectId: "proj-1", runId: "missing", actorUserId: "owner-1", decision: "approve",
      }),
    ).resolves.toEqual({ ok: false, code: "not_found" });
    getRun.mockResolvedValue({ ...pendingRun, projectId: "other" });
    await expect(
      respondComputerRunApproval({
        projectId: "proj-1", runId: "run-1", actorUserId: "owner-1", decision: "approve",
      }),
    ).resolves.toEqual({ ok: false, code: "not_found" });
  });
});
