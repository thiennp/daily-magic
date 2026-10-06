import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: () => false,
}));
vi.mock("@/lib/dispatch/mapAgentRunRow", () => ({
  default: (row: { id: string; status: string }) => ({
    id: row.id,
    status: row.status,
    executorUserId: "owner-1",
  }),
}));

import { claimPendingDispatchApprovalDecision } from "@/lib/dispatch/claimPendingDispatchApprovalDecision";
import { clearAgentRunSessionsForTests } from "@/lib/dispatch/agentRunSessionRegistry";

/** One shared row, like Postgres: only the first UPDATE out of pending wins. */
const row = { id: "run-1", status: "pending_approval", expired: false };

const fakeSql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
  const q = strings.join("?");
  if (q.includes("UPDATE agent_runs")) {
    expect(q).toMatch(/AND status = \?/);
    expect(q).toMatch(/approval_expires_at IS NULL OR approval_expires_at > NOW\(\)/);
    const nextStatus = values[0] as string;
    const pendingValue = values[values.length - 1];
    if (row.status !== pendingValue || row.expired) return [];
    row.status = nextStatus;
    return [{ id: row.id, status: row.status }];
  }
  if (q.includes("SELECT 1 FROM agent_runs")) return [{ "?column?": 1 }];
  throw new Error(`unexpected sql ${q}`);
};

describe("claimPendingDispatchApprovalDecision (S0-3 compare-and-set)", () => {
  beforeEach(() => {
    clearAgentRunSessionsForTests();
    sqlMock.mockReset();
    sqlMock.mockImplementation(fakeSql);
    row.status = "pending_approval";
    row.expired = false;
  });

  it("two servers approving the same run: exactly one wins", async () => {
    const [a, b] = await Promise.all([
      claimPendingDispatchApprovalDecision({ runId: "run-1", executorUserId: "owner-1", decision: "approve" }),
      claimPendingDispatchApprovalDecision({ runId: "run-1", executorUserId: "owner-1", decision: "approve" }),
    ]);
    expect([a, b].filter(Boolean)).toHaveLength(1);
    expect(row.status).toBe("running");
  });

  it("approve after deny (or deny after approve) loses", async () => {
    expect(
      await claimPendingDispatchApprovalDecision({ runId: "run-1", executorUserId: "owner-1", decision: "deny", denialReason: "no" }),
    ).toBe(true);
    expect(row.status).toBe("denied");
    expect(
      await claimPendingDispatchApprovalDecision({ runId: "run-1", executorUserId: "owner-1", decision: "approve" }),
    ).toBe(false);
  });

  it("an expired approval cannot be claimed", async () => {
    row.expired = true;
    expect(
      await claimPendingDispatchApprovalDecision({ runId: "run-1", executorUserId: "owner-1", decision: "approve" }),
    ).toBe(false);
    expect(row.status).toBe("pending_approval");
  });
});
