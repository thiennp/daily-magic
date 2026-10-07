/** Legacy fixed AWL loopback port (pre–per-account ranges). Keep for discovery/self-heal. */
export const AGENT_WITCH_LOCAL_APP_LEGACY_PORT = 43347;

/** Inclusive IANA dynamic/private port floor for per-account ranges. */
export const AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR = 49152;

/** Inclusive IANA dynamic/private port ceiling. */
export const AGENT_WITCH_LOCAL_APP_PORT_RANGE_CEILING = 65535;

/** Ports per account range (Product / design: e.g. 49152–49167). */
export const AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE = 16;

/** Persisted under `profiles/<email>/` (no secrets). */
export const AGENT_WITCH_LOCAL_PORT_RANGE_FILE_NAME = "local-port-range.json";

/** Persisted listen port under `profiles/<email>/` (no secrets). */
export const AGENT_WITCH_LOCAL_APP_PORT_FILE_NAME = "local-app-port.json";

/** User-facing conflict copy (Mac UX / Product). Never surface bare 113. */
export const AGENT_WITCH_LOCAL_PORTS_IN_USE_MESSAGE =
  "Ports for this account are in use.";

/** Settings help (Mac UX / Product). */
export const AGENT_WITCH_LOCAL_PORT_RANGE_HELP =
  "Unique to this AgentWitch account on this computer.";
