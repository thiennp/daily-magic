/**
 * Legacy path — re-exports AWL local server entry.
 */
export {
  reviveAgentWitchProcessViaLaunchctl,
  resolveLocalAppPublicKey,
  startAgentWitchLocalApp,
  type AgentWitchLocalAppControllers,
} from "../apps/live/entry/startLocalAppServer";
