export const buildAgentWitchInstallScriptWakeServerDependencies = (input: {
  readonly reviveScriptUrl: string;
  readonly connectionHealthScriptUrl: string;
  readonly connectionHealthConstantsScriptUrl: string;
  readonly launchAgentRunningScriptUrl: string;
  readonly watchdogLogScriptUrl: string;
  readonly watchdogStatusScriptUrl: string;
  readonly localLayoutScriptUrl: string;
  readonly appOrigin: string;
}): string => {
  const harnessScripts = [
    "applyHarnessInstallLocally.ts",
    "harnessInstallBundle.types.ts",
    "parseHarnessInstallBundle.ts",
    "planHarnessInstallBundle.ts",
  ] as const;

  const harnessDownloads = harnessScripts
    .map(
      (scriptName) =>
        `"\${CURL_BIN}" -fsSL "${input.appOrigin}/install/agent-witch/scripts/${scriptName}" -o "\${INSTALL_DIR}/${scriptName}"`,
    )
    .join("\n");

  return `
"\${CURL_BIN}" -fsSL "${input.reviveScriptUrl}" -o "\${INSTALL_DIR}/reviveAgentWitchWebSocket.ts"
"\${CURL_BIN}" -fsSL "${input.connectionHealthScriptUrl}" -o "\${INSTALL_DIR}/agentWitchConnectionHealth.ts"
"\${CURL_BIN}" -fsSL "${input.connectionHealthConstantsScriptUrl}" -o "\${INSTALL_DIR}/agentWitchConnectionHealth.constants.ts"
"\${CURL_BIN}" -fsSL "${input.launchAgentRunningScriptUrl}" -o "\${INSTALL_DIR}/isAgentWitchLaunchAgentRunning.ts"
"\${CURL_BIN}" -fsSL "${input.watchdogLogScriptUrl}" -o "\${INSTALL_DIR}/agentWitchWatchdogLog.ts"
"\${CURL_BIN}" -fsSL "${input.watchdogStatusScriptUrl}" -o "\${INSTALL_DIR}/buildAgentWitchWatchdogStatus.ts"
"\${CURL_BIN}" -fsSL "${input.localLayoutScriptUrl}" -o "\${INSTALL_DIR}/resolveAgentWitchLocalLayout.ts"
${harnessDownloads}
`;
};
