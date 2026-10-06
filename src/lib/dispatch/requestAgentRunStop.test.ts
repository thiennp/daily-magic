import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlCalls: string[] = [];
const sqlRows = vi.hoisted(() => ({ value: [] as Record<string, unknown>[] }));

vi.mock("@/lib/db", () => ({
  getSql: () => async (strings: TemplateStringsArray) => {
    sqlCalls.push(strings.join("?"));
    return sqlRows.value;
  },
  asRowArray: (rows: unknown) => rows,
}));
vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: () => false,
}));

import { requestAgentRunStop } from "@/lib/dispatch/requestAgentRunStop";

const row = (status: string, endedBeforeStart: boolean) => ({
  id: "run-1",
  requester_user_id: "u1",
  executor_user_id: "u1",
  prompt: "p",
  status,
  dispatch_policy: "approval",
  created_at: "t",
  updated_at: "t",
  stop_requested_at: "2026-10-06T12:00:00.000Z",
  ended_before_start: endedBeforeStart,
});

describe("requestAgentRunStop (S0-7 CAS)", () => {
  beforeEach(() => {
    sqlCalls.length = 0;
  });

  it("only updates active runs and keeps the first stop timestamp", async () => {
    sqlRows.value = [row("running", false)];
    const result = await requestAgentRunStop({
      runId: "run-1",
      requestedByUserId: "u1",
    });
    const sql = sqlCalls.join("\n");
    expect(sql).toMatch(/WHERE id = \?\s+AND status IN \(/);
    expect(sql).toContain(
      "stop_requested_at = COALESCE(stop_requested_at, NOW())",
    );
    expect(result).toMatchObject({
      ok: true,
      endedBeforeStart: false,
      run: { stopRequestedAt: "2026-10-06T12:00:00.000Z", status: "running" },
    });
  });

  it("ends a pending-approval run as denied in the same statement", async () => {
    sqlRows.value = [row("denied", true)];
    const result = await requestAgentRunStop({
      runId: "run-1",
      requestedByUserId: "u1",
    });
    expect(result).toMatchObject({ ok: true, endedBeforeStart: true });
  });

  it("returns ok:false when the run already finished (CAS lost)", async () => {
    sqlRows.value = [];
    expect(
      await requestAgentRunStop({ runId: "run-1", requestedByUserId: "u1" }),
    ).toEqual({ ok: false });
  });
});
