/**
 * AWI slice `install-layout` — browser-safe origin / install-dir resolution (no node:fs).
 */
export {
  isLocalAgentWitchHostname,
  isLocalAgentWitchOrigin,
  resolveAgentWitchAppHome,
} from "../internal/core/resolveAgentWitchAppHome";
