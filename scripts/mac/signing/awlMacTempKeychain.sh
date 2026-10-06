#!/usr/bin/env bash
# Temporary signing keychain for a Developer ID .p12 (sourced, not run).
# Never touches the login keychain. Created, unlocked, composed into the user
# search list for the build; EXIT trap restores the list and deletes the
# keychain. Imports Apple public roots + Developer ID intermediates into the
# TEMP keychain only so codesign can build the chain without relying on
# SystemRootCertificates being in the user search list.

AWL_CODESIGN_KEYCHAIN_ARGS=()
AWL_TEMP_KEYCHAIN=""
AWL_TEMP_KEYCHAIN_DIR=""
AWL_SAVED_SEARCH_LIST=()
AWL_SYSTEM_KEYCHAIN="/Library/Keychains/System.keychain"

# Bundled under scripts/mac/signing/certs/ (public Apple CA CER files only).
# Pin by sha256 so a bad download or local edit fails loudly.
AWL_SIGNING_CERTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/certs"
AWL_APPLE_CA_CERTS=(
  "AppleIncRootCertificate.cer:b0b1730ecbc7ff4505142c49f1295e6eda6bcaed7e2c68c5be91b5a11001f024"
  "AppleRootCA-G2.cer:c2b9b042dd57830e7d117dac55ac8ae19407d38e41d88f3215bc3a890444a050"
  "DeveloperIDCA.cer:7afc9d01a62f03a2de9637936d4afe68090d2de18d03f29c88cfb0b1ba63587f"
  "DeveloperIDG2CA.cer:f16cd3c54c7f83cea4bf1a3e6a0819c8aaa8e4a1528fd144715f350643d2df3a"
)

awl_keychain_verify_pinned_cert() {
  local name="$1" expected="$2" path="${AWL_SIGNING_CERTS_DIR}/${1}"
  local actual
  [[ -f "${path}" ]] || awl_fail "Missing bundled Apple CA cert: ${path}"
  actual="$(shasum -a 256 "${path}" | awk '{print $1}')"
  if [[ "${actual}" != "${expected}" ]]; then
    awl_fail "SHA-256 mismatch for ${name}: expected ${expected}, got ${actual}"
  fi
}

# Import Apple Root CA, Apple Root CA - G2, and Developer ID intermediates
# (G1 + G2) into the TEMP keychain only. No trust settings on login/system.
awl_keychain_import_apple_cas() {
  local entry name hash path
  for entry in "${AWL_APPLE_CA_CERTS[@]}"; do
    name="${entry%%:*}"
    hash="${entry##*:}"
    awl_keychain_verify_pinned_cert "${name}" "${hash}"
    path="${AWL_SIGNING_CERTS_DIR}/${name}"
    awl_release_run security import "${path}" -k "${AWL_TEMP_KEYCHAIN}" -T /usr/bin/codesign
  done
  awl_log "Imported Apple Root CA, Apple Root CA - G2, and Developer ID CA (G1+G2) into temp keychain."
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
  awl_keychain_import_apple_cas
  awl_release_run_quiet security import "${p12_path}" -k "${AWL_TEMP_KEYCHAIN}" \
    -f pkcs12 -P "${DEVELOPER_ID_P12_PASSWORD:-<DEVELOPER_ID_P12_PASSWORD>}" -T /usr/bin/codesign
  awl_release_run_quiet security set-key-partition-list -S apple-tool:,apple:,codesign: -s \
    -k "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  awl_keychain_add_to_search_list
  AWL_CODESIGN_KEYCHAIN_ARGS=(--keychain "${AWL_TEMP_KEYCHAIN}")
  awl_keychain_preflight_identity
}

# User search list = temp + existing user keychains (unchanged) + System.keychain.
# Never drops existing entries. EXIT trap restores AWL_SAVED_SEARCH_LIST exactly.
awl_keychain_add_to_search_list() {
  local line composed=() have_system=0
  if [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
    awl_release_run security list-keychains -d user -s "${AWL_TEMP_KEYCHAIN}" \
      "<saved-user-keychains...>" "${AWL_SYSTEM_KEYCHAIN}"
    return 0
  fi
  AWL_SAVED_SEARCH_LIST=()
  while IFS= read -r line; do
    line="${line//\"/}"
    line="${line#"${line%%[![:space:]]*}"}"
    [[ -n "${line}" ]] && AWL_SAVED_SEARCH_LIST+=("${line}")
  done < <(security list-keychains -d user)
  if [[ ${#AWL_SAVED_SEARCH_LIST[@]} -eq 0 ]]; then
    awl_fail "Refusing to rewrite user keychain search list: security list-keychains -d user returned empty (would drop login.keychain). Run the signed build from a normal GUI login session."
  fi
  composed=("${AWL_TEMP_KEYCHAIN}")
  for line in "${AWL_SAVED_SEARCH_LIST[@]}"; do
    composed+=("${line}")
    if [[ "${line}" == "${AWL_SYSTEM_KEYCHAIN}" ]]; then
      have_system=1
    fi
  done
  if [[ "${have_system}" -eq 0 ]]; then
    composed+=("${AWL_SYSTEM_KEYCHAIN}")
  fi
  awl_release_run security list-keychains -d user -s "${composed[@]}"
  awl_log "User keychain search list: temp + ${#AWL_SAVED_SEARCH_LIST[@]} saved + System.keychain."

}

# Preflight before codesign/notary: require at least one *valid* codesigning
# identity matching AWL_SIGN_IDENTITY in the temp keychain. Fails loudly on
# "unable to build chain to self-signed root" class failures (0 valid).
awl_keychain_preflight_identity() {
  local listing valid_count=0
  [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]] && return 0
  listing="$(security find-identity -v -p codesigning "${AWL_TEMP_KEYCHAIN}" 2>/dev/null || true)"
  if printf '%s\n' "${listing}" | grep -F -q "\"${AWL_SIGN_IDENTITY}\""; then
    valid_count="$(printf '%s\n' "${listing}" | grep -c -F "\"${AWL_SIGN_IDENTITY}\"" || true)"
  fi
  if [[ "${valid_count}" -gt 0 ]]; then
    awl_log "Preflight OK: identity '${AWL_SIGN_IDENTITY}' valid in temp keychain (${valid_count})."
    return 0
  fi
  awl_fail "Preflight: 0 valid codesigning identities for '${AWL_SIGN_IDENTITY}' in the temp keychain. Usually the Apple Root / Developer ID intermediate chain is missing or a trust override is blocking it (codesign: unable to build chain to self-signed root / errSecInternalComponent). Ensure scripts/mac/signing/certs/ Apple roots + Developer ID CA are imported into the temp keychain, and that the user search list includes the temp keychain plus /Library/Keychains/System.keychain. Do not add trust settings to login/system for these certs."
}

# Back-compat alias used by older call sites / docs.
awl_keychain_assert_identity() {
  awl_keychain_preflight_identity
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
