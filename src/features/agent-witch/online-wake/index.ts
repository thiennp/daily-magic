export type {
  MacPresenceTier,
  MacDevicePresence,
  MacDevicePresenceCounts,
} from "./macDevicePresence";
export {
  resolveMacPresenceTier,
  formatMacPresenceStatusLabel,
  canDispatchToMac,
  countMacPresenceTiers,
  buildMacDevicesStatusLine,
  pickDefaultMacDeviceId,
  pickAlternateDispatchReadyDeviceId,
} from "./macDevicePresence";

export {
  AGENT_WITCH_WAKE_DEFAULT_PORT,
  AGENT_WITCH_WAKE_BASE_URL,
  resolveAgentWitchWakeBaseUrlForPage,
  resolveAgentWitchWakePortForPage,
  canRequestAgentWitchWake,
  requestAgentWitchWake,
} from "./requestAgentWitchWake";

export { buildAgentWitchWakeTerminalCommand } from "./buildAgentWitchWakeTerminalCommand";

export { deviceLabelMatchesLocalHost } from "./deviceLabelMatchesLocalHost";

export { canWakeMacDeviceFromBrowser } from "./canWakeMacDeviceFromBrowser";

export { default as MacDeviceWakeModal } from "./MacDeviceWakeModal";
export { default as MacDeviceOfflineWakeHint } from "./MacDeviceOfflineWakeHint";

export {
  requestAgentWitchDeviceRestart,
  isAgentWitchDeviceRestartRequested,
  acknowledgeAgentWitchDeviceRestart,
} from "./agentWitchDeviceRestartRequest";

export { requestLocalAgentWitchRestartFromWakeServer } from "./requestLocalAgentWitchRestartFromWakeServer";
