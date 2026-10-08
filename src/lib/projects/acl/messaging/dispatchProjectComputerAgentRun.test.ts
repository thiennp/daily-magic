import { beforeEach, describe, expect, it, vi } from "vitest";

const insertMock = vi.fn();
const persistMock = vi.fn();
const deliverMock = vi.fn();
const gateMock = vi.fn();
const requestApprovalMock = vi.fn();

vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);
vi.mock("@/lib/dispatch/persistAgentRun", () => ({
  persistAgentRun: (input: unknown) => persistMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/deliverProjectComputerAgentRun", () => ({
  deliverProjectComputerAgentRun: (input: unknown) => deliverMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/resolveComputerRunApprovalGate", () => ({
  resolveComputerRunApprovalGate: (input: unknown) => gateMock(input),
}));
vi.mock("@/lib/projects/acl/messaging/requestComputerRunApproval", () => ({
  requestComputerRunApproval: (input: unknown) => requestApprovalMock(input),
}));

import { dispatchProjectComputerAgentRun } from "@/lib/projects/acl/messaging/dispatchProjectComputerAgentRun";

const EXPIRES = "2026-10-06T12:15:00.000Z";
const input = {
  projectId: "proj-1",
  actorUserId: "bot-user-1",
  senderMembershipId: "mem-bot",
  senderProjectDisplayName: "Buni",
  membershipId: "mem-mac",
  deviceId: "dev-1",
  deviceOwnerUserId: "user-owner",
  kind: "task.assign",
  summary: "do it",
  refsJson: "{}",
  toProjectDisplayName: null,
} as const;
const run = (status: string, dispatchPolicy: string, at: string | null) =>
  expect.objectContaining({ status, dispatchPolicy, approvalExpiresAt: at });

describe("dispatchProjectComputerAgentRun", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    insertMock.mockResolvedValue({ messageId: "msg-1", wakeResults: [] });
    persistMock.mockResolvedValue({ id: "run-1" });
    deliverMock.mockResolvedValue("delivered");
    gateMock.mockResolvedValue({
      dispatchPolicy: "open",
      approvalExpiresAt: null,
    });
  });

  it("no approval needed: persists running and sends the run to the computer", async () => {
    expect(await dispatchProjectComputerAgentRun(input)).toEqual({
      ok: true,
      messageId: "msg-1",
      agentRunId: "run-1",
      delivery: "delivered",
    });
    expect(gateMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      requesterUserId: "bot-user-1",
      executorUserId: "user-owner",
    });
    expect(persistMock).toHaveBeenCalledWith(run("running", "open", null));
    expect(deliverMock).toHaveBeenCalledWith({
      agentRunId: "run-1",
      prompt: "do it",
      projectId: "proj-1",
      messageId: "msg-1",
      deviceOwnerUserId: "user-owner",
      deviceId: "dev-1",
      writerAgent: "claude-cli",
    });
    expect(requestApprovalMock).not.toHaveBeenCalled();
  });

  it("approval needed: persists pending_approval, asks the owner, sends nothing to the computer", async () => {
    gateMock.mockResolvedValue({
      dispatchPolicy: "approval",
      approvalExpiresAt: EXPIRES,
    });
    expect(await dispatchProjectComputerAgentRun(input)).toMatchObject({
      agentRunId: "run-1",
      delivery: "pending_approval",
    });
    expect(persistMock).toHaveBeenCalledWith(
      run("pending_approval", "approval", EXPIRES),
    );
    expect(requestApprovalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: "run-1",
        requesterLabel: "Buni",
        requestId: "msg-1",
        approvalExpiresAt: EXPIRES,
      }),
    );
    expect(deliverMock).not.toHaveBeenCalled();
  });
});
