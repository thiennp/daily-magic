import {
  isHostedDeviceHubProxyEnabled,
  isHostedDeviceHubProxySameHost,
} from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxyFlag";

/**
 * True when Load older should use today's in-process History read
 * (self-hosted / dev same machine, or flag off). Explicit — never accidental.
 */
export const shouldPreferInProcessLocalHistory = (input?: {
  readonly env?: NodeJS.ProcessEnv | Record<string, string | undefined>;
  readonly hasProjectDevice?: boolean;
}): boolean => {
  const env = input?.env ?? process.env;
  if (!isHostedDeviceHubProxyEnabled(env)) {
    return true;
  }
  if (isHostedDeviceHubProxySameHost(env)) {
    return true;
  }
  if (input?.hasProjectDevice === false) {
    return true;
  }
  return false;
};
