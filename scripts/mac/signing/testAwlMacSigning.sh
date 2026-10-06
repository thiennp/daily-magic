#!/usr/bin/env bash
# Self-test for the AWL Mac signing helpers: secret masking, dry-run gating,
# mode resolution and inside-out order. Runs no codesign/notary/keychain command.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAILS=0
WORK="$(mktemp -d "${TMPDIR:-/tmp}/awl-sign-test.XXXXXX")"
trap 'rm -rf "${WORK}"' EXIT

check() {
  if [[ "$2" == "ok" ]]; then echo "PASS: $1"; else echo "FAIL: $1"; FAILS=$((FAILS + 1)); fi
}
has() { [[ "$1" == *"$2"* ]] && echo ok || echo no; }
lacks() { [[ "$1" != *"$2"* ]] && echo ok || echo no; }

# Each case runs in a clean subshell with only the env it sets.
run_case() {
  env -i PATH="${PATH}" HOME="${HOME}" TMPDIR="${WORK}" bash -c "
    set -euo pipefail
    for lib in awlMacSigningLog resolveAwlMacSigningMode awlMacTempKeychain \
      notarizeAwlMacArtifact codesignAwlMacApp; do source '${DIR}'/\$lib.sh; done
    $1" 2>&1
}

out="$(run_case 'APPLE_APP_SPECIFIC_PASSWORD=s3cr3t-pw; awl_format_cmd notarytool --password s3cr3t-pw')"
check "mask hides app-specific password" "$(lacks "${out}" "s3cr3t-pw")"
check "mask shows ***" "$(has "${out}" "--password ***")"

out="$(run_case "AWL_SIGN_DRY_RUN=1; awl_release_run touch '${WORK}/should-not-exist'")"
check "dry-run release step is printed" "$(has "${out}" "[dry-run] would run: touch")"
check "dry-run release step is not executed" "$([[ ! -e "${WORK}/should-not-exist" ]] && echo ok || echo no)"

out="$(run_case "AWL_SIGN_DRY_RUN=1; awl_run touch '${WORK}/adhoc-ran'")"
check "awl_run executes even in dry-run" "$([[ -e "${WORK}/adhoc-ran" ]] && echo ok || echo no)"

out="$(run_case 'resolve_awl_mac_signing_mode auto; echo "MODE=${AWL_SIGN_MODE}"')"
check "no creds -> ad-hoc fallback" "$(has "${out}" "MODE=adhoc-legacy")"
check "fallback logs a clear line" "$(has "${out}" "falling back to ad-hoc signing")"

out="$(run_case 'resolve_awl_mac_signing_mode developer-id; echo MODE' || true)"
check "developer-id without creds fails" "$(lacks "${out}" "MODE")"

out="$(run_case 'DEVELOPER_ID_APPLICATION="Developer ID Application: T (ABCDE12345)"; resolve_awl_mac_signing_mode auto; echo MODE' || true)"
check "identity without notary creds fails" "$(has "${out}" "Refusing to ship")"

touch "${WORK}/AuthKey_TEST.p8"
out="$(run_case "DEVELOPER_ID_APPLICATION='Developer ID Application: T (ABCDE12345)'; APPLE_ASC_KEY_ID=KEYID98765; APPLE_ASC_ISSUER_ID=issuer-uuid-1; APPLE_ASC_KEY_PATH='${WORK}/AuthKey_TEST.p8'; resolve_awl_mac_signing_mode auto; echo MODE=\${AWL_SIGN_MODE}/\${AWL_NOTARY_AUTH}; AWL_SIGN_DRY_RUN=1; awl_notarize /tmp/x.zip")"
check "identity + ASC key -> developer-id" "$(has "${out}" "MODE=developer-id/asc-api-key")"
check "ASC key id masked" "$(lacks "${out}" "KEYID98765")"
check "ASC issuer masked" "$(lacks "${out}" "issuer-uuid-1")"

out="$(run_case "AWL_SIGN_DRY_RUN=1; DEVELOPER_ID_P12_PATH=/x/cert.p12; DEVELOPER_ID_P12_PASSWORD=p12-pass-xyz; resolve_awl_mac_signing_mode auto; awl_keychain_setup; awl_keychain_cleanup; echo ID=\${AWL_SIGN_IDENTITY}")"
check "dry-run uses placeholder identity" "$(has "${out}" "ID=<DEVELOPER_ID_APPLICATION>")"
check "dry-run prints p12 import" "$(has "${out}" "would run: security import /x/cert.p12")"
check "p12 password masked" "$(lacks "${out}" "p12-pass-xyz")"
check "temp keychain password masked" "$(has "${out}" "create-keychain -p *** ")"

if [[ "$(uname -s)" == "Darwin" ]]; then
  APP="${WORK}/T.app"
  mkdir -p "${APP}/Contents/MacOS" "${APP}/Contents/Frameworks/F.framework/Versions/A/Libraries"
  printf '<plist version="1.0"><dict><key>CFBundleExecutable</key><string>T</string></dict></plist>' >"${APP}/Contents/Info.plist"
  cp /usr/bin/true "${APP}/Contents/MacOS/T"
  cp /usr/lib/libobjc.A.dylib "${APP}/Contents/Frameworks/F.framework/Versions/A/Libraries/l.dylib" 2>/dev/null \
    || touch "${APP}/Contents/Frameworks/F.framework/Versions/A/Libraries/l.dylib"
  out="$(run_case "rec() { echo \"SIGN \${@: -1}\"; }; awl_codesign_app '${APP}' - /e.plist rec")"
  order="$(echo "${out}" | grep '^SIGN' | sed "s#${APP}#APP#")"
  expected=$'SIGN APP/Contents/Frameworks/F.framework/Versions/A/Libraries/l.dylib\nSIGN APP/Contents/Frameworks/F.framework\nSIGN APP'
  check "inside-out order (dylib, framework, app)" "$([[ "${order}" == "${expected}" ]] && echo ok || echo no)"
  lib_line="$(run_case "rec() { echo \"\$*\"; }; awl_codesign_app '${APP}' - /e.plist rec" | grep 'l.dylib$')"
  check "libraries signed ad-hoc with runtime, no entitlements" "$(lacks "${lib_line}" "--entitlements")"
  check "ad-hoc uses --timestamp=none" "$(has "${lib_line}" "--options runtime --timestamp=none")"
  app_line="$(run_case "rec() { echo \"\$*\"; }; awl_codesign_app '${APP}' - /e.plist rec" | grep "T.app$")"
  check "app signed with entitlements" "$(has "${app_line}" "--entitlements /e.plist")"
fi

if [[ "${FAILS}" -gt 0 ]]; then
  echo "${FAILS} check(s) FAILED"
  exit 1
fi
echo "ALL PASSED"
