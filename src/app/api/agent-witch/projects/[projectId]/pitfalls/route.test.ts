import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  GET,
  POST,
} from "@/app/api/agent-witch/projects/[projectId]/pitfalls/route";
import { pitfallViewFixture } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";

const listProjectPitfalls = vi.hoisted(() => vi.fn());
const upsertProjectPitfall = vi.hoisted(() => vi.fn());
const resolveActor = vi.hoisted(() => vi.fn());

vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/orchestrators/listProjectPitfalls",
  () => ({ listProjectPitfalls }),
);
vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/orchestrators/upsertProjectPitfall",
  () => ({ upsertProjectPitfall }),
);
vi.mock("@/lib/agentWitch/resolveAgentWitchRequestActorUserId", () => ({
  resolveAgentWitchRequestActorUserId: resolveActor,
}));

const ctx = { params: Promise.resolve({ projectId: "p1" }) };
const url = "http://test/api/agent-witch/projects/p1/pitfalls";

describe("/api/agent-witch/projects/[projectId]/pitfalls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resolveActor.mockResolvedValue("u1");
    listProjectPitfalls.mockResolvedValue({
      ok: true,
      pitfalls: [
        pitfallViewFixture({
          id: "arch-max-lines",
          avoidance: "Run the check",
        }),
      ],
    });
  });

  it("passes through 401 from auth", async () => {
    resolveActor.mockResolvedValue(
      Response.json({ ok: false }, { status: 401 }),
    );
    expect((await GET(new Request(url), ctx)).status).toBe(401);
    expect(listProjectPitfalls).not.toHaveBeenCalled();
  });

  it("lists with includeRetired and supports format=bot", async () => {
    const response = await GET(
      new Request(`${url}?includeRetired=true&format=bot`),
      ctx,
    );
    expect(listProjectPitfalls).toHaveBeenCalledWith({
      actorUserId: "u1",
      projectId: "p1",
      includeRetired: true,
    });
    expect(await response.json()).toEqual({
      ok: true,
      projectId: "p1",
      format: "bot",
      count: 1,
      text: "arch-max-lines|Run the check",
    });
  });

  it("maps forbidden to 403 and limit_exceeded to 409", async () => {
    listProjectPitfalls.mockResolvedValue({ ok: false, code: "forbidden" });
    expect((await GET(new Request(url), ctx)).status).toBe(403);
    upsertProjectPitfall.mockResolvedValue({
      ok: false,
      code: "limit_exceeded",
    });
    const response = await POST(
      new Request(url, { method: "POST", body: JSON.stringify({ id: "x" }) }),
      ctx,
    );
    expect(response.status).toBe(409);
    expect(upsertProjectPitfall).toHaveBeenCalledWith({
      actorUserId: "u1",
      projectId: "p1",
      body: { id: "x" },
    });
  });
});
