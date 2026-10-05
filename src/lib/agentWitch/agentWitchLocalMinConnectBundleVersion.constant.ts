/**
 * Minimum Agent Witch Local (AWL) install bundle version the server accepts for
 * a Connect. Owned by AW Mac (handshake contract); bump here when a breaking
 * wire change ships. `null` / empty / non-numeric local versions are always
 * treated as too old (see `classifyAgentWitchLocalConnectVersion`).
 */
export const AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION = "1";
