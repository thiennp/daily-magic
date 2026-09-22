/**
 * AWI slice `linux-launch` — systemd user unit + Linux Node tarball helpers.
 */
export {
  AGENT_WITCH_LINUX_NODE_LTS_VERSION,
  AGENT_WITCH_SYSTEMD_USER_UNIT_NAME,
} from "./types";

export { buildAgentWitchInstallScriptLinuxNodeRuntime } from "../internal/core/buildAgentWitchInstallScriptLinuxNodeRuntime";

export { buildAgentWitchInstallScriptSystemdUserUnitBlock } from "../internal/core/buildAgentWitchInstallScriptSystemdUserUnitBlock";
