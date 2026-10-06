/**
 * Floor "76": the first bundle that can self-update to the current one (CommonJS bundle, so its WebSocket loads).
 * 71–75 crash on start ("Dynamic require of events"); 67–70 break self-update. See repair/KNOWN_ISSUES.md AWLR-FLOOR-001.
 */
export const AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION = "76";
