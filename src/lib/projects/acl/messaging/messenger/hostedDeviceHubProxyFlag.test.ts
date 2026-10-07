import { afterEach, describe, expect, it } from "vitest";

import {
  AWC_HOSTED_DEVICE_HUB_PROXY_ENV,
  AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV,
  isHostedDeviceHubProxyEnabled,
  isHostedDeviceHubProxySameHost,
} from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxyFlag";
import { shouldPreferInProcessLocalHistory } from "@/lib/projects/acl/messaging/messenger/shouldPreferInProcessLocalHistory";
import { HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS } from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxy.constant";

describe("hostedDeviceHubProxyFlag", () => {
  afterEach(() => {
    delete process.env[AWC_HOSTED_DEVICE_HUB_PROXY_ENV];
    delete process.env[AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV];
  });

  it("flag off by default → prefer in-process", () => {
    expect(isHostedDeviceHubProxyEnabled({})).toBe(false);
    expect(shouldPreferInProcessLocalHistory({ env: {} })).toBe(true);
  });

  it("flag on → hub proxy path (unless same-host)", () => {
    const env = { [AWC_HOSTED_DEVICE_HUB_PROXY_ENV]: "1" };
    expect(isHostedDeviceHubProxyEnabled(env)).toBe(true);
    expect(shouldPreferInProcessLocalHistory({ env, hasProjectDevice: true })).toBe(
      false,
    );
  });

  it("same-host flag forces in-process even when proxy flag on", () => {
    const env = {
      [AWC_HOSTED_DEVICE_HUB_PROXY_ENV]: "1",
      [AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV]: "true",
    };
    expect(isHostedDeviceHubProxySameHost(env)).toBe(true);
    expect(shouldPreferInProcessLocalHistory({ env, hasProjectDevice: true })).toBe(
      true,
    );
  });

  it("no project device → in-process even when flag on", () => {
    const env = { [AWC_HOSTED_DEVICE_HUB_PROXY_ENV]: "on" };
    expect(
      shouldPreferInProcessLocalHistory({ env, hasProjectDevice: false }),
    ).toBe(true);
  });

  it("documents timeout of 3 seconds", () => {
    expect(HOSTED_DEVICE_HISTORY_PAGE_TIMEOUT_MS).toBe(3_000);
  });
});
