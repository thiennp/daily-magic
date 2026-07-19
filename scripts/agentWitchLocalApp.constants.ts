/** Local UI listen port (user LaunchAgent; no root required). */
export const AGENT_WITCH_LOCAL_APP_PORT = 43347;

/** Loopback hostname (public DNS A/AAAA → 127.0.0.1 / ::1). */
export const AGENT_WITCH_LOCAL_APP_HOST = "local.agentwitch.com";

/** User-facing Mac-only origin (port required; no privileged :80 proxy). */
export const AGENT_WITCH_LOCAL_APP_ORIGIN = `http://${AGENT_WITCH_LOCAL_APP_HOST}:${AGENT_WITCH_LOCAL_APP_PORT}`;
