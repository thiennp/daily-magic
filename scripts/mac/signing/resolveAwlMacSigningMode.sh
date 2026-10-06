#!/usr/bin/env bash
# Decides how the AWL Mac build is signed (sourced, not run). Never prints values.
#
# Inputs:  $1 = requested mode: auto | adhoc | developer-id   (AWL_MAC_SIGNING)
#          AWL_SIGN_DRY_RUN=1 for --dry-run
# Outputs: AWL_SIGN_MODE   = adhoc-legacy | dry-run | developer-id
#          AWL_NOTARY_AUTH = keychain-profile | asc-api-key | apple-id | none
#          AWL_SIGN_IDENTITY (codesign identity; placeholder in dry-run)

awl_detect_notary_auth() {
  if [[ -n "${NOTARYTOOL_KEYCHAIN_PROFILE:-}" ]]; then
    echo "keychain-profile"
  elif [[ -n "${APPLE_ASC_KEY_ID:-}" && -n "${APPLE_ASC_KEY_PATH:-}" ]]; then
    echo "asc-api-key"
  elif [[ -n "${APPLE_ID:-}" && -n "${APPLE_APP_SPECIFIC_PASSWORD:-}" && -n "${APPLE_TEAM_ID:-}" ]]; then
    echo "apple-id"
  else
    echo "none"
  fi
}

awl_check_credential_files() {
  if [[ -z "${DEVELOPER_ID_P12_PATH:-}" ]]; then
    awl_fail "DEVELOPER_ID_P12_PATH is required (temp keychain only; login keychain is never used)."
  fi
  if [[ ! -f "${DEVELOPER_ID_P12_PATH}" ]]; then
    awl_fail "DEVELOPER_ID_P12_PATH is set but no file exists at that path."
  fi
  if [[ -z "${DEVELOPER_ID_P12_PASSWORD:-}" ]]; then
    awl_fail "DEVELOPER_ID_P12_PASSWORD is empty."
  fi
  if [[ "${AWL_NOTARY_AUTH}" == "asc-api-key" && ! -f "${APPLE_ASC_KEY_PATH}" ]]; then
    awl_fail "APPLE_ASC_KEY_PATH is set but no .p8 file exists at that path."
  fi
}

resolve_awl_mac_signing_mode() {
  local requested="${1:-auto}"
  awl_load_signing_env
  AWL_NOTARY_AUTH="$(awl_detect_notary_auth)"
  case "${requested}" in
    auto | adhoc | developer-id) ;;
    *) awl_fail "AWL_MAC_SIGNING must be auto, adhoc or developer-id (got '${requested}')." ;;
  esac
  if [[ "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
    AWL_SIGN_MODE="dry-run"
    AWL_SIGN_IDENTITY="${DEVELOPER_ID_APPLICATION:-<DEVELOPER_ID_APPLICATION>}"
    [[ "${AWL_NOTARY_AUTH}" == "none" ]] && AWL_NOTARY_AUTH="asc-api-key"
    awl_log "Mode: dry-run (real ad-hoc build + hardened-runtime ad-hoc sign + local verify; Developer ID/notary steps printed only)."
    return 0
  fi
  if [[ "${requested}" == "adhoc" ]]; then
    AWL_SIGN_MODE="adhoc-legacy"
    awl_log "Mode: ad-hoc (forced via AWL_MAC_SIGNING=adhoc / --adhoc). Gatekeeper will block this build on other Macs."
    return 0
  fi
  if [[ -z "${DEVELOPER_ID_APPLICATION:-}" ]]; then
    if [[ "${requested}" == "developer-id" || "${AWL_SIGNING_ENV_LOADED}" == "1" ]]; then
      awl_fail "Developer ID requested (AWL_MAC_SIGNING=${requested}; signing.env loaded=${AWL_SIGNING_ENV_LOADED}) but DEVELOPER_ID_APPLICATION is unset. Refusing ad-hoc fallback."
    fi
    AWL_SIGN_MODE="adhoc-legacy"
    awl_log "Developer ID credentials absent (DEVELOPER_ID_APPLICATION unset): falling back to ad-hoc signing. This DMG is NOT notarized; Gatekeeper will block it on other Macs."
    return 0
  fi
  if [[ "${AWL_NOTARY_AUTH}" == "none" ]]; then
    awl_fail "DEVELOPER_ID_APPLICATION is set but no notary credentials found (need NOTARYTOOL_KEYCHAIN_PROFILE, or APPLE_ASC_KEY_ID+APPLE_ASC_KEY_PATH(+APPLE_ASC_ISSUER_ID), or APPLE_ID+APPLE_APP_SPECIFIC_PASSWORD+APPLE_TEAM_ID). Refusing to ship a signed-but-unnotarized build."
  fi
  AWL_SIGN_MODE="developer-id"
  AWL_SIGN_IDENTITY="${DEVELOPER_ID_APPLICATION}"
  awl_check_credential_files
  awl_log "Mode: developer-id (identity: ${AWL_SIGN_IDENTITY}; notary auth: ${AWL_NOTARY_AUTH})."
}
