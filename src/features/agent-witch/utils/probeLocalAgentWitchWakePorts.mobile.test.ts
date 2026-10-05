import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchViaAppServer = vi.hoisted(() => vi.fn());
const shouldUseAppServer = vi.hoisted(() => vi.fn());
const fetchAtPort = vi.hoisted(() => vi.fn());
const detectMobileClient = vi.hoisted(() => vi.fn());

vi.mock(
  "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityViaAppServer",
  () => ({
    fetchLocalAgentWitchIdentityViaAppServer: fetchViaAppServer,
    shouldUseAppServerWakeIdentityProbe: shouldUseAppServer,
  }),
);

vi.mock(
  "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityAtWakePort",
  () => ({ fetchLocalAgentWitchIdentityAtWakePort: fetchAtPort }),
);

vi.mock("@/lib/mobile/detectMobileClient", () => ({
  default: detectMobileClient,
}));

import { probeLocalAgentWitchWakePorts } from "@/features/agent-witch/utils/probeLocalAgentWitchWakePorts";

describe("probeLocalAgentWitchWakePorts mobile gate", () => {
  beforeEach(() => {
    fetchViaAppServer.mockReset();
    shouldUseAppServer.mockReset();
    fetchAtPort.mockReset();
    fetchAtPort.mockResolvedValue(null);
    fetchViaAppServer.mockResolvedValue(null);
    detectMobileClient.mockReset();
  });

  it.each([true, false])(
    "never probes Agent Witch Local on mobile (app-server path: %s)",
    async (useAppServer) => {
      detectMobileClient.mockReturnValue(true);
      shouldUseAppServer.mockReturnValue(useAppServer);
      const attempted: number[] = [];

      const identity = await probeLocalAgentWitchWakePorts({
        portsToProbe: [47_892, 47_893],
        onPortAttempted: (port) => attempted.push(port),
      });

      expect(identity).toBeNull();
      expect(fetchAtPort).not.toHaveBeenCalled();
      expect(fetchViaAppServer).not.toHaveBeenCalled();
      expect(attempted).toEqual([]);
    },
  );

  it("probes each wake port on desktop", async () => {
    detectMobileClient.mockReturnValue(false);
    shouldUseAppServer.mockReturnValue(false);

    await probeLocalAgentWitchWakePorts({
      portsToProbe: [47_892, 47_893],
      onPortAttempted: () => undefined,
    });

    expect(fetchAtPort).toHaveBeenCalledWith(47_892);
    expect(fetchAtPort).toHaveBeenCalledWith(47_893);
  });

  it("uses the app-server batch probe on loopback desktop", async () => {
    detectMobileClient.mockReturnValue(false);
    shouldUseAppServer.mockReturnValue(true);

    await probeLocalAgentWitchWakePorts({
      portsToProbe: [47_892],
      onPortAttempted: () => undefined,
    });

    expect(fetchViaAppServer).toHaveBeenCalledWith([47_892]);
  });
});
