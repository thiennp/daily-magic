const AWL_REPAIR_INSTALLER_DELIMITER = "AWL_REPAIR_UPDATE_INSTALLER_EOF";

/**
 * Embeds the shipped update installer (renderUpdateAgentWitchScript) verbatim in a
 * quoted heredoc, so /install/agent-witch-update.sh can serve the repair wrapper
 * without fetching itself. The installer logic is shared, not forked.
 */
export const buildAgentWitchRepairScriptEmbeddedInstaller = (
  installerScript: string,
): string => {
  if (installerScript.split("\n").includes(AWL_REPAIR_INSTALLER_DELIMITER)) {
    throw new Error("Update installer contains the repair heredoc delimiter.");
  }
  const body = installerScript.endsWith("\n")
    ? installerScript
    : `${installerScript}\n`;

  return `
# Shipped update installer, embedded verbatim (quoted heredoc: no expansion).
awl_repair_write_installer() {
  cat > "$1" <<'${AWL_REPAIR_INSTALLER_DELIMITER}'
${body}${AWL_REPAIR_INSTALLER_DELIMITER}
}
`;
};
