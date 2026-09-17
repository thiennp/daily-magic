/**
 * AWL local HTTP server contract — origins and port from shared deployable meta.
 */

export {
  AGENT_WITCH_LIVE_APP_HOST,
  AGENT_WITCH_LIVE_APP_LOOPBACK_ORIGIN,
  AGENT_WITCH_LIVE_APP_ORIGIN,
  AGENT_WITCH_LIVE_APP_PORT,
} from "@agent-witch/shared/network";

/** Loopback bind address (AGENT-021 — never expose beyond this Mac). */
export const AWL_HTTP_BIND_HOST = "127.0.0.1";
