#!/usr/bin/env bash
# Self-test for the AWL Mac signing helpers: secret masking, dry-run gating,
# mode resolution and inside-out order. Runs no codesign/notary/keychain command.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAILS=0
WORK="$(mktemp -d "${TMPDIR:-/tmp}/awl-sign-test.XXXXXX")"
trap 'rm -rf "${WORK}"' EXIT
touch "${WORK}/AuthKey_TEST.p8" "${WORK}/cert.p12"

check() {
  if [[ "$2" == "ok" ]]; then echo "PASS: $1"; else echo "FAIL: $1"; FAILS=$((FAILS + 1)); fi
}
has() { [[ "$1" == *"$2"* ]] && echo ok || echo no; }
lacks() { [[ "$1" != *"$2"* ]] && echo ok || echo no; }

run_case() {
  env -i PATH="${PATH}" HOME="${2:-${HOME}}" TMPDIR="${WORK}" bash -c "
    set -euo pipefail
    for lib in awlMacSigningLog awlMacLoadSigningEnv resolveAwlMacSigningMode \
      awlMacTempKeychain notarizeAwlMacArtifact codesignAwlMacApp; do
      source '${DIR}'/\$lib.sh
    done
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

EMPTY_HOME="${WORK}/empty-home"; mkdir -p "${EMPTY_HOME}"
out="$(run_case 'resolve_awl_mac_signing_mode auto; echo "MODE=${AWL_SIGN_MODE}"' "${EMPTY_HOME}")"
check "no creds -> ad-hoc fallback" "$(has "${out}" "MODE=adhoc-legacy")"
out="$(run_case 'resolve_awl_mac_signing_mode developer-id; echo MODE' "${EMPTY_HOME}" || true)"
check "developer-id without creds fails" "$(lacks "${out}" "MODE")"

ENV_HOME="${WORK}/sign-env-home"; mkdir -p "${ENV_HOME}/.agentwitch-signing"
printf '%s\n' 'DEVELOPER_ID_APPLICATION=' >"${ENV_HOME}/.agentwitch-signing/signing.env"
out="$(run_case 'resolve_awl_mac_signing_mode auto; echo MODE' "${ENV_HOME}" || true)"
check "empty signing.env refuses ad-hoc fallback" "$(has "${out}" "Refusing ad-hoc fallback")"

out="$(run_case 'DEVELOPER_ID_APPLICATION="Developer ID Application: T (ABCDE12345)"; resolve_awl_mac_signing_mode auto; echo MODE' "${EMPTY_HOME}" || true)"
check "identity without notary creds fails" "$(has "${out}" "Refusing to ship")"

out="$(run_case "DEVELOPER_ID_APPLICATION='Developer ID Application: T (ABCDE12345)'; DEVELOPER_ID_P12_PATH='${WORK}/cert.p12'; DEVELOPER_ID_P12_PASSWORD=p12-pass; APPLE_ASC_KEY_ID=KEYID98765; APPLE_ASC_ISSUER_ID=issuer-uuid-1; APPLE_ASC_KEY_PATH='${WORK}/AuthKey_TEST.p8'; resolve_awl_mac_signing_mode auto; echo MODE=\${AWL_SIGN_MODE}/\${AWL_NOTARY_AUTH}; AWL_SIGN_DRY_RUN=1; awl_notarize /tmp/x.zip" "${EMPTY_HOME}")"
check "identity + ASC key -> developer-id" "$(has "${out}" "MODE=developer-id/asc-api-key")"
check "ASC key id masked" "$(lacks "${out}" "KEYID98765")"

PAREN_HOME="${WORK}/paren-home"; mkdir -p "${PAREN_HOME}/.agentwitch-signing"
printf '%s\n' \
  'DEVELOPER_ID_APPLICATION=Developer ID Application: T (ABCDE12345)' \
  "DEVELOPER_ID_P12_PATH=${WORK}/cert.p12" \
  'DEVELOPER_ID_P12_PASSWORD=p12-pass' \
  'APPLE_ASC_KEY_ID=KEYID98765' \
  'APPLE_ASC_ISSUER_ID=issuer-uuid-1' \
  "APPLE_ASC_KEY_PATH=${WORK}/AuthKey_TEST.p8" \
  >"${PAREN_HOME}/.agentwitch-signing/signing.env"
out="$(run_case 'resolve_awl_mac_signing_mode auto; echo "MODE=${AWL_SIGN_MODE}"; echo "ID=${AWL_SIGN_IDENTITY}"' "${PAREN_HOME}")"
check "unquoted identity in signing.env loads" "$(has "${out}" "MODE=developer-id")"
check "unquoted identity value preserved" "$(has "${out}" "ID=Developer ID Application: T (ABCDE12345)")"

out="$(run_case "AWL_SIGN_DRY_RUN=1; DEVELOPER_ID_P12_PATH=/x/cert.p12; DEVELOPER_ID_P12_PASSWORD=p12-pass-xyz; resolve_awl_mac_signing_mode auto; awl_keychain_setup; awl_keychain_cleanup; echo ID=\${AWL_SIGN_IDENTITY}" "${EMPTY_HOME}")"
check "dry-run prints p12 import" "$(has "${out}" "would run: security import /x/cert.p12")"
check "dry-run prints Apple Root CA import" "$(has "${out}" "AppleIncRootCertificate.cer")"
check "dry-run prints Apple Root CA G2 import" "$(has "${out}" "AppleRootCA-G2.cer")"
check "dry-run prints Developer ID G1 CA import" "$(has "${out}" "DeveloperIDCA.cer")"
check "dry-run prints Developer ID G2 CA import" "$(has "${out}" "DeveloperIDG2CA.cer")"
check "dry-run prints search-list with System.keychain" "$(has "${out}" "/Library/Keychains/System.keychain")"
check "dry-run prints search-list -s" "$(has "${out}" "list-keychains -d user -s")"
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
  check "libraries signed without entitlements" "$(lacks "${lib_line}" "--entitlements")"
  check "ad-hoc uses --timestamp=none" "$(has "${lib_line}" "--options runtime --timestamp=none")"
  app_line="$(run_case "rec() { echo \"\$*\"; }; awl_codesign_app '${APP}' - /e.plist rec" | grep "T.app$")"
  check "app signed with entitlements" "$(has "${app_line}" "--entitlements /e.plist")"
fi

# Search-list composition + restore (Darwin only; mutates then restores the
# real user search list — use the real HOME so list-keychains is non-empty).
if [[ "$(uname -s)" == "Darwin" ]]; then
  out="$(
    env -i PATH="${PATH}" HOME="${HOME}" TMPDIR="${WORK}" bash -c '
      set -euo pipefail
      source "'"${DIR}"'/awlMacSigningLog.sh"
      source "'"${DIR}"'/awlMacTempKeychain.sh"
      AWL_SIGN_DRY_RUN=0
      AWL_SIGN_IDENTITY="Developer ID Application: T (ABCDE12345)"
      AWL_TEMP_KEYCHAIN_DIR="$(mktemp -d "${TMPDIR%/}/awl-sign.XXXXXX")"
      AWL_TEMP_KEYCHAIN="${AWL_TEMP_KEYCHAIN_DIR}/awl-signing.keychain-db"
      AWL_TEMP_KEYCHAIN_PASSWORD="test-temp-kc-pass"
      trap awl_keychain_cleanup EXIT
      BEFORE="$(security list-keychains -d user | tr "\n" "|")"
      echo "LIST_BEFORE=${BEFORE}"
      security create-keychain -p "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}" >/dev/null
      security set-keychain-settings -lut 3600 "${AWL_TEMP_KEYCHAIN}" >/dev/null
      security unlock-keychain -p "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}" >/dev/null
      awl_keychain_import_apple_cas
      awl_keychain_add_to_search_list
      AFTER="$(security list-keychains -d user | tr "\n" "|")"
      echo "LIST_AFTER=${AFTER}"
      # awl_fail uses exit (not return); run preflight in a subshell.
      set +e
      ( awl_keychain_preflight_identity ) >"${TMPDIR}/preflight.out" 2>"${TMPDIR}/preflight.err"
      pf_rc=$?
      set -e
      if [[ "${pf_rc}" -eq 0 ]]; then
        echo "PREFLIGHT=ok-unexpected"
      else
        echo "PREFLIGHT=fail"
        if grep -q "0 valid codesigning identities" "${TMPDIR}/preflight.err" "${TMPDIR}/preflight.out"; then
          echo "PREFLIGHT_MSG=ok"
        else
          echo "PREFLIGHT_MSG=bad"
          cat "${TMPDIR}/preflight.err" "${TMPDIR}/preflight.out" >&2 || true
        fi
      fi
      awl_keychain_cleanup
      trap - EXIT
      RESTORED="$(security list-keychains -d user | tr "\n" "|")"
      echo "LIST_RESTORED=${RESTORED}"
      if [[ -f "${AWL_TEMP_KEYCHAIN:-/nonexistent}" ]]; then echo "KC_GONE=no"; else echo "KC_GONE=yes"; fi
      if [[ "${RESTORED}" == "${BEFORE}" ]]; then echo "RESTORE_MATCH=yes"; else echo "RESTORE_MATCH=no"; fi
    ' 2>&1
  )" || out="${out:-}"$'\n'"INNER_FAILED=1"
  check "search list includes System.keychain after compose" "$(has "${out}" "/Library/Keychains/System.keychain")"
  check "search list includes temp keychain after compose" "$(has "${out}" "awl-signing.keychain")"
  check "preflight fails with 0 valid identities (no p12)" "$(has "${out}" "PREFLIGHT=fail")"
  check "preflight message mentions 0 valid identities" "$(has "${out}" "PREFLIGHT_MSG=ok")"
  check "temp keychain deleted on cleanup" "$(has "${out}" "KC_GONE=yes")"
  check "search list restored exactly" "$(has "${out}" "RESTORE_MATCH=yes")"
  restored_line="$(printf "%s\n" "${out}" | grep "^LIST_RESTORED=" || true)"
  check "restored list has no awl-signing keychain" "$(lacks "${restored_line}" "awl-signing")"
fi

if [[ "${FAILS}" -gt 0 ]]; then
  echo "${FAILS} check(s) FAILED"
  exit 1
fi
echo "ALL PASSED"
