import { describe, expect, it } from "vitest";

import { parseRespondRunApprovalResponse } from "@/features/projects/settings/runApprovals/parseRespondRunApprovalResponse";

describe("parseRespondRunApprovalResponse", () => {
  it("maps success, 409 ended, 403 forbidden, and other errors", () => {
    expect(
      parseRespondRunApprovalResponse(200, {
        ok: true,
        runId: "run-1",
        state: "approved",
      }),
    ).toEqual({ ok: true, runId: "run-1", state: "approved" });
    expect(parseRespondRunApprovalResponse(409, { ok: false })).toEqual({
      ok: false,
      code: "ended",
    });
    expect(parseRespondRunApprovalResponse(403, null)).toEqual({
      ok: false,
      code: "forbidden",
    });
    expect(parseRespondRunApprovalResponse(500, null)).toEqual({
      ok: false,
      code: "error",
    });
  });
});
