/** Timestamped config/identity backup plus allowlisted removal of the broken app files. */
export const buildAgentWitchRepairScriptBackup = (): string => `
# Copies top-level files (config, identity, version, port) of the install root and of
# each profile into INSTALL_DIR/repair-backups/<UTC time>/. Folders such as projects,
# runs, reports, logs and harness are never copied or touched.
awl_repair_backup() {
  AWL_REPAIR_STAGE="backup"
  local stamp target file name profile_dir rel copy
  stamp="$(date -u +%Y%m%dT%H%M%SZ)"
  target="\${INSTALL_DIR}/repair-backups/\${stamp}-$$"
  mkdir -p "\${target}/root"
  chmod 700 "\${INSTALL_DIR}/repair-backups" "\${target}"
  for file in "\${INSTALL_DIR}"/*; do
    [[ -f "\${file}" && ! -L "\${file}" ]] || continue
    cp -p "\${file}" "\${target}/root/"
  done
  for profile_dir in "\${INSTALL_DIR}"/profiles/*/; do
    [[ -d "\${profile_dir}" && ! -L "\${profile_dir%/}" ]] || continue
    name="$(basename "\${profile_dir}")"
    mkdir -p "\${target}/profiles/\${name}"
    for file in "\${profile_dir}"*; do
      [[ -f "\${file}" && ! -L "\${file}" ]] || continue
      cp -p "\${file}" "\${target}/profiles/\${name}/"
    done
  done
  : > "\${target}/MANIFEST.txt"
  while IFS= read -r file; do
    rel="\${file#"\${INSTALL_DIR}/"}"
    copy="$(awl_repair_backup_copy_path "\${target}" "\${rel}")"
    if [[ ! -f "\${copy}" || "$(awl_repair_sha256 "\${file}")" != "$(awl_repair_sha256 "\${copy}")" ]]; then
      awl_repair_die "Backup check failed for \${rel}; nothing was removed."
    fi
    printf '%s %s\\n' "\${rel}" "$(awl_repair_fingerprint "\${file}")" >> "\${target}/MANIFEST.txt"
  done < <(awl_repair_identity_files)
  BACKUP_DIR="\${target}"
  awl_repair_log "Backed up config and identity to \${BACKUP_DIR}"
}

awl_repair_backup_copy_path() {
  local target="$1" rel="$2"
  if [[ "\${rel}" == profiles/* ]]; then
    printf '%s/%s' "\${target}" "\${rel}"
  else
    printf '%s/root/%s' "\${target}" "\${rel}"
  fi
}

# Only these direct children of INSTALL_DIR may be removed (app bundle, runtime, deps).
AWL_REPAIR_REMOVABLE="app node_modules package.json package-lock.json agent-witch.ts agent-witch.js command run.sh wake.sh watchdog.sh install-version.json .node-download .node"

awl_repair_safe_remove() {
  local target="$1" rel
  case "\${target}" in
    ""|"/"|"\${HOME}"|"\${HOME}/"|"\${INSTALL_DIR}"|"\${INSTALL_DIR}/") awl_repair_die "Refusing to remove \${target:-an empty path}." ;;
  esac
  [[ "\${target}" == "\${INSTALL_DIR}/"* ]] || awl_repair_die "Refusing to remove \${target}: outside \${INSTALL_DIR}."
  rel="\${target#"\${INSTALL_DIR}/"}"
  if [[ -z "\${rel}" || "\${rel}" == */* || "\${rel}" == "." || "\${rel}" == ".." ]]; then
    awl_repair_die "Refusing to remove \${target}."
  fi
  case " \${AWL_REPAIR_REMOVABLE} " in
    *" \${rel} "*) ;;
    *) awl_repair_die "Refusing to remove \${target}: not an app file." ;;
  esac
  if [[ -L "\${target}" ]]; then
    rm -f -- "\${target}"
  elif [[ -e "\${target}" ]]; then
    rm -rf -- "\${target}"
  fi
}

awl_repair_remove_broken_install() {
  AWL_REPAIR_STAGE="remove"
  local name
  for name in app node_modules package.json package-lock.json agent-witch.ts agent-witch.js command run.sh wake.sh watchdog.sh install-version.json .node-download; do
    awl_repair_safe_remove "\${INSTALL_DIR}/\${name}"
  done
  if [[ -d "\${INSTALL_DIR}/.node" ]] && ! "\${INSTALL_DIR}/.node/bin/node" -e '' >/dev/null 2>&1; then
    awl_repair_safe_remove "\${INSTALL_DIR}/.node"
  fi
  awl_repair_log "Removed old app files (identity, profiles and projects kept)."
}
`;
