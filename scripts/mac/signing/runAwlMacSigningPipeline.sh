#!/usr/bin/env bash
# AWL Mac signing + notarization pipeline (sourced by build-awl-mac-dmg.sh).
#   awl_sign_init <repo-root> <auto|adhoc|developer-id>
#   awl_sign_stage_app <app-dir> <dist-dir>   (before the DMG is created)
#   awl_sign_dmg <dmg-path>                    (after the DMG is created)
# Secrets come only from env / keychain profile at runtime; see
# docs/agent-witch/awl-mac-signing-notarization.md.

AWL_SIGNING_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=/dev/null
for awl_lib in awlMacSigningLog resolveAwlMacSigningMode awlMacTempKeychain \
  codesignAwlMacApp notarizeAwlMacArtifact verifyAwlMacArtifacts; do
  source "${AWL_SIGNING_LIB_DIR}/${awl_lib}.sh"
done
unset awl_lib

awl_sign_init() {
  { set +x; } 2>/dev/null
  AWL_ENTITLEMENTS="$1/apps/mac/AgentWitchLocal.entitlements"
  [[ -f "${AWL_ENTITLEMENTS}" ]] || awl_fail "Entitlements file missing: ${AWL_ENTITLEMENTS}"
  resolve_awl_mac_signing_mode "$2"
  trap awl_keychain_cleanup EXIT
}

awl_zip_app() {
  local runner="$1" app="$2" zip="$3"
  rm -f "${zip}"
  "${runner}" ditto -c -k --sequesterRsrc --keepParent "${app}" "${zip}"
}

awl_sign_stage_app() {
  local app="$1" dist="$2" notary_zip="$2/notary/AgentWitchLocal-notary.zip"
  mkdir -p "${dist}/notary"
  case "${AWL_SIGN_MODE}" in
    adhoc-legacy)
      awl_run codesign --force --deep --sign - "${app}"
      awl_verify_app "${app}" adhoc
      ;;
    dry-run)
      awl_log "Ad-hoc hardened-runtime sign (real), same inside-out order as Developer ID:"
      awl_codesign_app "${app}" - "${AWL_ENTITLEMENTS}" awl_run
      awl_verify_app "${app}" adhoc
      awl_log "Developer ID steps (printed, not executed; secrets masked):"
      awl_keychain_setup
      awl_codesign_app "${app}" "${AWL_SIGN_IDENTITY}" "${AWL_ENTITLEMENTS}" awl_release_run
      awl_release_run ditto -c -k --sequesterRsrc --keepParent "${app}" "${notary_zip}"
      awl_notarize "${notary_zip}"
      awl_staple "${app}"
      awl_zip_app awl_run "${app}" "${dist}/AgentWitchLocal.zip"
      ;;
    developer-id)
      awl_keychain_setup
      awl_codesign_app "${app}" "${AWL_SIGN_IDENTITY}" "${AWL_ENTITLEMENTS}" awl_release_run
      awl_run codesign --verify --deep --strict --verbose=2 "${app}"
      awl_zip_app awl_run "${app}" "${notary_zip}"
      awl_notarize "${notary_zip}"
      awl_staple "${app}"
      awl_verify_app "${app}" accept
      awl_zip_app awl_run "${app}" "${dist}/AgentWitchLocal.zip"
      ;;
    *) awl_fail "awl_sign_init was not called." ;;
  esac
  rm -rf "${dist}/notary"
}

awl_sign_dmg() {
  local dmg="$1"
  case "${AWL_SIGN_MODE}" in
    adhoc-legacy)
      awl_verify_dmg "${dmg}" adhoc
      ;;
    dry-run | developer-id)
      awl_release_run codesign --force --sign "${AWL_SIGN_IDENTITY}" --timestamp \
        ${AWL_CODESIGN_KEYCHAIN_ARGS[@]+"${AWL_CODESIGN_KEYCHAIN_ARGS[@]}"} "${dmg}"
      awl_notarize "${dmg}"
      awl_staple "${dmg}"
      if [[ "${AWL_SIGN_MODE}" == "developer-id" ]]; then
        awl_verify_dmg "${dmg}" accept
      else
        awl_verify_dmg "${dmg}" adhoc
      fi
      ;;
  esac
}
