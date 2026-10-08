/**
 * AWI slice `install-layout` — browser-safe origin / install-dir resolution (no node:fs).
 */
export {
  isLocalAgentWitchHostname,
  isLocalAgentWitchOrigin,
  resolveAgentWitchAppHome,
} from "../internal/core/resolveAgentWitchAppHome";
export {
  isAgentWitchLocalInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "../internal/core/resolveAgentWitchLaunchAgentPrefix.util";
export {
  buildAgentWitchLinuxManualStartCommand,
  buildAgentWitchReviveSteps,
  resolveAgentWitchRevivePlatform,
} from "../internal/core/buildAgentWitchReviveSteps";
export type {
  AgentWitchReviveKnownPlatform,
  AgentWitchRevivePlatform,
  AgentWitchReviveStep,
  AgentWitchReviveStepsInput,
} from "../internal/core/buildAgentWitchReviveSteps";
export {
  reviveAgentWitchClientProcess,
  type AgentWitchReviveProcessOutcome,
  type AgentWitchReviveProcessResult,
  type AgentWitchReviveProcessRunners,
} from "../internal/core/reviveAgentWitchClientProcess";

/** d5e39215: profile-agnostic run.sh text (pure string, browser-safe). */
export { buildAgentWitchRunScript } from "../internal/core/buildAgentWitchRunScript";
