#!/usr/bin/env bash
# Loads ~/.agentwitch-signing/signing.env when present (sourced, not run).
# Never prints file contents or values. Explicit env vars already set win.
# Parses KEY=VALUE lines (optional export / quotes) so unquoted spaces and
# parentheses in identity names do not break bash `source`.
# Override path with AWL_SIGNING_ENV_FILE.

AWL_SIGNING_ENV_LOADED=0
AWL_SIGNING_ENV_PATH=""

awl_load_signing_env() {
  { set +x; } 2>/dev/null
  local env_file="${AWL_SIGNING_ENV_FILE:-${HOME}/.agentwitch-signing/signing.env}"
  local line key val
  AWL_SIGNING_ENV_PATH=""
  AWL_SIGNING_ENV_LOADED=0
  [[ -f "${env_file}" ]] || return 0
  if [[ -n "${DEVELOPER_ID_APPLICATION:-}" ]]; then
    awl_log "Signing identity already in environment; not loading ${env_file}."
    return 0
  fi
  while IFS= read -r line || [[ -n "${line}" ]]; do
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [[ -z "${line}" || "${line}" == \#* ]] && continue
    [[ "${line}" == export[[:space:]]* ]] && line="${line#export}"
    line="${line#"${line%%[![:space:]]*}"}"
    [[ "${line}" == *=* ]] || continue
    key="${line%%=*}"
    val="${line#*=}"
    key="${key%"${key##*[![:space:]]}"}"
    key="${key#"${key%%[![:space:]]*}"}"
    [[ "${key}" =~ ^[A-Za-z_][A-Za-z0-9_]*$ ]] || continue
    # Skip keys already set in the environment.
    if [[ -n "${!key+x}" ]]; then
      continue
    fi
    if [[ "${val}" == \"*\" ]]; then
      val="${val:1:${#val}-2}"
    elif [[ "${val}" == \'*\' ]]; then
      val="${val:1:${#val}-2}"
    fi
    printf -v "${key}" '%s' "${val}"
    export "${key?}"
  done < "${env_file}"
  AWL_SIGNING_ENV_LOADED=1
  AWL_SIGNING_ENV_PATH="${env_file}"
  awl_log "Loaded signing env from ${env_file} (values not logged)."
}
