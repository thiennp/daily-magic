import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const fetchLocalAgentWitchWakeJson = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth,
}));

vi.mock("@/lib/agentWitch/fetchLocalAgentWitchWakeJson", () => ({
  fetchLocalAgentWitchWakeJson,
}));

import { GET } from "@/app/api/agent-witch/local-identity/route";

describe("GET /api/agent-witch/local-identity (HOME-051)", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    fetchLocalAgentWitchWakeJson.mockReset();
  });

  it("returns 401 when unauthenticated", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
    });

    const response = await GET(
      new Request(
        "http://localhost:3000/api/agent-witch/local-identity?wakePorts=47892,47893",
      ),
    );

    expect(response.status).toBe(401);
    expect(fetchLocalAgentWitchWakeJson).not.toHaveBeenCalled();
  });

  it("returns 503 when AWB is unreachable on all wake ports", async () => {
    requireAuth.mockResolvedValue({
      actor: { id: "user-1" },
      error: null,
    });
    fetchLocalAgentWitchWakeJson.mockResolvedValue({ reachable: false });

    const response = await GET(
      new Request(
        "http://localhost:3000/api/agent-witch/local-identity?wakePorts=47892,47893",
      ),
    );

    expect(response.status).toBe(503);
    expect(fetchLocalAgentWitchWakeJson).toHaveBeenCalledWith("/identity", {
      wakePort: 47_892,
    });
    expect(fetchLocalAgentWitchWakeJson).toHaveBeenCalledWith("/identity", {
      wakePort: 47_893,
    });
  });

  it("returns identity JSON from the first reachable wake port", async () => {
    requireAuth.mockResolvedValue({
      actor: { id: "user-1" },
      error: null,
    });
    fetchLocalAgentWitchWakeJson
      .mockResolvedValueOnce({ reachable: false })
      .mockResolvedValueOnce({
        reachable: true,
        payload: {
          hostname: "studio.local",
          tokenHash: "abc123",
          tokenHashes: ["abc123"],
          profiles: [],
        },
      });

    const response = await GET(
      new Request(
        "http://localhost:3000/api/agent-witch/local-identity?wakePorts=47892,47893",
      ),
    );
    const payload: unknown = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      hostname: "studio.local",
      tokenHash: "abc123",
    });
  });
});
