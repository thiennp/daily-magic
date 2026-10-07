/**
 * DF-031: /health helpers for the repair script. Since H6 AWL listens on a
 * per-account port, so the repair discovers it instead of assuming 43347.
 */
export const buildAgentWitchRepairScriptHealth = (): string => `
# DF-031: since H6 AWL listens on a per-account port. Candidates, in order:
# each profile's saved port (profiles/*/local-app-port.json), each range
# (profiles/*/local-port-range.json), then the legacy URL for pre-H6 cores.
# Same order as the Mac app (candidateLocalAppPorts). Re-read on every poll.
awl_repair_health_urls() {
  local node_bin
  if [[ -n "\${AWL_REPAIR_HEALTH_URL}" ]]; then
    printf '%s\\n' "\${AWL_REPAIR_HEALTH_URL}"
    return 0
  fi
  if node_bin="$(awl_repair_node)"; then
    "\${node_bin}" -e '
const fs = require("node:fs");
const path = require("node:path");
const profilesDir = process.argv[1];
const ports = [];
const add = (p) => { if (Number.isInteger(p) && p >= 1024 && p <= 65535 && !ports.includes(p)) ports.push(p); };
const read = (file) => { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; } };
const dirs = (() => { try { return fs.readdirSync(profilesDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => path.join(profilesDir, d.name)).sort(); } catch { return []; } })();
for (const dir of dirs) { const saved = read(path.join(dir, "local-app-port.json")); if (saved) add(saved.localAppPort); }
for (const dir of dirs) {
  const range = read(path.join(dir, "local-port-range.json"));
  if (range && Number.isInteger(range.start) && Number.isInteger(range.end) && range.end >= range.start && range.end - range.start < 64) {
    Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i).forEach(add);
  }
}
for (const p of ports) console.log("http://127.0.0.1:" + p + "/health");' "\${INSTALL_DIR}/profiles" 2>/dev/null || true
  fi
  printf '%s\\n' "\${AWL_REPAIR_LEGACY_HEALTH_URL}"
}

# Reads only non-secret fields from GET /health (its body also carries a link code).
awl_repair_health_url_ok() {
  local body node_bin
  body="$(curl -fsS --max-time 3 "$1" 2>/dev/null)" || return 1
  node_bin="$(awl_repair_node)" || return 1
  printf '%s' "\${body}" | "\${node_bin}" -e '
const fs = require("node:fs");
try {
  const health = JSON.parse(fs.readFileSync(0, "utf8"));
  const uidOk = typeof health.osUid !== "number" || health.osUid === Number(process.argv[1]);
  const rootOk = typeof health.installRootName !== "string" || health.installRootName === process.argv[2];
  process.exit(health.ok === true && uidOk && rootOk ? 0 : 1);
} catch { process.exit(1); }' "$(id -u)" "$(basename "\${INSTALL_DIR}")"
}

# True when any candidate answers as this user's install; remembers which URL.
awl_repair_health_ok() {
  local url
  while IFS= read -r url; do
    [[ -n "\${url}" ]] || continue
    if awl_repair_health_url_ok "\${url}"; then
      AWL_REPAIR_HEALTH_FOUND_URL="\${url}"
      return 0
    fi
  done < <(awl_repair_health_urls)
  return 1
}

# Human label for summaries: the URL that answered, or what was probed.
awl_repair_health_label() {
  if [[ -n "\${AWL_REPAIR_HEALTH_FOUND_URL}" ]]; then
    printf '%s' "\${AWL_REPAIR_HEALTH_FOUND_URL}"
  elif [[ -n "\${AWL_REPAIR_HEALTH_URL}" ]]; then
    printf '%s' "\${AWL_REPAIR_HEALTH_URL}"
  else
    printf 'discovered port under %s/profiles, then %s' "\${INSTALL_DIR}" "\${AWL_REPAIR_LEGACY_HEALTH_URL}"
  fi
}
`;
