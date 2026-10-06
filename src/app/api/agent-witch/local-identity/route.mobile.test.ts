import { beforeEach, describe, expect, it, vi } from "vitest";

import { MOBILE_UA_FIXTURES as UA } from "@/lib/mobile/mobileUserAgentFixtures.constant";

const requireAuth = vi.hoisted(() => vi.fn());
const fetchLocalAgentWitchWakeJson = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));

vi.mock("@/lib/agentWitch/fetchLocalAgentWitchWakeJson", () => ({
  fetchLocalAgentWitchWakeJson,
}));

import { GET } from "@/app/api/agent-witch/local-identity/route";

describe("GET /api/agent-witch/local-identity mobile gate", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    fetchLocalAgentWitchWakeJson.mockReset();
  });

  it("never fetches AgentWitch Local for a mobile request", async () => {
    requireAuth.mockResolvedValue({
      actor: { id: "user-1" },
      error: null,
    });

    const response = await GET(
      new Request(
        "http://localhost:3000/api/agent-witch/local-identity?wakePorts=47892,47893",
        { headers: { "user-agent": UA.iphoneSafari } },
      ),
    );

    expect(response.status).toBe(503);
    expect(fetchLocalAgentWitchWakeJson).not.toHaveBeenCalled();
  });

  it("still fetches AgentWitch Local for a desktop request", async () => {
    requireAuth.mockResolvedValue({
      actor: { id: "user-1" },
      error: null,
    });
    fetchLocalAgentWitchWakeJson.mockResolvedValue({ reachable: false });

    await GET(
      new Request(
        "http://localhost:3000/api/agent-witch/local-identity?wakePort=47892",
        { headers: { "user-agent": UA.macSafari, "sec-ch-ua-mobile": "?0" } },
      ),
    );

    expect(fetchLocalAgentWitchWakeJson).toHaveBeenCalledWith("/identity", {
      wakePort: 47_892,
    });
  });
});
