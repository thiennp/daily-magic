#!/usr/bin/env bash
# Temporary signing keychain for a Developer ID .p12 (sourced, not run).
# Never touches the login keychain. Created, unlocked, composed into the user
# search list for the build; EXIT trap restores the list and deletes the
# keychain. Imports Apple public roots + Developer ID intermediates into the
# TEMP keychain too (harmless; older macOS uses them). codesign on macOS 26
# ignores intermediates that live only in a temp keychain, so the preflight
# test-signs a throwaway binary and, if the chain cannot be built, fails with
# the one-time command to add the PUBLIC intermediate to a persistent keychain.

AWL_CODESIGN_KEYCHAIN_ARGS=()
AWL_TEMP_KEYCHAIN=""
AWL_TEMP_KEYCHAIN_DIR=""
AWL_SAVED_SEARCH_LIST=()
AWL_SIGN_IDENTITY_SHA1=""
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
  awl_keychain_import_p12 "${p12_path}"
  awl_keychain_add_to_search_list
  AWL_CODESIGN_KEYCHAIN_ARGS=(--keychain "${AWL_TEMP_KEYCHAIN}")
  awl_keychain_preflight_identity
}

# Import the .p12 into the TEMP keychain and prove the identity (cert + private
# key) landed there. `security import` prints nothing for a .p12 on current
# macOS even on success, so stdout is not evidence either way: look it up.
# Sets AWL_SIGN_IDENTITY_SHA1 (used for codesign so a same-named identity in
# another keychain can never be picked).
awl_keychain_import_p12() {
  { set +x; } 2>/dev/null
  local p12_path="$1" listing
  AWL_SIGN_IDENTITY_SHA1=""
  awl_release_run_quiet security import "${p12_path}" -k "${AWL_TEMP_KEYCHAIN}" \
    -f pkcs12 -P "${DEVELOPER_ID_P12_PASSWORD:-<DEVELOPER_ID_P12_PASSWORD>}" \
    -T /usr/bin/codesign -T /usr/bin/security
  awl_release_run_quiet security set-key-partition-list -S apple-tool:,apple:,codesign: -s \
    -k "${AWL_TEMP_KEYCHAIN_PASSWORD}" "${AWL_TEMP_KEYCHAIN}"
  [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]] && return 0
  # No -v: list identities (cert with matching private key) even if not yet trusted.
  listing="$(security find-identity -p codesigning "${AWL_TEMP_KEYCHAIN}" 2>/dev/null || true)"
  AWL_SIGN_IDENTITY_SHA1="$(printf '%s\n' "${listing}" \
    | awk -v id="\"${AWL_SIGN_IDENTITY}\"" 'index($0, id) && $2 ~ /^[0-9A-F]{40}$/ { print $2; exit }')"
  if [[ -z "${AWL_SIGN_IDENTITY_SHA1}" ]]; then
    awl_fail "No codesigning identity '${AWL_SIGN_IDENTITY}' (certificate + private key) in the temp keychain after importing ${p12_path}. Check DEVELOPER_ID_P12_PASSWORD, that the .p12 contains the private key, and that it uses legacy PKCS#12 encryption (OpenSSL 3: re-export with 'openssl pkcs12 -export -legacy')."
  fi
  awl_log "Imported identity into temp keychain (SHA-1 ${AWL_SIGN_IDENTITY_SHA1})."
}

