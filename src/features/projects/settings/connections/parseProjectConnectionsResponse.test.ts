import { describe, expect, it } from "vitest";

import { parseProjectConnectionsResponse } from "@/features/projects/settings/connections/parseProjectConnectionsResponse";

describe("parseProjectConnectionsResponse", () => {
  it("treats 404 and 501 as unavailable", () => {
    expect(parseProjectConnectionsResponse(404, false, null)).toEqual({
      ok: false,
      reason: "unavailable",
    });
    expect(parseProjectConnectionsResponse(501, false, null)).toEqual({
      ok: false,
      reason: "unavailable",
    });
  });

  it("parses ok + connections list", () => {
    const result = parseProjectConnectionsResponse(200, true, {
      ok: true,
      connections: [
        {
          provider: "slack",
          status: "connected",
          accountLabel: "Acme",
          connectedAt: "2026-10-01T12:00:00Z",
          connectEnabled: false,
        },
      ],
    });
    expect(result).toEqual({
      ok: true,
      items: [
        {
          provider: "slack",
          status: "connected",
          accountLabel: "Acme",
          connectedAt: "2026-10-01T12:00:00Z",
          connectEnabled: false,
        },
      ],
    });
  });

  it("maps revoked to none and other HTTP failures to error", () => {
    const revoked = parseProjectConnectionsResponse(200, true, {
      ok: true,
      connections: [{ provider: "gmail", status: "revoked" }],
    });
    expect(revoked).toEqual({
      ok: true,
      items: [
        {
          provider: "gmail",
          status: "none",
          accountLabel: null,
          connectedAt: null,
          connectEnabled: false,
        },
      ],
    });
    expect(parseProjectConnectionsResponse(500, false, null)).toEqual({
      ok: false,
      reason: "error",
    });
  });
});
