/** Identity file listing, sha256 fingerprints (never contents) and the always-printed exit summary. */
export const buildAgentWitchRepairScriptIdentity = (): string => `
# Identity = device keypair + config (pairingToken) at the install root and per profile.
awl_repair_identity_files() {
  local candidate
  for candidate in "\${INSTALL_DIR}/config.json" "\${INSTALL_DIR}/device-keypair.json" \\
    "\${INSTALL_DIR}"/profiles/*/config.json "\${INSTALL_DIR}"/profiles/*/device-keypair.json; do
    if [[ -f "\${candidate}" && ! -L "\${candidate}" ]]; then
      printf '%s\\n' "\${candidate}"
    fi
  done
}

# Hashes the pairing token inside node; the token itself never reaches stdout.
awl_repair_token_fingerprint() {
  local node_bin
  node_bin="$(awl_repair_node)" || { printf 'unknown (node missing)'; return 0; }
  "\${node_bin}" -e '
const fs = require("node:fs");
const crypto = require("node:crypto");
try {
  const token = JSON.parse(fs.readFileSync(process.argv[1], "utf8")).pairingToken;
  if (typeof token === "string" && token.trim().length > 0) {
    process.stdout.write("present sha256:" + crypto.createHash("sha256").update(token.trim()).digest("hex").slice(0, 16));
  } else {
    process.stdout.write("missing");
  }
} catch { process.stdout.write("unreadable"); }' "$1" 2>/dev/null || printf 'unreadable'
}

awl_repair_describe_identity() {
  local file rel line
  IDENTITY_REPORT=""
  while IFS= read -r file; do
    [[ -n "\${file}" ]] || continue
    rel="\${file#"\${INSTALL_DIR}/"}"
    line="\${rel}: present $(awl_repair_fingerprint "\${file}")"
    if [[ "\${file}" == */config.json ]]; then
      line="\${line}; pairingToken $(awl_repair_token_fingerprint "\${file}")"
    fi
    IDENTITY_REPORT="\${IDENTITY_REPORT}    \${line}"$'\\n'
  done < <(awl_repair_identity_files)
  if [[ -z "\${IDENTITY_REPORT}" ]]; then
    IDENTITY_REPORT="    (no device identity files found)"$'\\n'
  fi
}

awl_repair_summary() {
  local code="$1"
  if [[ "\${code}" -eq 0 && "\${AWL_REPAIR_RESULT}" == "failed" ]]; then
    AWL_REPAIR_RESULT="success"
  fi
  awl_repair_describe_identity 2>/dev/null || true
  echo ""
  echo "==== AgentWitch Local repair summary ===="
  if [[ "\${AWL_REPAIR_RESULT}" == "success" || "\${AWL_REPAIR_RESULT}" == "already healthy" ]]; then
    echo "Result:      SUCCESS (\${AWL_REPAIR_RESULT})"
  else
    echo "Result:      FAILED during \${AWL_REPAIR_STAGE}"
  fi
  echo "Install dir: \${INSTALL_DIR}"
  echo "Version:     before \${VERSION_BEFORE} -> now \${VERSION_AFTER} (latest \${VERSION_TARGET})"
  echo "Backup:      \${BACKUP_DIR:-none (nothing removed)}"
  echo "Health:      \${HEALTH_STATUS}"
  echo "Identity (fingerprints only):"
  printf '%s' "\${IDENTITY_REPORT}"
  if [[ "\${AWL_REPAIR_RESULT}" != "success" && "\${AWL_REPAIR_RESULT}" != "already healthy" ]]; then
    echo "Next step:   run the same command again (safe to re-run). Identity files were not deleted."
  fi
}

awl_repair_on_exit() {
  local code=$?
  trap - EXIT
  if [[ -n "\${AWL_REPAIR_TMP}" && "\${AWL_REPAIR_TMP}" == */awl-repair.* && -d "\${AWL_REPAIR_TMP}" ]]; then
    rm -rf -- "\${AWL_REPAIR_TMP}"
  fi
  awl_repair_summary "\${code}"
  exit "\${code}"
}
trap awl_repair_on_exit EXIT
`;
