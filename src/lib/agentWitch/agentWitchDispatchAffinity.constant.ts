/** Load balancers that honor cookie-based affinity can route dispatch to the hub process holding the Mac socket. */
export const AGENT_WITCH_DISPATCH_AFFINITY_COOKIE = "aw_hub_instance";

const readSecureCookieSuffix = (): string =>
  process.env.NODE_ENV === "production" ? "; Secure" : "";

export const buildAgentWitchDispatchAffinitySetCookie = (
  instanceId: string,
): string =>
  `${AGENT_WITCH_DISPATCH_AFFINITY_COOKIE}=${encodeURIComponent(instanceId)}; Path=/; HttpOnly; SameSite=Lax${readSecureCookieSuffix()}`;
