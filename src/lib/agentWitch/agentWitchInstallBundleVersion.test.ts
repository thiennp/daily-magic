import { describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { AGENT_WITCH_LOCAL_MIN_TASK_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinTaskBundleVersion.constant";
import { HOSTED_DEVICE_HISTORY_PAGE_MIN_BUNDLE_VERSION } from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxy.constant";

describe("AGENT_WITCH_INSTALL_BUNDLE_VERSION (DF-032)", () => {
  it("is bumped past 268 so self-update delivers the DF-029/030/031 AWL server", () => {
    expect(AGENT_WITCH_INSTALL_BUNDLE_VERSION).toBe("274");
  });

  it("never points a floor at a bundle that is not served", () => {
    const served = Number(AGENT_WITCH_INSTALL_BUNDLE_VERSION);
    for (const floor of [
      AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
      AGENT_WITCH_LOCAL_MIN_TASK_BUNDLE_VERSION,
      HOSTED_DEVICE_HISTORY_PAGE_MIN_BUNDLE_VERSION,
    ]) {
      expect(Number(floor)).toBeLessThanOrEqual(served);
    }
  });
});
