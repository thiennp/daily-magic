/**
 * AWI slice `uninstall` — remove local install and LaunchAgents.
 */
export {
  runAgentWitchUninstallLocal,
  type AgentWitchUninstallLocalResult,
} from "../internal/core/agentWitchUninstallLocal";
export {
  forgetAgentWitchLocalConnection,
  type ForgetAgentWitchLocalConnectionResult,
} from "../internal/core/forgetAgentWitchLocalConnection";
export { isUnknownAgentWitchIdentityError } from "../internal/core/isUnknownAgentWitchIdentityError";
