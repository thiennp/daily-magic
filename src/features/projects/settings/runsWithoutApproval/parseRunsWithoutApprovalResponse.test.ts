import { describe, expect, it } from "vitest";

import { parseRunsWithoutApprovalResponse } from "@/features/projects/settings/runsWithoutApproval/parseRunsWithoutApprovalResponse";

describe("parseRunsWithoutApprovalResponse (S0-2)", () => {
  it("reads the flag from a good GET or PUT body", () => {
    expect(
      parseRunsWithoutApprovalResponse(true, {
        ok: true,
        allowRunsWithoutApproval: true,
      }),
    ).toEqual({ ok: true, allowRunsWithoutApproval: true });
    expect(
      parseRunsWithoutApprovalResponse(true, {
        ok: true,
        allowRunsWithoutApproval: false,
        changed: true,
      }),
    ).toEqual({ ok: true, allowRunsWithoutApproval: false });
  });

  it("fails on HTTP errors (401/403/404) and bad bodies", () => {
    expect(
      parseRunsWithoutApprovalResponse(false, { ok: false, error: "forbidden" }),
    ).toEqual({ ok: false });
    expect(parseRunsWithoutApprovalResponse(true, null)).toEqual({ ok: false });
    expect(
      parseRunsWithoutApprovalResponse(true, {
        ok: true,
        allowRunsWithoutApproval: "yes",
      }),
    ).toEqual({ ok: false });
  });
});
