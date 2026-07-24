const INSTALL_DOWNLOAD_TARGET_PATTERNS = [
  /-o "\$\{INSTALL_DIR\}\/([^"]+)"/g,
  /-o "\$\{APP_DIR\}\/([^"]+)"/g,
] as const;

export const extractAgentWitchInstallDownloadTargets = (
  installBashScript: string,
): ReadonlySet<string> => {
  const targets = new Set<string>();

  for (const match of installBashScript.matchAll(
    INSTALL_DOWNLOAD_TARGET_PATTERNS[0],
  )) {
    const scriptName = match[1];
    if (scriptName !== undefined) {
      targets.add(scriptName);
    }
  }

  for (const match of installBashScript.matchAll(
    INSTALL_DOWNLOAD_TARGET_PATTERNS[1],
  )) {
    const fileName = match[1];
    if (fileName !== undefined) {
      targets.add(`app/${fileName}`);
    }
  }

  return targets;
};
