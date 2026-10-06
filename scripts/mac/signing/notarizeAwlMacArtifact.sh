#!/usr/bin/env bash
# notarytool submit --wait + stapler staple (sourced, not run).
# Auth precedence (see resolveAwlMacSigningMode.sh): keychain profile, then
# App Store Connect API key (.p8), then Apple ID + app-specific password.

awl_notary_auth_args() {
  { set +x; } 2>/dev/null
  AWL_NOTARY_ARGS=()
  case "${AWL_NOTARY_AUTH}" in
    keychain-profile)
      AWL_NOTARY_ARGS=(--keychain-profile "${NOTARYTOOL_KEYCHAIN_PROFILE}")
      if [[ -n "${NOTARYTOOL_KEYCHAIN:-}" ]]; then
        AWL_NOTARY_ARGS+=(--keychain "${NOTARYTOOL_KEYCHAIN}")
      fi
      ;;
    asc-api-key)
      AWL_NOTARY_ARGS=(--key "${APPLE_ASC_KEY_PATH:-<APPLE_ASC_KEY_PATH>}"
        --key-id "${APPLE_ASC_KEY_ID:-<APPLE_ASC_KEY_ID>}")
      if [[ -n "${APPLE_ASC_ISSUER_ID:-}" || "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
        AWL_NOTARY_ARGS+=(--issuer "${APPLE_ASC_ISSUER_ID:-<APPLE_ASC_ISSUER_ID>}")
      fi
      ;;
    apple-id)
      AWL_NOTARY_ARGS=(--apple-id "${APPLE_ID}" --team-id "${APPLE_TEAM_ID}"
        --password "${APPLE_APP_SPECIFIC_PASSWORD}")
      ;;
    *) awl_fail "No notary credentials (AWL_NOTARY_AUTH=${AWL_NOTARY_AUTH})." ;;
  esac
}

awl_json_field() {
  plutil -extract "$2" raw -o - - <<<"$1" 2>/dev/null || true
}

# awl_notarize <file.zip|file.dmg>
awl_notarize() {
  { set +x; } 2>/dev/null
  local artifact="$1" out status submission_id
  awl_notary_auth_args
  if [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
    awl_release_run xcrun notarytool submit "${artifact}" "${AWL_NOTARY_ARGS[@]}" \
      --wait --timeout "${AWL_NOTARY_TIMEOUT:-30m}" --output-format json
    return 0
  fi
  awl_log "\$ $(awl_format_cmd xcrun notarytool submit "${artifact}" "${AWL_NOTARY_ARGS[@]}" --wait --output-format json)"
  out="$(xcrun notarytool submit "${artifact}" "${AWL_NOTARY_ARGS[@]}" \
    --wait --timeout "${AWL_NOTARY_TIMEOUT:-30m}" --output-format json)" || true
  status="$(awl_json_field "${out}" status)"
  submission_id="$(awl_json_field "${out}" id)"
  awl_log "Notary submission ${submission_id:-<none>} for $(basename "${artifact}"): ${status:-<no status>}"
  if [[ "${status}" != "Accepted" ]]; then
    if [[ -n "${submission_id}" ]]; then
      xcrun notarytool log "${submission_id}" "${AWL_NOTARY_ARGS[@]}" || true
    else
      awl_log "notarytool output: $(awl_mask_arg "${out}")"
    fi
    awl_fail "Notarization failed for ${artifact} (status: ${status:-unknown})."
  fi
}

awl_staple() {
  awl_release_run xcrun stapler staple "$1"
}
