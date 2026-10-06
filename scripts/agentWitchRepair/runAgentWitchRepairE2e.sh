#!/usr/bin/env bash
# Linux e2e for the update + repair script (/install/agent-witch-update.sh, alias
# /install/agent-witch-repair.sh) in a throwaway HOME. No daemons, no prod traffic.
# Usage: REPAIR_SCRIPT=<rendered script> BUNDLE_DIR=public/install/agent-witch/app \
#   bash scripts/agentWitchRepair/runAgentWitchRepairE2e.sh
# REPAIR_SCRIPT is rendered for https://www.agentwitch.com (renderAgentWitchRepairE2eScripts.ts);
# the origin is rewritten to a short-lived 127.0.0.1 static server stopped on exit.
set -euo pipefail
: "${REPAIR_SCRIPT:?}" "${BUNDLE_DIR:?}"
PROD_ORIGIN="https://www.agentwitch.com"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/awl-repair-e2e.XXXXXX")"
PIDS=()
cleanup() {
  local pid
  for pid in "${PIDS[@]}"; do kill "${pid}" 2>/dev/null || true; done
  [[ "${KEEP_WORK:-0}" == "1" ]] || rm -rf -- "${WORK}"
}
trap cleanup EXIT
PASS=0
check() {
  local label="$1"; shift
  if "$@"; then PASS=$((PASS + 1)); echo "PASS ${label}"; else echo "FAIL ${label}"; exit 1; fi
}
sha() { sha256sum "$1" | awk '{print $1}'; }
free_port() { python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1",0)); print(s.getsockname()[1])'; }

PORT="$(free_port)"; ORIGIN="http://127.0.0.1:${PORT}"
TARGET="$(sed -n 's/.*"bundleVersion": "\([0-9]*\)".*/\1/p' "${REPAIR_SCRIPT}" | head -n 1)"
SERVE="${WORK}/serve"; mkdir -p "${SERVE}/install/agent-witch/app"
sed "s#${PROD_ORIGIN}#${ORIGIN}#g" "${REPAIR_SCRIPT}" > "${WORK}/repair.sh"
printf '{"ok":true,"bundleVersion":"%s","bundleUrl":"app/agent-witch.js","scripts":["app/agent-witch.js","app/deps.tar.gz"]}' "${TARGET}" > "${SERVE}/install/agent-witch/version"
cp "${BUNDLE_DIR}/agent-witch.js" "${BUNDLE_DIR}/deps.tar.gz" "${SERVE}/install/agent-witch/app/"
( cd "${SERVE}" && exec python3 -m http.server "${PORT}" --bind 127.0.0.1 >/dev/null 2>&1 ) &
PIDS+=("$!")
for _ in 1 2 3 4 5 6 7 8 9 10; do curl -fsS "${ORIGIN}/install/agent-witch/version" >/dev/null 2>&1 && break; sleep 0.5; done

FAKE_HOME="${WORK}/home"; AW="${FAKE_HOME}/.agent-witch"; PROFILE="${AW}/profiles/e2e@example.com"
SECRET_TOKEN="e2e-token-$(od -An -N8 -tx1 /dev/urandom | tr -d ' \n')"
SECRET_KEY="e2e-private-key-$(od -An -N8 -tx1 /dev/urandom | tr -d ' \n')"
mkdir -p "${AW}/app" "${AW}/command" "${AW}/node_modules/ws" "${PROFILE}/projects/default" "${PROFILE}/logs" "${FAKE_HOME}/code/my-project"
printf '{"bundleVersion":"40","appOrigin":"%s"}\n' "${PROD_ORIGIN}" > "${AW}/install-version.json"
printf '{"email":"e2e@example.com"}\n' > "${AW}/active-profile.json"
printf '{"wakePort":47999}\n' > "${AW}/wake-port.json"
printf '// old bundle 40\n' > "${AW}/app/agent-witch.js"
printf '#!/bin/sh\nexit 0\n' > "${AW}/command/run.sh"
printf '{}\n' > "${AW}/package.json"; printf '// legacy\n' > "${AW}/agent-witch.ts"
printf '{"email":"e2e@example.com","wsUrl":"wss://www.agentwitch.com/api/agent-witch/ws","pairingToken":"%s"}\n' "${SECRET_TOKEN}" > "${PROFILE}/config.json"
printf '{"publicKey":"pub","privateKey":"%s"}\n' "${SECRET_KEY}" > "${PROFILE}/device-keypair.json"
printf 'user notes\n' > "${PROFILE}/projects/default/notes.txt"
printf 'old log\n' > "${PROFILE}/logs/agent-witch.log"
printf 'user code\n' > "${FAKE_HOME}/code/my-project/main.txt"
KEY_SHA="$(sha "${PROFILE}/device-keypair.json")"
TOKEN_SHA="$(printf '%s' "${SECRET_TOKEN}" | sha256sum | awk '{print $1}')"
NOTES_SHA="$(sha "${PROFILE}/projects/default/notes.txt")"; CODE_SHA="$(sha "${FAKE_HOME}/code/my-project/main.txt")"
token_sha_now() { node -e 'const c=require(process.argv[1]);process.stdout.write(require("crypto").createHash("sha256").update(c.pairingToken||"").digest("hex"))' "${PROFILE}/config.json"; }
run_repair() {
  local log="$1"; shift
  # Piped like `curl ... | bash` so the installer must not eat the script from stdin.
  cat "${WORK}/repair.sh" | env -i PATH="${PATH}" HOME="${FAKE_HOME}" TMPDIR="${WORK}" AWL_REPAIR_ORIGIN="${ORIGIN}" \
    AWL_REPAIR_NO_START=1 AGENT_WITCH_INSTALL_NONINTERACTIVE=1 "$@" bash > "${log}" 2>&1
}
no_secrets() { ! grep -q -e "${SECRET_TOKEN}" -e "${SECRET_KEY}" "$1"; }
backups() { find "${AW}/repair-backups" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' '; }

echo "== run 1: repair old bundle 40 -> ${TARGET}"
run_repair "${WORK}/run1.log" || { cat "${WORK}/run1.log"; exit 1; }
check "run1 reports success" grep -q "Result:      SUCCESS (success)" "${WORK}/run1.log"
check "run1 prints no secrets" no_secrets "${WORK}/run1.log"
check "backup created" test "$(backups)" = "1"
BACKUP="$(find "${AW}/repair-backups" -mindepth 1 -maxdepth 1 -type d | head -n 1)"
check "backup manifest lists keypair" grep -q "profiles/e2e@example.com/device-keypair.json sha256:${KEY_SHA:0:16}" "${BACKUP}/MANIFEST.txt"
check "backup keypair matches original" test "$(sha "${BACKUP}/profiles/e2e@example.com/device-keypair.json")" = "${KEY_SHA}"
check "backup dir is private (700)" test "$(stat -c %a "${BACKUP}")" = "700"
check "keypair preserved" test "$(sha "${PROFILE}/device-keypair.json")" = "${KEY_SHA}"
check "pairing token preserved" test "$(token_sha_now)" = "${TOKEN_SHA}"
check "version upgraded" grep -q "\"bundleVersion\": \"${TARGET}\"" "${AW}/install-version.json"
check "bundle installed" test "$(sha "${AW}/app/agent-witch.js")" = "$(sha "${BUNDLE_DIR}/agent-witch.js")"
check "deps extracted" test -d "${AW}/app/deps"
check "legacy files removed" test ! -e "${AW}/command" -a ! -e "${AW}/node_modules" -a ! -e "${AW}/package.json" -a ! -e "${AW}/agent-witch.ts"
check "profile project untouched" test "$(sha "${PROFILE}/projects/default/notes.txt")" = "${NOTES_SHA}"
check "user code untouched" test "$(sha "${FAKE_HOME}/code/my-project/main.txt")" = "${CODE_SHA}"
check "profile logs kept" grep -q "old log" "${PROFILE}/logs/agent-witch.log"

echo "== run 2: re-run is a no-op"
run_repair "${WORK}/run2.log" || { cat "${WORK}/run2.log"; exit 1; }
check "run2 already healthy" grep -q "Result:      SUCCESS (already healthy)" "${WORK}/run2.log"
check "run2 made no new backup" test "$(backups)" = "1"
check "run2 prints no secrets" no_secrets "${WORK}/run2.log"

echo "== run 3: recover from a partial failure (app removed, version file left)"
rm -rf "${AW}/app"
run_repair "${WORK}/run3.log" || { cat "${WORK}/run3.log"; exit 1; }
check "run3 success" grep -q "Result:      SUCCESS (success)" "${WORK}/run3.log"
check "run3 bundle back" test -s "${AW}/app/agent-witch.js"
check "run3 keypair preserved" test "$(sha "${PROFILE}/device-keypair.json")" = "${KEY_SHA}"

echo "== run 4: installer loses identity -> restored from backup"
sed -n "/<<'AWL_REPAIR_UPDATE_INSTALLER_EOF'/,/^AWL_REPAIR_UPDATE_INSTALLER_EOF\$/p" "${WORK}/repair.sh" | sed '1d;$d' > "${WORK}/real-update.sh"
test -s "${WORK}/real-update.sh"
cat > "${WORK}/lossy-installer.sh" <<LOSSY
set -euo pipefail
bash "${WORK}/real-update.sh"
rm -f "${PROFILE}/device-keypair.json"
node -e 'const fs=require("fs");const p=process.argv[1];const c=JSON.parse(fs.readFileSync(p,"utf8"));delete c.pairingToken;fs.writeFileSync(p,JSON.stringify(c))' "${PROFILE}/config.json"
LOSSY
run_repair "${WORK}/run4.log" AWL_REPAIR_FORCE=1 AWL_REPAIR_INSTALLER_FILE="${WORK}/lossy-installer.sh" || { cat "${WORK}/run4.log"; exit 1; }
check "run4 restored keypair" test "$(sha "${PROFILE}/device-keypair.json")" = "${KEY_SHA}"
check "run4 restored token" test "$(token_sha_now)" = "${TOKEN_SHA}"
check "run4 logged restore" grep -q "Restored the pairing link" "${WORK}/run4.log"
check "run4 prints no secrets" no_secrets "${WORK}/run4.log"

echo "== run 5: healthy no-op via the health endpoint (short-lived fake /health)"
HPORT="$(free_port)"; mkdir -p "${WORK}/health"
printf '{"ok":true,"wsConnected":true,"linkCode":"%s","installBundleVersion":"%s","osUid":%s,"installRootName":".agent-witch"}' "${SECRET_TOKEN}" "${TARGET}" "$(id -u)" > "${WORK}/health/health"
( cd "${WORK}/health" && exec python3 -m http.server "${HPORT}" --bind 127.0.0.1 >/dev/null 2>&1 ) &
PIDS+=("$!")
for _ in 1 2 3 4 5 6 7 8 9 10; do curl -fsS "http://127.0.0.1:${HPORT}/health" >/dev/null 2>&1 && break; sleep 0.5; done
run_repair "${WORK}/run5.log" AWL_REPAIR_NO_START=0 AWL_REPAIR_HEALTH_URL="http://127.0.0.1:${HPORT}/health" || { cat "${WORK}/run5.log"; exit 1; }
check "run5 health ok no-op" grep -q "Health:      ok" "${WORK}/run5.log"
check "run5 does not echo health body" no_secrets "${WORK}/run5.log"

echo "== run 6: refuses when nothing is installed"
EMPTY_HOME="${WORK}/empty-home"; mkdir -p "${EMPTY_HOME}"
set +e
env -i PATH="${PATH}" HOME="${EMPTY_HOME}" AWL_REPAIR_ORIGIN="${ORIGIN}" AWL_REPAIR_NO_START=1 bash "${WORK}/repair.sh" > "${WORK}/run6.log" 2>&1
CODE=$?
env -i PATH="${PATH}" HOME="${EMPTY_HOME}" sh "${WORK}/repair.sh" > "${WORK}/run7.log" 2>&1
CODE_SH=$?
set -e
check "run6 exits non-zero" test "${CODE}" -ne 0
check "run6 points at Connect" grep -q "Connect this computer" "${WORK}/run6.log"
check "run6 created nothing" test -z "$(ls -A "${EMPTY_HOME}")"
check "sh is refused with a bash hint" test "${CODE_SH}" -ne 0
check "sh hint text" grep -q "Run this with bash" "${WORK}/run7.log"
echo "== run 8: legacy single-profile install without a pairing token (update-script local fix)"
LEGACY_HOME="${WORK}/legacy-home"; mkdir -p "${LEGACY_HOME}/.agent-witch/app"
printf '{"wsUrl":"wss://www.agentwitch.com/api/agent-witch/ws"}\n' > "${LEGACY_HOME}/.agent-witch/config.json"
printf '{"publicKey":"pub","privateKey":"%s"}\n' "${SECRET_KEY}" > "${LEGACY_HOME}/.agent-witch/device-keypair.json"
LEGACY_KEY_SHA="$(sha "${LEGACY_HOME}/.agent-witch/device-keypair.json")"
env -i PATH="${PATH}" HOME="${LEGACY_HOME}" TMPDIR="${WORK}" AWL_REPAIR_ORIGIN="${ORIGIN}" AWL_REPAIR_NO_START=1 \
  AGENT_WITCH_INSTALL_NONINTERACTIVE=1 bash "${WORK}/repair.sh" > "${WORK}/run8.log" 2>&1 || { cat "${WORK}/run8.log"; exit 1; }
check "run8 success" grep -q "Result:      SUCCESS (success)" "${WORK}/run8.log"
check "run8 warns about missing token" grep -q "no pairing token in local config" "${WORK}/run8.log"
check "run8 keypair preserved" test "$(sha "${LEGACY_HOME}/.agent-witch/device-keypair.json")" = "${LEGACY_KEY_SHA}"
check "run8 prints no secrets" no_secrets "${WORK}/run8.log"
echo "ALL ${PASS} CHECKS PASSED"
