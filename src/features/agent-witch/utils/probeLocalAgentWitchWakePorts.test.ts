import { beforeEach, describe, expect, it, vi } from "vitest";

import { probeLocalAgentWitchWakePorts } from "@/features/agent-witch/utils/probeLocalAgentWitchWakePorts";

const fetchViaAppServer = vi.hoisted(() => vi.fn());
const shouldUseAppServer = vi.hoisted(() => vi.fn());
const fetchAtPort = vi.hoisted(() => vi.fn());

vi.mock(
  "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityViaAppServer",
  () => ({
    fetchLocalAgentWitchIdentityViaAppServer: fetchViaAppServer,
    shouldUseAppServerWakeIdentityProbe: shouldUseAppServer,
  }),
);

vi.mock(
  "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityAtWakePort",
  () => ({
    fetchLocalAgentWitchIdentityAtWakePort: fetchAtPort,
  }),
);

describe("probeLocalAgentWitchWakePorts (HOME-051)", () => {
  beforeEach(() => {
    fetchViaAppServer.mockReset();
    shouldUseAppServer.mockReset();
    fetchAtPort.mockReset();
  });

  it("uses one app-server batch request on loopback AWC", async () => {
    shouldUseAppServer.mockReturnValue(true);
    fetchViaAppServer.mockResolvedValue({
      hostname: "studio.local",
      tokenHash: "abc",
      tokenHashes: ["abc"],
      profiles: [],
    });

    const attempted: number[] = [];
    const identity = await probeLocalAgentWitchWakePorts({
      portsToProbe: [47_893, 47_892],
      onPortAttempted: (wakePort) => {
        attempted.push(wakePort);
      },
    });

    expect(identity?.hostname).toBe("studio.local");
    expect(fetchViaAppServer).toHaveBeenCalledWith([47_893, 47_892]);
    expect(fetchAtPort).not.toHaveBeenCalled();
    expect(attempted).toEqual([47_893, 47_892]);
  });
});
