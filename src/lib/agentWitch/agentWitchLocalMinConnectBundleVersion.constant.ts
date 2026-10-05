/**
 * Lowest install bundle version where web Connect works end-to-end.
 *
 * Why "35":
 * - Bundle 16 (ffb3e982) added cloud device restart / wake delivery.
 * - Bundle 35 (c1737b3f) first reports `installBundleVersion` on heartbeat and
 *   stores it on `agent_witch_devices`, so the web can classify installs.
 * - Pre-35 installs omit the field; `classifyAgentWitchLocalConnectVersion`
 *   treats missing/non-numeric as `too_old` (route to /download).
 *
 * Owned by AW Mac (handshake contract); bump when a breaking Connect wire change ships.
 */
export const AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION = "35";
