import { beforeEach, describe, expect, it, vi } from "vitest";

const claimMock = vi.fn();
const releaseMock = vi.fn();
const approveMock = vi.fn();
const denyMock = vi.fn();

vi.mock("@/lib/dispatch/restoreDispatchApprovalRegistry", () => ({
  ensureDispatchApprovalsHydrated: async () => undefined,
}));
vi.mock("@/lib/dispatch/expireStaleDispatchApprovals", () => ({
  expireStaleDispatchApprovals: async () => 0,
}));
vi.mock("@/lib/dispatch/resolvePendingDispatchApproval", () => ({
  resolvePendingDispatchApproval: async (runId: string) => ({
    runId,
    requesterUserId: "bot-user-1",
    executorUserId: "owner-1",
    prompt: "do it",
    groupId: null,
    writerAgent: "claude-cli",
    deviceId: "dev-1",
  }),
}));
vi.mock("@/lib/dispatch/claimPendingDispatchApprovalDecision", () => ({
  claimPendingDispatchApprovalDecision: (i: unknown) => claimMock(i),
  releaseDispatchApprovalClaim: (i: unknown) => releaseMock(i),
}));
vi.mock("@/lib/dispatch/approveDispatchApproval", () => ({
  approveDispatchApproval: (...args: unknown[]) => approveMock(...args),
  denyDispatchApproval: (...args: unknown[]) => denyMock(...args),
}));

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { handleDispatchApprovalRespondAsync } from "@/lib/dispatch/handleDispatchApprovalRespond";

const runtime = {} as never;
const owner = { role: "dashboard", userId: "owner-1" } as never;
const respond = (decision: "approve" | "deny") =>
  handleDispatchApprovalRespondAsync(
    runtime,
    {
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESPOND,
      payload: { runId: "run-1", decision },
      requestId: "req-1",
    } as never,
    owner,
  );

describe("handleDispatchApprovalRespondAsync (S0-3)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    approveMock.mockResolvedValue({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: { runId: "run-1", status: "running" },
    });
    denyMock.mockResolvedValue({ type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK, payload: {} });
  });

  it("the first approve dispatches; a second approve gets 409 and dispatches nothing", async () => {
    claimMock.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    await respond("approve");
    const second = await respond("approve");
    expect(approveMock).toHaveBeenCalledTimes(1);
    expect(second).toMatchObject({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { code: "approval_already_decided", status: 409, runId: "run-1" },
      requestId: "req-1",
    });
    expect(claimMock).toHaveBeenCalledWith({
      runId: "run-1",
      executorUserId: "owner-1",
      decision: "approve",
      denialReason: null,
    });
  });

  it("deny after it was already decided is a 409 too", async () => {
    claimMock.mockResolvedValue(false);
    const result = await respond("deny");
    expect(denyMock).not.toHaveBeenCalled();
    expect(result?.payload).toMatchObject({ status: 409 });
  });

  it("releases the claim when approve could not reach any computer", async () => {
    claimMock.mockResolvedValue(true);
    approveMock.mockResolvedValue({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "No Mac is available to run this task." },
    });
    await respond("approve");
    expect(releaseMock).toHaveBeenCalledWith("run-1");
  });
});
