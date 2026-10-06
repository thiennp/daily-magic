#!/usr/bin/env bash
# Logging + command runner for the AWL Mac signing pipeline (sourced, not run).
# Secrets are never printed: every logged argv passes through awl_mask_arg.

# Env vars whose *values* must never appear in logs.
AWL_SECRET_VARS=(
  DEVELOPER_ID_P12_PASSWORD
  APPLE_APP_SPECIFIC_PASSWORD
  APPLE_ASC_KEY_ID
  APPLE_ASC_ISSUER_ID
  APPLE_ID
  AWL_TEMP_KEYCHAIN_PASSWORD
)

awl_log() {
  echo "[awl-sign] $*"
}

awl_fail() {
  echo "[awl-sign] ERROR: $*" >&2
  exit 1
}

awl_mask_arg() {
  local arg="$1" name value
  for name in "${AWL_SECRET_VARS[@]}"; do
    value="${!name:-}"
    if [[ -n "${value}" ]]; then
      arg="${arg//"${value}"/***}"
    fi
  done
  printf '%s' "${arg}"
}

awl_format_cmd() {
  local out="" arg masked
  for arg in "$@"; do
    masked="$(awl_mask_arg "${arg}")"
    if [[ "${masked}" =~ [[:space:]] || -z "${masked}" ]]; then
      masked="'${masked}'"
    fi
    out+="${masked} "
  done
  printf '%s' "${out% }"
}

# Internal: $1 = always|release, $2 = 0|1 (1 = discard the command's stdout).
awl__exec() {
  { local had_xtrace="${-//[^x]/}"; set +x; } 2>/dev/null
  local kind="$1" quiet="$2" status=0
  shift 2
  if [[ "${kind}" == "release" && "${AWL_SIGN_DRY_RUN:-0}" == "1" ]]; then
    awl_log "[dry-run] would run: $(awl_format_cmd "$@")"
  else
    awl_log "\$ $(awl_format_cmd "$@")"
    if [[ "${quiet}" == "1" ]]; then
      "$@" >/dev/null || status=$?
    else
      "$@" || status=$?
    fi
  fi
  [[ -n "${had_xtrace}" ]] && set -x
  return "${status}"
}

# Always runs (ad-hoc build/sign/verify). Logs the masked command first.
awl_run() { awl__exec always 0 "$@"; }

# Developer ID / notary / keychain step: printed only when AWL_SIGN_DRY_RUN=1.
awl_release_run() { awl__exec release 0 "$@"; }

# Same as awl_release_run but discards stdout (e.g. key attribute dumps).
awl_release_run_quiet() { awl__exec release 1 "$@"; }