# Identity argument for codesign: the temp-keychain SHA-1 when known, else the name.
awl_keychain_codesign_identity() {
  printf '%s' "${AWL_SIGN_IDENTITY_SHA1:-${AWL_SIGN_IDENTITY}}"
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

# Bundled Developer ID intermediate that issued the leaf (by issuer DN).
# $1 = issuer line from openssl/LibreSSL (either "OU=G2," or "/OU=G2/" style).
awl_keychain_required_intermediate() {
  if [[ "$1" =~ OU[[:space:]]*=[[:space:]]*G2([,/]|$) ]]; then
    echo "DeveloperIDG2CA.cer"
  else
    echo "DeveloperIDCA.cer"
  fi
}

# Issuer DN of the signing leaf in the temp keychain.
awl_keychain_leaf_issuer() {
  security find-certificate -c "${AWL_SIGN_IDENTITY}" -p "${AWL_TEMP_KEYCHAIN}" 2>/dev/null \
    | /usr/bin/openssl x509 -noout -issuer 2>/dev/null || true
}

# True when a bundled CA cert (by SHA-1 of its DER) is in a PERSISTENT keychain
# that codesign's chain builder searches: the saved user keychains (login),
# System.keychain and SystemRootCertificates. Read-only.
# $1 = cert file name under certs/, $2.. = keychains (default: saved list + system).
awl_keychain_intermediate_persisted() {
  local name="$1" sha1 kc listing
  shift
  local keychains=("$@")
  if [[ ${#keychains[@]} -eq 0 ]]; then
    keychains=(${AWL_SAVED_SEARCH_LIST[@]+"${AWL_SAVED_SEARCH_LIST[@]}"}
      "${AWL_SYSTEM_KEYCHAIN}" /System/Library/Keychains/SystemRootCertificates.keychain)
  fi
  sha1="$(shasum -a 1 "${AWL_SIGNING_CERTS_DIR}/${name}" | awk '{print toupper($1)}')"
  for kc in "${keychains[@]}"; do
    [[ "${kc}" == "${AWL_TEMP_KEYCHAIN}" ]] && continue
    # Capture first: `security ... | grep -q` trips pipefail via SIGPIPE.
    listing="$(security find-certificate -a -Z "${kc}" 2>/dev/null || true)"
    if [[ "${listing}" == *"SHA-1 hash: ${sha1}"* ]]; then
      return 0
    fi
  done
  return 1
}

# Signs $1 (a throwaway copy of /usr/bin/true) exactly like the app will be
# signed, minus the network timestamp. 60s cap so a keychain prompt cannot hang.
awl_keychain_probe_sign() {
  perl -e 'alarm 60; exec @ARGV' codesign --force --timestamp=none --options runtime \
    --sign "$(awl_keychain_codesign_identity)" --keychain "${AWL_TEMP_KEYCHAIN}" "$1"
}

# Preflight before signing anything real: a test signature of a throwaway
# binary through the same identity/keychain. `security find-identity -v` is not
# enough: it can report the identity valid (trustd may fetch/cache the
# intermediate) while codesign itself, which builds the chain without network
# and on macOS 26 ignores intermediates that live only in the temp keychain,
# fails with "unable to build chain to self-signed root" + errSecInternalComponent.
awl_keychain_preflight_identity() {
  local probe err issuer needed team
  [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]] && return 0
  if [[ -z "${AWL_SIGN_IDENTITY_SHA1:-}" ]]; then
    awl_fail "Preflight: no codesigning identity '${AWL_SIGN_IDENTITY}' in the temp keychain (0 identities). Import the Developer ID .p12 (cert + private key) first."
  fi
  probe="${AWL_TEMP_KEYCHAIN_DIR}/awl-preflight-probe"
  err="${AWL_TEMP_KEYCHAIN_DIR}/awl-preflight-probe.err"
  cp /usr/bin/true "${probe}"
  if awl_keychain_probe_sign "${probe}" >/dev/null 2>"${err}"; then
    team="$(codesign -dv --verbose=2 "${probe}" 2>&1 | sed -n 's/^TeamIdentifier=//p')"
    rm -f "${probe}" "${err}"
    awl_log "Preflight OK: test signature with '${AWL_SIGN_IDENTITY}' from the temp keychain (TeamIdentifier=${team:-?})."
    return 0
  fi
  issuer="$(awl_keychain_leaf_issuer)"
  needed="$(awl_keychain_required_intermediate "${issuer}")"
  sed 's/^/[awl-sign]   codesign: /' "${err}" >&2 || true
  rm -f "${probe}" "${err}"
  if ! awl_keychain_intermediate_persisted "${needed}"; then
    awl_fail "Preflight: codesign cannot build the chain for '${AWL_SIGN_IDENTITY}' (issuer: ${issuer:-unknown}). The Developer ID intermediate ${needed} is only in the temp keychain, and codesign on current macOS does not use intermediates from a temporary keychain (unified log: 'Trust evaluate failure: [leaf MissingIntermediate]'). One-time fix (public Apple CA cert only, no private key, no trust setting): security add-certificates -k \"\$HOME/Library/Keychains/login.keychain-db\" \"${AWL_SIGNING_CERTS_DIR}/${needed}\"   then rerun the build."
  fi
  awl_fail "Preflight: test signature with '${AWL_SIGN_IDENTITY}' failed although ${needed} is installed persistently. Check trust overrides (security dump-trust-settings / -d) and the unified log: /usr/bin/log show --last 5m --predicate 'process == \"codesign\" OR process == \"trustd\"' | grep -E 'MissingIntermediate|Trust evaluate'"
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
  AWL_SIGN_IDENTITY_SHA1=""
  unset AWL_TEMP_KEYCHAIN_PASSWORD
}
