import { describe, expect, it, vi } from "vitest";

import { fetchProjectRuleUsageFromCloud } from "./fetchProjectRuleUsageFromCloud";

describe("fetchProjectRuleUsageFromCloud", () => {
  it("maps 403 to forbidden and parses 200", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 403 }))
      .mockResolvedValueOnce(
        Response.json({
          ok: true,
          projectId: "p1",
          windowDays: null,
          rules: [],
          overlaps: [],
        }),
      );
    await expect(
      fetchProjectRuleUsageFromCloud({
        appOrigin: "https://example.test",
        pairingToken: "tok",
        projectId: "p1",
        pairingHeaderName: "x-agent-witch-token",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toEqual({ ok: false, reason: "forbidden" });
    await expect(
      fetchProjectRuleUsageFromCloud({
        appOrigin: "https://example.test",
        pairingToken: "tok",
        projectId: "p1",
        pairingHeaderName: "x-agent-witch-token",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toMatchObject({ ok: true, data: { projectId: "p1" } });
  });

  it("returns not_connected without a token", async () => {
    await expect(
      fetchProjectRuleUsageFromCloud({
        appOrigin: "https://example.test",
        pairingToken: "  ",
        projectId: "p1",
        pairingHeaderName: "x-agent-witch-token",
      }),
    ).resolves.toEqual({ ok: false, reason: "not_connected" });
  });
});
