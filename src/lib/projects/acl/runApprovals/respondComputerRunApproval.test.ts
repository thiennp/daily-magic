import { beforeEach, describe, expect, it, vi } from "vitest";

const getRun = vi.fn();
const expire = vi.fn();
const hydrate = vi.fn();
const resolvePending = vi.fn();
const claim = vi.fn();
const release = vi.fn();
const approve = vi.fn();
const deny = vi.fn();
const remove = vi.fn();

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
  releaseDispatchApprovalClaim: (i: unknown) => release(i),
}));
vi.mock("@/lib/dispatch/approveDispatchApproval", () => ({
  approveDispatchApproval: (...a: unknown[]) => approve(...a),
  denyDispatchApproval: (...a: unknown[]) => deny(...a),
}));
vi.mock("@/lib/dispatch/dispatchApprovalRegistry", () => ({
  dispatchApprovalRegistry: { remove: (id: string) => remove(id) },
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

describe("respondComputerRunApproval", () => {
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
    approve.mockResolvedValue({ type: "system.ack", payload: {} });
    deny.mockResolvedValue({ type: "system.ack", payload: {} });
  });

  it("approves via the same claim path; second call is 409 invalid_transition", async () => {
    const first = await respondComputerRunApproval({
      projectId: "proj-1",
      runId: "run-1",
      actorUserId: "owner-1",
      decision: "approve",
    });
    expect(first).toEqual({ ok: true, state: "approved", runId: "run-1" });
    expect(claim).toHaveBeenCalledWith({
      runId: "run-1",
      executorUserId: "owner-1",
      decision: "approve",
      denialReason: null,
    });
    getRun.mockResolvedValue({ ...pendingRun, status: "running" });
    const second = await respondComputerRunApproval({
      projectId: "proj-1",
      runId: "run-1",
      actorUserId: "owner-1",
      decision: "decline",
    });
    expect(second).toEqual({ ok: false, code: "invalid_transition" });
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
        projectId: "proj-1",
        runId: "missing",
        actorUserId: "owner-1",
        decision: "approve",
      }),
    ).resolves.toEqual({ ok: false, code: "not_found" });
    getRun.mockResolvedValue({ ...pendingRun, projectId: "other" });
    await expect(
      respondComputerRunApproval({
        projectId: "proj-1",
        runId: "run-1",
        actorUserId: "owner-1",
        decision: "approve",
      }),
    ).resolves.toEqual({ ok: false, code: "not_found" });
  });
});
