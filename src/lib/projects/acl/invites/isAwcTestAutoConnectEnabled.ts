import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { isProductionAgentWitchRequestHost } from "@/lib/auth/isTestAuthBypassAllowed";

export type AwcTestAutoConnectEnv = {
  readonly nodeEnv?: string;
  readonly flag?: string | undefined;
  readonly appBaseUrl?: string;
};

const hostOf = (value: string): string | null => {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
};

/**
 * Test-only invite-redeem auto-connect (env AWC_TEST_AUTO_APPROVE_JOINS=1).
 * Off when NODE_ENV=production or resolveAppBaseUrl() is a prod AWC host.
 * E2E: run against `next dev` (NODE_ENV≠production). Do not add
 * AWC_APP_BASE_URL to resolveAppBaseUrl — any future `next start` e2e needs
 * a separate Arch review (loopback-only allowlist or playwright-only inject),
 * never a free-form base URL in prod config.
 */
export const isAwcTestAutoConnectEnabled = (
  env?: AwcTestAutoConnectEnv,
): boolean => {
  const nodeEnv = env?.nodeEnv ?? process.env.NODE_ENV;
  if (nodeEnv === "production") {
    return false;
  }
  const baseUrl = env?.appBaseUrl ?? resolveAppBaseUrl();
  const host = hostOf(baseUrl);
  if (host !== null && isProductionAgentWitchRequestHost(host)) {
    return false;
  }
  const flag = env?.flag ?? process.env.AWC_TEST_AUTO_APPROVE_JOINS;
  return flag === "1";
};
