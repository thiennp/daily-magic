const INSTALL_DOWNLOAD_TARGET_PATTERN = /-o "\$\{INSTALL_DIR\}\/([^"]+)"/g;

export const extractAgentWitchInstallDownloadTargets = (
  installBashScript: string,
): ReadonlySet<string> => {
  const targets = new Set<string>();

  for (const match of installBashScript.matchAll(
    INSTALL_DOWNLOAD_TARGET_PATTERN,
  )) {
    const scriptName = match[1];
    if (scriptName !== undefined) {
      targets.add(scriptName);
    }
  }

  return targets;
};
