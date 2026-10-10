import { describe, expect, it } from "vitest";

import { buildAgentWitchReadinessPayload } from "./buildAgentWitchReadinessPayload";

describe("buildAgentWitchReadinessPayload", () => {
  it("is ready when Next is prepared and the database answers", async () => {
    await expect(
      buildAgentWitchReadinessPayload({
        nextReady: true,
        checkDatabase: async () => [{ ok: 1 }],
      }),
    ).resolves.toEqual({ ok: true, nextReady: true, database: "ok" });
  });

  it("is not ready while Next is still preparing", async () => {
    const payload = await buildAgentWitchReadinessPayload({
      nextReady: false,
      checkDatabase: async () => [],
    });
    expect(payload).toMatchObject({ ok: false, nextReady: false });
  });

  it("reports an unreachable database", async () => {
    const payload = await buildAgentWitchReadinessPayload({
      nextReady: true,
      checkDatabase: async () => {
        throw new Error("ECONNREFUSED");
      },
    });
    expect(payload).toEqual({
      ok: false,
      nextReady: true,
      database: "unreachable",
    });
  });

  it("reports a database that never answers", async () => {
    const payload = await buildAgentWitchReadinessPayload({
      nextReady: true,
      checkDatabase: () => new Promise(() => undefined),
      timeoutMs: 10,
    });
    expect(payload).toMatchObject({ ok: false, database: "timeout" });
  });
});
