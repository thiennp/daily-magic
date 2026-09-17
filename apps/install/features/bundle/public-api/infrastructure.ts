/**
 * AWI slice `bundle` — install bundle version and shipped artifact paths.
 */
export { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "./types";

export {
  resolveAgentWitchInstallBundleOutfile,
  resolveAgentWitchShippedInstallBundleAppDir,
  resolveAgentWitchShippedInstallBundleRootDir,
} from "../internal/core/resolveAgentWitchInstallBundlePaths";
