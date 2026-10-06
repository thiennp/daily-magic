#!/usr/bin/env bash
# Temporary signing keychain for a Developer ID .p12 (sourced, not run).
# Never touches the login keychain. The keychain is deleted on exit
# (awl_keychain_cleanup is registered as an EXIT trap by the pipeline).
#
# Optional: AWL_SIGN_ADD_TO_SEARCH_LIST=1 temporarily prepends the temp keychain
# to the *user search list* (restored on cleanup) for hosts where codesign
# cannot build the cert chain from --keychain alone. Off by default.

AWL_CODESIGN_KEYCHAIN_ARGS=()
AWL_TEMP_KEYCHAIN=""
AWL_TEMP_KEYCHAIN_DIR=""
AWL_SAVED_SEARCH_LIST=()

awl_keychain_setup() {
  { set +x; } 2>/dev/null
  local p12_path="${DEVELOPER_ID_P12_PATH:-}"
  if [[ -z "${p12_path}" && "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
    p12_path="<DEVELOPER_ID_P12_PATH>"
  elif [[ -z "${p12_path}" ]]; then
    awl_log "No DEVELOPER_ID_P12_PATH: codesign will look up '${AWL_SIGN_IDENTITY}' in the existing keychain search list."
    return 0
  fi
  AWL_TEMP_KEYCHAIN_DIR="$(mktemp -d "${TMPDIR%/}/awl-sign.XXXXXX")"
  AWL_TEMP_KEYCHAIN="${AWL_TEMP_KEYCHAIN_DIR}/awl-signing.keychain-db"
  AWL_TEMP_KEYCHAIN_PASSWORD="$(od -An -tx1 -N24 /dev/urandom | tr -d " \n")"
  export AWL_TEMP_KEYCHAIN_PASSWORD
  awl_release_run security create-keychain -p "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  awl_release_run security set-keychain-settings -lut 3600 "${AWL_TEMP_KEYCHAIN}"
  awl_release_run security unlock-keychain -p "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  awl_release_run_quiet security import "${p12_path}" -k "${AWL_TEMP_KEYCHAIN}" \
    -f pkcs12 -P "${DEVELOPER_ID_P12_PASSWORD:-<DEVELOPER_ID_P12_PASSWORD>}" -T /usr/bin/codesign
  awl_release_run_quiet security set-key-partition-list -S apple-tool:,apple:,codesign: -s \
    -k "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  if [[ "${AWL_SIGN_ADD_TO_SEARCH_LIST:-0}" == "1" ]]; then
    awl_keychain_add_to_search_list
  fi
  AWL_CODESIGN_KEYCHAIN_ARGS=(--keychain "${AWL_TEMP_KEYCHAIN}")
  awl_keychain_assert_identity
}

awl_keychain_add_to_search_list() {
  local line
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
