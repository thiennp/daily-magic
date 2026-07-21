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
  canRequestAgentWitchWake,
  requestAgentWitchWake,
} from "./requestAgentWitchWake";

export { buildAgentWitchWakeTerminalCommand } from "./buildAgentWitchWakeTerminalCommand";
export { buildAgentWitchSelfUpdateTerminalCommand } from "./buildAgentWitchSelfUpdateTerminalCommand";

export { deviceLabelMatchesLocalHost } from "./deviceLabelMatchesLocalHost";

export { deviceMatchesLocalTokenHash } from "./deviceMatchesLocalTokenHash";

export { canWakeMacDeviceFromBrowser } from "./canWakeMacDeviceFromBrowser";

export { default as MacDeviceWakeModal } from "./MacDeviceWakeModal";
export { default as MacDeviceOfflineWakeHint } from "./MacDeviceOfflineWakeHint";

export {
  requestAgentWitchDeviceRestart,
  isAgentWitchDeviceRestartRequested,
  acknowledgeAgentWitchDeviceRestart,
} from "./agentWitchDeviceRestartRequest";

export { requestLocalAgentWitchRestartFromWakeServer } from "./requestLocalAgentWitchRestartFromWakeServer";
