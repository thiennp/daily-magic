#!/usr/bin/env bash
# Local verification of the signed app / DMG (sourced, not run).
#   expect=accept  -> any Gatekeeper/staple rejection fails the build (developer-id)
#   expect=adhoc   -> codesign must verify; spctl/stapler rejection is expected
#                     and only logged (ad-hoc / dry-run builds are not notarized)

awl_report_signature() {
  local target="$1"
  codesign -d --verbose=4 "${target}" 2>&1 \
    | grep -E "^(Identifier|Format|CodeDirectory|Signature|Authority|TeamIdentifier|Timestamp|Runtime Version)" \
    | sed 's/^/[awl-sign]   /' || true
}

awl_expect_gate() {
  local expect="$1" label="$2"
  shift 2
  if awl_run "$@"; then
    awl_log "OK: ${label} accepted."
  elif [[ "${expect}" == "adhoc" ]]; then
    awl_log "EXPECTED: ${label} rejected (ad-hoc build is not Developer ID signed/notarized)."
  else
    awl_fail "${label} rejected."
  fi
}

awl_verify_app() {
  local app="$1" expect="$2"
  awl_run codesign --verify --deep --strict --verbose=2 "${app}" \
    || awl_fail "codesign --verify --deep --strict failed for ${app}"
  awl_log "OK: codesign --verify --deep --strict (app)."
  awl_report_signature "${app}"
  awl_expect_gate "${expect}" "spctl (exec) for app" spctl -a -vv -t exec "${app}"
  awl_expect_gate "${expect}" "stapler validate (app)" xcrun stapler validate "${app}"
}

awl_verify_dmg() {
  local dmg="$1" expect="$2"
  if [[ "${expect}" == "accept" ]]; then
    awl_run codesign --verify --strict --verbose=2 "${dmg}" \
      || awl_fail "codesign --verify failed for ${dmg}"
    awl_log "OK: codesign --verify --strict (dmg)."
    awl_report_signature "${dmg}"
  fi
  awl_expect_gate "${expect}" "spctl (open, primary-signature) for dmg" \
    spctl -a -t open --context context:primary-signature -vv "${dmg}"
  awl_expect_gate "${expect}" "stapler validate (dmg)" xcrun stapler validate "${dmg}"
}
