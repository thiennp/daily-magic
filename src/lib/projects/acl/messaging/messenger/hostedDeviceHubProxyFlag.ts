/**
 * Feature flag: hosted AWC asks the live project computer for History
 * Load-older pages over the hub instead of reading Railway disk in-process.
 *
 * Env: AWC_HOSTED_DEVICE_HUB_PROXY=1|true|on enables.
 * Off = today's in-process History read (self-hosted / legacy).
 */

export const AWC_HOSTED_DEVICE_HUB_PROXY_ENV = "AWC_HOSTED_DEVICE_HUB_PROXY";

/** Explicit same-host: AWC + AWL share one machine; keep in-process path. */
export const AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV =
  "AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST";

export const isHostedDeviceHubProxyEnabled = (
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): boolean => {
  const raw = env[AWC_HOSTED_DEVICE_HUB_PROXY_ENV];
  return raw === "1" || raw === "true" || raw === "on";
};

export const isHostedDeviceHubProxySameHost = (
  env: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env,
): boolean => {
  const raw = env[AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV];
  return raw === "1" || raw === "true" || raw === "on";
};
