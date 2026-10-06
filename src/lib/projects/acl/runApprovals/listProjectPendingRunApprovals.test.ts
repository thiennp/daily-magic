import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const expireMock = vi.fn();
const fieldsMock = vi.fn();
const getUser = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/dispatch/expireStaleDispatchApprovals", () => ({
  expireStaleDispatchApprovals: () => expireMock(),
}));
vi.mock("@/lib/dispatch/mapAgentRunRow", () => ({
  default: (row: Record<string, unknown>) => ({
    id: String(row.id),
    projectId: String(row.project_id),
    requesterUserId: String(row.requester_user_id),
    prompt: String(row.prompt),
    writerAgent: String(row.writer_agent),
    deviceId: row.device_id ? String(row.device_id) : null,
    approvalExpiresAt: row.approval_expires_at
      ? String(row.approval_expires_at)
      : null,
  }),
}));
vi.mock(
  "@/lib/projects/acl/runApprovals/resolveComputerRunApprovalCardFields",
  () => ({
    resolveComputerRunApprovalCardFields: (i: unknown) => fieldsMock(i),
  }),
);
vi.mock("@/lib/auth/userRepository", () => ({
  getUserById: (id: string) => getUser(id),
}));

import { listProjectPendingRunApprovals } from "@/lib/projects/acl/runApprovals/listProjectPendingRunApprovals";

describe("listProjectPendingRunApprovals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    expireMock.mockResolvedValue(0);
    fieldsMock.mockResolvedValue({
      tool: "claude-cli",
      computerName: "Studio Mac",
      projectFolder: "/p",
    });
    getUser.mockResolvedValue({ email: "bot@x.test" });
    sqlMock.mockResolvedValue([
      {
        id: "run-1",
        project_id: "proj-1",
        requester_user_id: "bot-1",
        prompt: "ship it",
        writer_agent: "claude-cli",
        device_id: "dev-1",
        approval_expires_at: "2099-01-01T00:00:00.000Z",
      },
    ]);
  });

  it("expires stale first, then returns enriched pending payloads", async () => {
    const list = await listProjectPendingRunApprovals({ projectId: "proj-1" });
    expect(expireMock).toHaveBeenCalledOnce();
    expect(list).toEqual([
      {
        runId: "run-1",
        projectId: "proj-1",
        requesterUserId: "bot-1",
        requesterLabel: "bot@x.test",
        prompt: "ship it",
        tool: "claude-cli",
        computerName: "Studio Mac",
        projectFolder: "/p",
        approvalExpiresAt: "2099-01-01T00:00:00.000Z",
        state: "pending",
      },
    ]);
  });
});
