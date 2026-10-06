import { describe, expect, it, vi } from "vitest";

import { postProjectRuleActiveChangeFromCloud } from "./postProjectRuleActiveChangeFromCloud";

describe("postProjectRuleActiveChangeFromCloud", () => {
  it("maps limit_exceeded 409 and parses drop 200", async () => {
    const rule = {
      ruleId: "r1",
      title: "T",
      source: "retired",
      active: false,
      hitCount: 0,
      lastHitAt: null,
    };
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({ ok: false, errorMessage: "limit_exceeded" }, { status: 409 }),
      )
      .mockResolvedValueOnce(
        Response.json({ ok: true, projectId: "p1", rule, changed: true }),
      );
    await expect(
      postProjectRuleActiveChangeFromCloud({
        appOrigin: "https://example.test",
        pairingToken: "tok",
        projectId: "p1",
        ruleId: "r1",
        action: "restore",
        pairingHeaderName: "x-agent-witch-token",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toEqual({ ok: false, reason: "limit_exceeded" });
    await expect(
      postProjectRuleActiveChangeFromCloud({
        appOrigin: "https://example.test",
        pairingToken: "tok",
        projectId: "p1",
        ruleId: "r1",
        action: "drop",
        pairingHeaderName: "x-agent-witch-token",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toMatchObject({ ok: true, data: { changed: true } });
  });
});
