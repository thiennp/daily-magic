import { describe, expect, it } from "vitest";

import { readInstallBundleVersionFromHeartbeatAck } from "./readInstallBundleVersionFromHeartbeatAck";

describe("readInstallBundleVersionFromHeartbeatAck", () => {
  it("reads installBundleVersion from system.ack payload (AGENT-030)", () => {
    expect(
      readInstallBundleVersionFromHeartbeatAck({
        installBundleVersion: "32",
      }),
    ).toBe("32");
  });

  it("returns null when missing or blank (AGENT-030)", () => {
    expect(readInstallBundleVersionFromHeartbeatAck(null)).toBeNull();
    expect(
      readInstallBundleVersionFromHeartbeatAck({ installBundleVersion: "  " }),
    ).toBeNull();
  });
});
