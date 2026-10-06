/** Reinstall by running the shipped update installer, then restore identity that went missing. */
export const buildAgentWitchRepairScriptReinstall = (): string => `
# Runs the embedded update installer (renderUpdateAgentWitchScript): it keeps the
# pairing token from the local config, downloads the bundle and restarts services.
awl_repair_reinstall() {
  AWL_REPAIR_STAGE="reinstall"
  local installer path_prefix=""
  if [[ -n "\${AWL_REPAIR_INSTALLER_FILE}" ]]; then
    [[ -f "\${AWL_REPAIR_INSTALLER_FILE}" ]] || awl_repair_die "AWL_REPAIR_INSTALLER_FILE not found."
    installer="\${AWL_REPAIR_INSTALLER_FILE}"
  else
    installer="\${AWL_REPAIR_TMP}/agent-witch-update-installer.sh"
    awl_repair_write_installer "\${installer}"
  fi
  if awl_repair_truthy "\${AWL_REPAIR_NO_START}"; then
    path_prefix="$(awl_repair_prepare_no_start_shims):"
  fi
  awl_repair_log "Reinstalling the latest AgentWitch Local…"
  if ! PATH="\${path_prefix}\${PATH}" bash "\${installer}" </dev/null; then
    awl_repair_warn "The installer reported an error."
    return 1
  fi
}

# Puts back identity files that went missing; refills a lost pairingToken from the backup.
awl_repair_restore_identity() {
  AWL_REPAIR_STAGE="restore"
  local line rel copy current changed=0
  [[ -n "\${BACKUP_DIR}" && -f "\${BACKUP_DIR}/MANIFEST.txt" ]] || return 0
  while IFS= read -r line; do
    rel="\${line%% *}"
    [[ -n "\${rel}" && "\${rel}" != *..* ]] || continue
    copy="$(awl_repair_backup_copy_path "\${BACKUP_DIR}" "\${rel}")"
    current="\${INSTALL_DIR}/\${rel}"
    if [[ ! -f "\${current}" ]]; then
      mkdir -p "$(dirname "\${current}")"
      cp -p "\${copy}" "\${current}"
      awl_repair_log "Restored \${rel} from backup."
      changed=1
    elif [[ "\${rel}" == */config.json || "\${rel}" == config.json ]]; then
      if awl_repair_refill_pairing_token "\${copy}" "\${current}"; then
        awl_repair_log "Restored the pairing link in \${rel}."
        changed=1
      fi
    elif [[ "$(awl_repair_sha256 "\${current}")" != "$(awl_repair_sha256 "\${copy}")" ]]; then
      awl_repair_warn "\${rel} changed during reinstall; kept the new file (old copy is in the backup)."
    fi
  done < "\${BACKUP_DIR}/MANIFEST.txt"
  if [[ "\${changed}" == "1" ]]; then
    awl_repair_restart_services
  fi
}

# Exit 0 only when the token was missing now but present in the backup and was written back.
awl_repair_refill_pairing_token() {
  local node_bin
  node_bin="$(awl_repair_node)" || return 1
  "\${node_bin}" -e '
const fs = require("node:fs");
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
try {
  const backup = read(process.argv[1]);
  const current = read(process.argv[2]);
  const token = typeof backup.pairingToken === "string" ? backup.pairingToken.trim() : "";
  const now = typeof current.pairingToken === "string" ? current.pairingToken.trim() : "";
  if (token.length === 0 || now.length > 0) process.exit(1);
  current.pairingToken = token;
  fs.writeFileSync(process.argv[2], JSON.stringify(current, null, 2) + "\\n", { mode: 0o600 });
} catch { process.exit(1); }' "$1" "$2" 2>/dev/null
}
`;
