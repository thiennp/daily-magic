import { describe, expect, it } from "vitest";

import { resolveWakeIdentityPortsToProbe } from "@/features/agent-witch/utils/resolveWakeIdentityPortsToProbe";

describe("resolveWakeIdentityPortsToProbe", () => {
  it("returns ports that were not attempted yet", () => {
    const attempted = new Set([47_892]);

    expect(
      resolveWakeIdentityPortsToProbe({
        allPorts: [47_892, 47_893],
        attemptedPorts: attempted,
        probeSuppressed: false,
      }),
    ).toEqual([47_893]);
  });

  it("returns nothing when all ports were attempted and probe is suppressed", () => {
    const attempted = new Set([47_892]);

    expect(
      resolveWakeIdentityPortsToProbe({
        allPorts: [47_892],
        attemptedPorts: attempted,
        probeSuppressed: true,
      }),
    ).toEqual([]);
  });

  it("still probes newly discovered ports while suppressed", () => {
    const attempted = new Set([47_892]);

    expect(
      resolveWakeIdentityPortsToProbe({
        allPorts: [47_892, 51_234],
        attemptedPorts: attempted,
        probeSuppressed: true,
      }),
    ).toEqual([51_234]);
  });
});
