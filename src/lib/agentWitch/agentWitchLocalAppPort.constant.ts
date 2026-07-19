/** Internal + advertised local UI listen port (user LaunchAgent; no root). */
export const AGENT_WITCH_LOCAL_APP_PORT = 43347;

/** Loopback hostname (public DNS A/AAAA → 127.0.0.1 / ::1). */
export const AGENT_WITCH_LOCAL_APP_HOST = "local.agentwitch.com";

/**
 * User-facing Mac-only origin. Port is required (no privileged :80 proxy).
 * Process binds 127.0.0.1 only (AGENT-021).
 */
export const AGENT_WITCH_LOCAL_APP_ORIGIN = `http://${AGENT_WITCH_LOCAL_APP_HOST}:${AGENT_WITCH_LOCAL_APP_PORT}`;
