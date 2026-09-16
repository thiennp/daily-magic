import { describe, expect, it, vi } from "vitest";

import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { retargetWriterRunToSoleLiveMac } from "@/lib/dispatch/retargetWriterRunToSoleLiveMac";

vi.mock("@/lib/agentWitch/resolveLiveAgentClientsByDeviceIdForUser", () => ({
  resolveLiveAgentClientsByDeviceIdForUser: vi.fn(),
}));

import { resolveLiveAgentClientsByDeviceIdForUser } from "@/lib/agentWitch/resolveLiveAgentClientsByDeviceIdForUser";

const runtime = {} as AgentWitchHubRuntime;

const buildClient = (input: {
  readonly id: string;
  readonly deviceId: string;
}): AgentWitchHubClient =>
  ({
    id: input.id,
    deviceId: input.deviceId,
  }) as AgentWitchHubClient;

describe("retargetWriterRunToSoleLiveMac", () => {
  it("retargets when the requested device id is not live but one Mac is connected", async () => {
    const liveClient = buildClient({ id: "agent-1", deviceId: "device-live" });
    const liveByDeviceId = new Map<string, AgentWitchHubClient>([
      ["device-live", liveClient],
    ]);

    vi.mocked(resolveLiveAgentClientsByDeviceIdForUser).mockResolvedValue(
      liveByDeviceId,
    );

    const result = await retargetWriterRunToSoleLiveMac({
      runtime,
      executorUserId: "user-1",
      targetDeviceId: "device-stale-ui-selection",
    });

    expect(result).toEqual({
      agentClient: liveClient,
      deviceId: "device-live",
    });
  });

  it("does not retarget when the requested device id is already live", async () => {
    const liveClient = buildClient({ id: "agent-1", deviceId: "device-live" });
    const liveByDeviceId = new Map<string, AgentWitchHubClient>([
      ["device-live", liveClient],
    ]);

    vi.mocked(resolveLiveAgentClientsByDeviceIdForUser).mockResolvedValue(
      liveByDeviceId,
    );

    const result = await retargetWriterRunToSoleLiveMac({
      runtime,
      executorUserId: "user-1",
      targetDeviceId: "device-live",
    });

    expect(result).toBeUndefined();
  });
});
