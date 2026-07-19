/** Local Agent Witch UI port (opened on the Mac; browser does not probe this). */
export const AGENT_WITCH_LOCAL_APP_PORT = 43347;

/** Loopback hostname (public DNS A/AAAA → 127.0.0.1 / ::1). */
export const AGENT_WITCH_LOCAL_APP_HOST = "local.agentwitch.com";

/** Friendly Mac-only origin; still bound to 127.0.0.1 (AGENT-021). */
export const AGENT_WITCH_LOCAL_APP_ORIGIN = `http://${AGENT_WITCH_LOCAL_APP_HOST}:${AGENT_WITCH_LOCAL_APP_PORT}`;
