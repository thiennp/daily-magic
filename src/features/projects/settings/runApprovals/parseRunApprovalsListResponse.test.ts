import { describe, expect, it } from "vitest";

import { parseRunApprovalsListResponse } from "@/features/projects/settings/runApprovals/parseRunApprovalsListResponse";

const item = {
  runId: "run-1",
  projectId: "proj-1",
  requesterUserId: "u1",
  requesterLabel: "sam@test.local",
  prompt: "Fix lint",
  tool: "claude-cli",
  computerName: "Studio Mac",
  projectFolder: "/p",
  approvalExpiresAt: "2026-10-06T14:15:00.000Z",
  state: "pending",
};

describe("parseRunApprovalsListResponse", () => {
  it("parses a valid owner list", () => {
    expect(parseRunApprovalsListResponse(true, { ok: true, approvals: [item] })).toEqual({
      ok: true,
      approvals: [expect.objectContaining({ runId: "run-1", tool: "claude-cli" })],
    });
  });

  it("rejects bad envelopes", () => {
    expect(parseRunApprovalsListResponse(false, { ok: true, approvals: [] })).toEqual({
      ok: false,
    });
    expect(parseRunApprovalsListResponse(true, { ok: true, approvals: [{ runId: "" }] })).toEqual({
      ok: false,
    });
  });
});
