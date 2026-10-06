#!/usr/bin/env bash
# Temporary signing keychain for a Developer ID .p12 (sourced, not run).
# Never touches the login keychain. Created, unlocked, prepended to the user
# search list for the build; EXIT trap restores the list and deletes the
# keychain. Imports Apple's Developer ID G2 intermediate so the chain validates.

AWL_CODESIGN_KEYCHAIN_ARGS=()
AWL_TEMP_KEYCHAIN=""
AWL_TEMP_KEYCHAIN_DIR=""
AWL_SAVED_SEARCH_LIST=()
AWL_DEVELOPER_ID_G2_URL="https://www.apple.com/certificateauthority/DeveloperIDG2CA.cer"

awl_keychain_import_g2() {
  local g2_cer="${AWL_TEMP_KEYCHAIN_DIR}/DeveloperIDG2CA.cer"
  local cached="${HOME}/.agentwitch-signing/DeveloperIDG2CA.cer"
  if [[ -f "${cached}" ]]; then
    awl_release_run cp "${cached}" "${g2_cer}"
  else
    awl_release_run curl -fsSL -o "${g2_cer}" "${AWL_DEVELOPER_ID_G2_URL}"
  fi
  awl_release_run security import "${g2_cer}" -k "${AWL_TEMP_KEYCHAIN}" -T /usr/bin/codesign
  awl_log "Imported Developer ID Certification Authority G2 into temp keychain."
}

awl_keychain_setup() {
  { set +x; } 2>/dev/null
  local p12_path="${DEVELOPER_ID_P12_PATH:-}"
  if [[ -z "${p12_path}" ]]; then
    if [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
      p12_path="<DEVELOPER_ID_P12_PATH>"
    else
      awl_fail "DEVELOPER_ID_P12_PATH is required (temp keychain only; login keychain is never used)."
    fi
  fi
  AWL_TEMP_KEYCHAIN_DIR="$(mktemp -d "${TMPDIR%/}/awl-sign.XXXXXX")"
  AWL_TEMP_KEYCHAIN="${AWL_TEMP_KEYCHAIN_DIR}/awl-signing.keychain-db"
  AWL_TEMP_KEYCHAIN_PASSWORD="$(od -An -tx1 -N24 /dev/urandom | tr -d " \n")"
  export AWL_TEMP_KEYCHAIN_PASSWORD
  awl_release_run security create-keychain -p "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  awl_release_run security set-keychain-settings -lut 3600 "${AWL_TEMP_KEYCHAIN}"
  awl_release_run security unlock-keychain -p "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  awl_keychain_import_g2
  awl_release_run_quiet security import "${p12_path}" -k "${AWL_TEMP_KEYCHAIN}" \
    -f pkcs12 -P "${DEVELOPER_ID_P12_PASSWORD:-<DEVELOPER_ID_P12_PASSWORD>}" -T /usr/bin/codesign
  awl_release_run_quiet security set-key-partition-list -S apple-tool:,apple:,codesign: -s \
    -k "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  awl_keychain_add_to_search_list
  AWL_CODESIGN_KEYCHAIN_ARGS=(--keychain "${AWL_TEMP_KEYCHAIN}")
  awl_keychain_assert_identity
}

awl_keychain_add_to_search_list() {
  local line
  if [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
    awl_release_run security list-keychains -d user -s "${AWL_TEMP_KEYCHAIN}" \
      "<saved-user-keychains...>"
    return 0
  fi
  AWL_SAVED_SEARCH_LIST=()
  while IFS= read -r line; do
    line="${line//\"/}"
    line="${line#"${line%%[![:space:]]*}"}"
    [[ -n "${line}" ]] && AWL_SAVED_SEARCH_LIST+=("${line}")
  done < <(security list-keychains -d user)
  awl_release_run security list-keychains -d user -s "${AWL_TEMP_KEYCHAIN}" \
    ${AWL_SAVED_SEARCH_LIST[@]+"${AWL_SAVED_SEARCH_LIST[@]}"}
}

# Prints only whether the identity name is present (no hashes, no key material).
awl_keychain_assert_identity() {
  [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]] && return 0
  if security find-identity -v -p codesigning "${AWL_TEMP_KEYCHAIN}" 2>/dev/null \
    | grep -F -q "\"${AWL_SIGN_IDENTITY}\""; then
    awl_log "Identity '${AWL_SIGN_IDENTITY}' present in temp keychain."
  else
    awl_fail "Identity '${AWL_SIGN_IDENTITY}' not found in the imported .p12 (check DEVELOPER_ID_APPLICATION matches the certificate name)."
  fi
}

awl_keychain_cleanup() {
  { set +x; } 2>/dev/null
  if [[ ${#AWL_SAVED_SEARCH_LIST[@]} -gt 0 ]]; then
    security list-keychains -d user -s "${AWL_SAVED_SEARCH_LIST[@]}" || true
    AWL_SAVED_SEARCH_LIST=()
  fi
  if [[ -n "${AWL_TEMP_KEYCHAIN}" && -f "${AWL_TEMP_KEYCHAIN}" ]]; then
    security delete-keychain "${AWL_TEMP_KEYCHAIN}" || true
    awl_log "Deleted temporary signing keychain."
  fi
  [[ -n "${AWL_TEMP_KEYCHAIN_DIR}" ]] && rm -rf "${AWL_TEMP_KEYCHAIN_DIR}"
  AWL_TEMP_KEYCHAIN=""
  unset AWL_TEMP_KEYCHAIN_PASSWORD
}
