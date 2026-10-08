/**
 * AWI slice `bundle` — install bundle version and shipped artifact paths.
 */
export { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "./types";

export {
  AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE_ENV,
  AWI_VERIFY_INSTALL_BUNDLE_RELATIVE_PATH,
} from "./types";

export {
  resolveAgentWitchInstallBundleAppDir,
  resolveAgentWitchInstallBundleOutfile,
  resolveAgentWitchShippedInstallBundleAppDir,
  resolveAgentWitchShippedInstallBundleRootDir,
  resolveAgentWitchVerifyInstallBundleAppDir,
  shouldWriteShippedAgentWitchInstallBundle,
} from "../internal/core/resolveAgentWitchInstallBundlePaths";
