/**
 * Legacy fixed AWL port (pre-H6). Discovery fallback only — never use it in
 * copy or links (DF-033); see agentWitchLocalAppDiscovery.constant.ts.
 */
export const AGENT_WITCH_LIVE_APP_PORT = 43347;

/** Loopback bind/advertise host (IPv4 only). */
export const AGENT_WITCH_LIVE_APP_HOST = "127.0.0.1";

/** User-facing Mac-only origin (always include the port). */
export const AGENT_WITCH_LIVE_APP_ORIGIN = `http://${AGENT_WITCH_LIVE_APP_HOST}:${AGENT_WITCH_LIVE_APP_PORT}`;

/** Alias of `AGENT_WITCH_LIVE_APP_ORIGIN` for older imports. */
export const AGENT_WITCH_LIVE_APP_LOOPBACK_ORIGIN = AGENT_WITCH_LIVE_APP_ORIGIN;
