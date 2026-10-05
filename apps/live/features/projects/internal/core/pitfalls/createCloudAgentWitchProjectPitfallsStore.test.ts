import { describe, expect, it, vi } from "vitest";

import type {
  AgentWitchProjectPitfall,
  AgentWitchProjectPitfallUpsert,
} from "./agentWitchProjectPitfall.type";
import createCloudAgentWitchProjectPitfallsStore, {
  buildAgentWitchProjectPitfallsUrl,
} from "./createCloudAgentWitchProjectPitfallsStore";
import { buildPitfallFixture } from "./projectPitfallFixtures.testUtil";

const config = {
  appOrigin: "https://cloud.example.test/",
  pairingToken: "test-pairing-token",
} as Parameters<typeof createCloudAgentWitchProjectPitfallsStore>[0];

const toUpsertBody = (
  pitfall: AgentWitchProjectPitfall,
): AgentWitchProjectPitfallUpsert => {
  const {
    projectId,
    overridesSeed,
    hitCount,
    lastSeenAt,
    updatedAt,
    ...upsert
  } = pitfall;
  void projectId;
  void overridesSeed;
  void hitCount;
  void lastSeenAt;
  void updatedAt;
  return { ...upsert, source: "project" };
};

const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

describe("createCloudAgentWitchProjectPitfallsStore", () => {
  it("builds contract URLs", () => {
    expect(buildAgentWitchProjectPitfallsUrl("https://x.test/", "p 1")).toBe(
      "https://x.test/api/agent-witch/projects/p%201/pitfalls",
    );
    expect(
      buildAgentWitchProjectPitfallsUrl("https://x.test", "p", "seed/a"),
    ).toBe("https://x.test/api/agent-witch/projects/p/pitfalls/seed%2Fa");
  });

  it("lists with includeRetired, pairing header, and syncedAt", async () => {
    const fetchImpl = vi.fn(async () =>
      jsonResponse(200, {
        ok: true,
        pitfalls: [buildPitfallFixture()],
        syncedAt: "2026-10-05T12:00:00.000Z",
      }),
    );
    const store = createCloudAgentWitchProjectPitfallsStore(
      config,
      fetchImpl as typeof fetch,
    );
    const result = await store.listPitfalls("proj-1", { includeRetired: true });
    expect(result).toEqual({
      ok: true,
      items: [buildPitfallFixture()],
      syncedAt: "2026-10-05T12:00:00.000Z",
    });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe(
      "https://cloud.example.test/api/agent-witch/projects/proj-1/pitfalls?includeRetired=1",
    );
    expect(
      (init.headers as Record<string, string>)["x-agent-witch-token"],
    ).toBe("test-pairing-token");
  });

  it("treats 404 / bad shape / network errors as unavailable", async () => {
    for (const impl of [
      async () => jsonResponse(404, { ok: false }),
      async () => jsonResponse(200, { ok: true }),
      async () => {
        throw new Error("offline");
      },
    ]) {
      const store = createCloudAgentWitchProjectPitfallsStore(
        config,
        vi.fn(impl) as typeof fetch,
      );
      expect(
        await store.listPitfalls("proj-1", { includeRetired: false }),
      ).toEqual({
        ok: false,
        reason: "unavailable",
      });
    }
  });

  it("PUTs the upsert body to the collection route", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(200, { ok: true }));
    const store = createCloudAgentWitchProjectPitfallsStore(
      config,
      fetchImpl as typeof fetch,
    );
    const upsert = toUpsertBody(buildPitfallFixture({ source: "project" }));
    expect(await store.upsertPitfall("proj-1", upsert)).toEqual({ ok: true });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe(
      "https://cloud.example.test/api/agent-witch/projects/proj-1/pitfalls",
    );
    expect(init.method).toBe("PUT");
    expect(JSON.parse(String(init.body))).toMatchObject({
      id: "seed-stale-lockfile",
      source: "project",
    });
    expect(JSON.parse(String(init.body))).not.toHaveProperty("hitCount");
  });

  it("maps 409 limit_exceeded to active_limit and other 400s to rejected", async () => {
    const upsert = toUpsertBody(buildPitfallFixture());
    const capped = createCloudAgentWitchProjectPitfallsStore(
      config,
      vi.fn(async () =>
        jsonResponse(409, { ok: false, errorMessage: "limit_exceeded" }),
      ) as typeof fetch,
    );
    expect(await capped.upsertPitfall("proj-1", upsert)).toEqual({
      ok: false,
      reason: "active_limit",
    });
    const rejected = createCloudAgentWitchProjectPitfallsStore(
      config,
      vi.fn(async () =>
        jsonResponse(400, { ok: false, errorMessage: "invalid_arguments" }),
      ) as typeof fetch,
    );
    expect(await rejected.upsertPitfall("proj-1", upsert)).toEqual({
      ok: false,
      reason: "rejected",
    });
  });
});
