import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";
import { buildAgentWitchInstallScriptUpdater } from "@/lib/agentWitch/buildAgentWitchInstallScriptUpdater";
import { buildAgentWitchInstallScriptVersionStamp } from "@/lib/agentWitch/buildAgentWitchInstallScriptVersionStamp";
import { buildAgentWitchInstallScriptWatchdog } from "@/lib/agentWitch/buildAgentWitchInstallScriptWatchdog";
import { buildAgentWitchInstallScriptWakeServer } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServer";

export const buildAgentWitchInstallBashScript = (input: {
  readonly appOrigin: string;
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeAllowedOriginsScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeLinkAccountScriptUrl: string;
  readonly wakeSpawnClientScriptUrl: string;
  readonly wakeCliScriptUrl: string;
  readonly watchdogScriptUrl: string;
  readonly reviveScriptUrl: string;
  readonly connectionHealthScriptUrl: string;
  readonly connectionHealthConstantsScriptUrl: string;
  readonly launchAgentRunningScriptUrl: string;
  readonly localLayoutScriptUrl: string;
  readonly watchdogLogScriptUrl: string;
  readonly watchdogStatusScriptUrl: string;
  readonly selfUpdateScriptUrl: string;
  readonly selfUpdateCoreScriptUrl: string;
  readonly installVersionScriptUrl: string;
  readonly resolveAppOriginScriptUrl: string;
  readonly selfUpdateLogScriptUrl: string;
  readonly launchAgentLabelsScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string =>
  `${buildAgentWitchInstallScriptSetup({
    appOrigin: input.appOrigin,
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
  })}${buildAgentWitchInstallScriptLaunchAgent({
    wsUrl: input.wsUrl,
    appOrigin: input.appOrigin,
  })}${buildAgentWitchInstallScriptWakeServer({
    wakeServerScriptUrl: input.wakeServerScriptUrl,
    wakeConstantsScriptUrl: input.wakeConstantsScriptUrl,
    wakeListTargetsScriptUrl: input.wakeListTargetsScriptUrl,
    wakeKickstartScriptUrl: input.wakeKickstartScriptUrl,
    wakeHandlersScriptUrl: input.wakeHandlersScriptUrl,
    wakeAllowedOriginsScriptUrl: input.wakeAllowedOriginsScriptUrl,
    wakeEnsureProfileScriptUrl: input.wakeEnsureProfileScriptUrl,
    wakeLinkAccountScriptUrl: input.wakeLinkAccountScriptUrl,
    wakeSpawnClientScriptUrl: input.wakeSpawnClientScriptUrl,
    wakeCliScriptUrl: input.wakeCliScriptUrl,
    reviveScriptUrl: input.reviveScriptUrl,
    connectionHealthScriptUrl: input.connectionHealthScriptUrl,
    connectionHealthConstantsScriptUrl:
      input.connectionHealthConstantsScriptUrl,
    launchAgentRunningScriptUrl: input.launchAgentRunningScriptUrl,
    watchdogLogScriptUrl: input.watchdogLogScriptUrl,
    watchdogStatusScriptUrl: input.watchdogStatusScriptUrl,
    localLayoutScriptUrl: input.localLayoutScriptUrl,
  })}${buildAgentWitchInstallScriptWatchdog({
    watchdogScriptUrl: input.watchdogScriptUrl,
    reviveScriptUrl: input.reviveScriptUrl,
    connectionHealthScriptUrl: input.connectionHealthScriptUrl,
    connectionHealthConstantsScriptUrl:
      input.connectionHealthConstantsScriptUrl,
    launchAgentRunningScriptUrl: input.launchAgentRunningScriptUrl,
    listTargetsScriptUrl: input.wakeListTargetsScriptUrl,
    kickstartScriptUrl: input.wakeKickstartScriptUrl,
    spawnClientScriptUrl: input.wakeSpawnClientScriptUrl,
    localLayoutScriptUrl: input.localLayoutScriptUrl,
    watchdogLogScriptUrl: input.watchdogLogScriptUrl,
    watchdogStatusScriptUrl: input.watchdogStatusScriptUrl,
  })}${buildAgentWitchInstallScriptUpdater({
    selfUpdateScriptUrl: input.selfUpdateScriptUrl,
    selfUpdateCoreScriptUrl: input.selfUpdateCoreScriptUrl,
    installVersionScriptUrl: input.installVersionScriptUrl,
    resolveAppOriginScriptUrl: input.resolveAppOriginScriptUrl,
    selfUpdateLogScriptUrl: input.selfUpdateLogScriptUrl,
    launchAgentLabelsScriptUrl: input.launchAgentLabelsScriptUrl,
    listTargetsScriptUrl: input.wakeListTargetsScriptUrl,
    kickstartScriptUrl: input.wakeKickstartScriptUrl,
    localLayoutScriptUrl: input.localLayoutScriptUrl,
  })}${buildAgentWitchInstallScriptVersionStamp(input.appOrigin)}`;
